#!/usr/bin/env python3
"""
Generate PDF version of GUIDE.md using ReportLab for proper Unicode support
"""

from reportlab.lib.pagesizes import LETTER
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
import textwrap
import os

def create_pdf_guide():
    """Create PDF guide using ReportLab with full Unicode support"""
    
    if not os.path.exists("GUIDE.md"):
        print("Error: GUIDE.md file not found")
        return None

    # Read guide content
    with open("GUIDE.md", "r", encoding="utf-8") as f:
        guide_lines = f.readlines()

    # Create PDF
    pdf_path = "IFA_DAILY_GUIDE.pdf"
    c = canvas.Canvas(pdf_path, pagesize=LETTER)
    width, height = LETTER

    # Starting position
    y = height - 50
    margin_left = 50
    margin_right = width - 50

    # Title
    c.setFont("Helvetica-Bold", 16)
    c.setFillColor(HexColor("#046B4A"))  # Dark green
    title = "Ifá Daily - Yoruba Sound & Wisdom App Guide"
    title_width = c.stringWidth(title, "Helvetica-Bold", 16)
    c.drawString((width - title_width) / 2, y, title)
    y -= 40

    # Reset color to black
    c.setFillColor(HexColor("#000000"))

    # Process each line
    for line in guide_lines:
        line = line.strip()
        
        if not line:
            y -= 10
            continue
            
        # Check for page break
        if y < 80:
            c.showPage()
            y = height - 50
            c.setFillColor(HexColor("#000000"))

        # Handle different markdown elements
        if line.startswith("# "):
            # Skip main title
            continue
        elif line.startswith("## "):
            c.setFont("Helvetica-Bold", 12)
            c.setFillColor(HexColor("#046B4A"))
            header_text = line.replace("##", "").strip()
            c.drawString(margin_left, y, header_text)
            y -= 20
            c.setFillColor(HexColor("#000000"))
        elif line.startswith("### "):
            c.setFont("Helvetica-Bold", 10)
            subheader_text = line.replace("###", "").strip()
            c.drawString(margin_left, y, subheader_text)
            y -= 15
        elif line.startswith("```"):
            # Skip code block markers
            continue
        elif line.startswith("- [x]") or line.startswith("- ✅"):
            c.setFont("Helvetica", 9)
            c.setFillColor(HexColor("#059669"))  # Green for completed
            status_text = "✓ " + line[5:].strip() if line.startswith("- [x]") else "✓ " + line[4:].strip()
            wrapped_lines = textwrap.wrap(status_text, width=85)
            for wrap_line in wrapped_lines:
                c.drawString(margin_left + 10, y, wrap_line)
                y -= 12
            c.setFillColor(HexColor("#000000"))
        elif line.startswith("- [ ]"):
            c.setFont("Helvetica", 9)
            c.setFillColor(HexColor("#DC2626"))  # Red for incomplete
            status_text = "☐ " + line[5:].strip()
            wrapped_lines = textwrap.wrap(status_text, width=85)
            for wrap_line in wrapped_lines:
                c.drawString(margin_left + 10, y, wrap_line)
                y -= 12
            c.setFillColor(HexColor("#000000"))
        elif line.startswith("- "):
            c.setFont("Helvetica", 9)
            bullet_text = "• " + line[2:].strip()
            wrapped_lines = textwrap.wrap(bullet_text, width=85)
            for wrap_line in wrapped_lines:
                c.drawString(margin_left + 10, y, wrap_line)
                y -= 12
        elif line.startswith("**") and line.endswith("**"):
            c.setFont("Helvetica-Bold", 10)
            bold_text = line.replace("**", "")
            c.drawString(margin_left, y, bold_text)
            y -= 15
        elif line.startswith("---"):
            # Draw horizontal line
            y -= 5
            c.line(margin_left, y, margin_right, y)
            y -= 10
        else:
            c.setFont("Helvetica", 9)
            # Wrap long lines
            wrapped_lines = textwrap.wrap(line, width=90)
            if not wrapped_lines:
                wrapped_lines = [line]
            for wrap_line in wrapped_lines:
                c.drawString(margin_left, y, wrap_line)
                y -= 12

    # Save PDF
    c.save()
    
    print(f"✓ PDF guide generated: {pdf_path}")
    print(f"✓ File size: {os.path.getsize(pdf_path)} bytes")
    
    return pdf_path

if __name__ == "__main__":
    create_pdf_guide()