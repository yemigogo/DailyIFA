#!/usr/bin/env python3
"""
Generate PDF version of GUIDE.md for Ifá Daily project
"""

from fpdf import FPDF
import os

class PDF(FPDF):
    def header(self):
        self.set_font("Arial", "B", 12)
        self.set_text_color(4, 107, 74)  # Dark green
        self.cell(0, 10, "Ifa Daily - Yoruba Sound & Wisdom App Guide", ln=1, align="C")
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font("Arial", "I", 8)
        self.set_text_color(128)
        self.cell(0, 10, f"Page {self.page_no()}", align="C")

    def chapter_title(self, title):
        self.set_font("Arial", "B", 11)
        self.set_text_color(0)
        self.cell(0, 10, title, ln=1, align="L")
        self.ln(2)

    def chapter_body(self, body):
        self.set_font("Arial", "", 10)
        self.set_text_color(0)
        self.multi_cell(0, 6, body)
        self.ln()

    def code_block(self, code):
        self.set_font("Courier", "", 9)
        self.set_text_color(50)
        self.set_fill_color(245, 245, 245)
        self.multi_cell(0, 5, code, fill=True)
        self.set_font("Arial", "", 10)
        self.set_text_color(0)
        self.ln()

    def status_item(self, text, completed=False):
        symbol = "☑" if completed else "☐"
        color = (0, 150, 0) if completed else (150, 0, 0)
        self.set_text_color(*color)
        self.set_font("Arial", "", 10)
        self.multi_cell(0, 6, f"{symbol} {text}")
        self.set_text_color(0)

def main():
    # Create PDF instance
    pdf = PDF()
    pdf.add_page()

    # Check if GUIDE.md exists
    if not os.path.exists("GUIDE.md"):
        print("Error: GUIDE.md file not found")
        return

    def sanitize_text(text):
        """Remove or replace all non-Latin-1 characters for PDF compatibility"""
        # Replace common Unicode characters
        replacements = {
            "–": "-", "—": "-", "'": "'", "'": "'", """: '"', """: '"',
            "…": "...", "•": "*", "✓": "√", "✅": "[DONE]", "❌": "[X]",
            "🔇": "[MUTED]", "📌": "[PIN]", "🧪": "[TEST]", "🔧": "[TOOL]",
            "📱": "[MOBILE]", "🚀": "[DEPLOY]", "🎯": "[TARGET]", "📞": "[CONTACT]",
            "📊": "[DATA]", "🌟": "*", "⚠️": "[WARNING]", "🔄": "[PROGRESS]",
            "⏳": "[PENDING]", "Ifá": "Ifa", "Yorubá": "Yoruba", "Ọ̀": "O",
            "ṣ": "s", "ẹ": "e", "à": "a", "ò": "o", "ọ": "o", "ù": "u"
        }
        
        for unicode_char, replacement in replacements.items():
            text = text.replace(unicode_char, replacement)
            
        # Force encode to latin-1, replacing any remaining problematic characters
        return text.encode("latin-1", "replace").decode("latin-1")

    # Read guide content and sanitize
    with open("GUIDE.md", "r", encoding="utf-8") as f:
        guide_lines = []
        for line in f:
            guide_lines.append(sanitize_text(line))

    # Parse and convert markdown to PDF
    in_code_block = False
    code_content = []

    for line in guide_lines:
        line = line.strip()
        
        if not line:
            if not in_code_block:
                pdf.ln(2)
            continue

        # Handle code blocks
        if line.startswith("```"):
            if in_code_block:
                # End code block
                pdf.code_block("\n".join(code_content))
                code_content = []
                in_code_block = False
            else:
                # Start code block
                in_code_block = True
            continue

        if in_code_block:
            code_content.append(line)
            continue

        # Handle markdown formatting
        if line.startswith("# "):
            # Skip main title (already in header)
            continue
        elif line.startswith("## "):
            pdf.chapter_title(line.replace("##", "").strip())
        elif line.startswith("### "):
            pdf.set_font("Arial", "B", 10)
            pdf.cell(0, 8, line.replace("###", "").strip(), ln=1)
            pdf.ln(1)
        elif line.startswith("- [x]") or line.startswith("- [X]"):
            pdf.status_item(line[5:].strip(), completed=True)
        elif line.startswith("- [ ]"):
            pdf.status_item(line[5:].strip(), completed=False)
        elif line.startswith("- [DONE]"):
            pdf.status_item(line[8:].strip(), completed=True)
        elif line.startswith("- "):
            pdf.chapter_body("• " + line[2:].strip())
        elif line.startswith("**") and line.endswith("**"):
            pdf.set_font("Arial", "B", 10)
            pdf.cell(0, 8, line.replace("**", ""), ln=1)
            pdf.set_font("Arial", "", 10)
            pdf.ln(1)
        elif line.startswith("> "):
            pdf.set_text_color(100)
            pdf.chapter_body(line[2:].strip())
            pdf.set_text_color(0)
        elif line.startswith("---"):
            pdf.ln(3)
            pdf.line(10, pdf.get_y(), 200, pdf.get_y())
            pdf.ln(3)
        else:
            pdf.chapter_body(line)

    # Save PDF
    output_path = "IFA_DAILY_GUIDE.pdf"
    pdf.output(output_path)
    
    print(f"✓ PDF guide generated: {output_path}")
    print(f"✓ File size: {os.path.getsize(output_path)} bytes")
    
    return output_path

if __name__ == "__main__":
    main()