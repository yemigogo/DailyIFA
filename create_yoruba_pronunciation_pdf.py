"""
Create Yoruba Pronunciation PDF from conversion instructions
"""

import json
from reportlab.lib.pagesizes import LETTER
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from datetime import datetime

def create_yoruba_pronunciation_pdf():
    """Create Yoruba pronunciation PDF from conversion instructions"""
    
    # Conversion instructions from user
    conversion_instructions = [
        {"original_word": "ṣàngó", "filename": "sango.mp3"},
        {"original_word": "òrìṣà", "filename": "orisa.mp3"},
        {"original_word": "ọ̀run", "filename": "orun.mp3"},
        {"original_word": "ayé", "filename": "aye.mp3"},
        {"original_word": "ògún", "filename": "ogun.mp3"},
        {"original_word": "ìwòrì", "filename": "iwori.mp3"},
        {"original_word": "ẹ̀jẹ̀", "filename": "eje.mp3"},
        {"original_word": "àlàáfíà", "filename": "alafia.mp3"},
        {"original_word": "odù", "filename": "odu.mp3"},
        {"original_word": "bàbáláwo", "filename": "babalawo.mp3"},
        {"original_word": "ìyánífẹ́", "filename": "iyanife.mp3"},
        {"original_word": "ọjọ́", "filename": "ojo.mp3"},
        {"original_word": "ọsẹ̀", "filename": "ose.mp3"},
        {"original_word": "ọdún", "filename": "odun.mp3"},
        {"original_word": "ìmọ̀", "filename": "imo.mp3"},
        {"original_word": "àdúrà", "filename": "adura.mp3"},
        {"original_word": "àṣẹ", "filename": "ase.mp3"}
    ]
    
    # Create PDF
    pdf_path = "Yoruba_Pronunciation_List.pdf"
    c = canvas.Canvas(pdf_path, pagesize=LETTER)
    width, height = LETTER
    
    # Header section with enhanced styling
    y = height - 50
    c.setFillColor(HexColor('#B45309'))  # Amber-700
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, y, "Yorùbá Vocabulary & Pronunciation Guide")
    
    y -= 25
    c.setFillColor(HexColor('#000000'))  # Black
    c.setFont("Helvetica", 10)
    c.drawString(50, y, f"Generated: {datetime.now().strftime('%B %d, %Y')} | Total Terms: {len(conversion_instructions)}")
    
    y -= 20
    c.setFont("Helvetica", 9)
    c.drawString(50, y, "Cultural Note: All pronunciation files currently disabled pending authentic native speaker recordings")
    
    y -= 30
    c.setFillColor(HexColor('#059669'))  # Emerald-600
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, y, "Original Yorùbá Word")
    c.drawString(250, y, "MP3 Filename")
    c.drawString(400, y, "Status")
    
    y -= 20
    c.setFillColor(HexColor('#000000'))  # Black
    c.setFont("Helvetica", 10)
    
    # Draw separator line
    c.line(50, y, width - 50, y)
    y -= 15
    
    # Vocabulary rows
    for item in conversion_instructions:
        if y < 60:  # Start new page if needed
            c.showPage()
            y = height - 50
            
            # Repeat header on new page
            c.setFillColor(HexColor('#059669'))
            c.setFont("Helvetica-Bold", 12)
            c.drawString(50, y, "Original Yorùbá Word")
            c.drawString(250, y, "MP3 Filename")
            c.drawString(400, y, "Status")
            
            y -= 20
            c.setFillColor(HexColor('#000000'))
            c.setFont("Helvetica", 10)
            c.line(50, y, width - 50, y)
            y -= 15
        
        word = item["original_word"]
        filename = item["filename"]
        
        c.drawString(50, y, word)
        c.drawString(250, y, filename)
        c.setFillColor(HexColor('#DC2626'))  # Red-600
        c.drawString(400, y, "🔇 Disabled")
        c.setFillColor(HexColor('#000000'))  # Reset to black
        y -= 15
    
    # Footer section
    y -= 20
    c.line(50, y, width - 50, y)
    y -= 15
    c.setFont("Helvetica", 8)
    c.drawString(50, y, "Ifá Daily Reading App - Authentic Yorùbá Cultural Preservation")
    c.drawString(width - 200, y, f"Page 1 | {len(conversion_instructions)} Terms")
    
    c.save()
    print(f"Created Yoruba pronunciation PDF: {pdf_path}")
    return pdf_path

def save_conversion_json():
    """Save conversion instructions as JSON for reference"""
    conversion_instructions = [
        {"original_word": "ṣàngó", "filename": "sango.mp3"},
        {"original_word": "òrìṣà", "filename": "orisa.mp3"},
        {"original_word": "ọ̀run", "filename": "orun.mp3"},
        {"original_word": "ayé", "filename": "aye.mp3"},
        {"original_word": "ògún", "filename": "ogun.mp3"},
        {"original_word": "ìwòrì", "filename": "iwori.mp3"},
        {"original_word": "ẹ̀jẹ̀", "filename": "eje.mp3"},
        {"original_word": "àlàáfíà", "filename": "alafia.mp3"},
        {"original_word": "odù", "filename": "odu.mp3"},
        {"original_word": "bàbáláwo", "filename": "babalawo.mp3"},
        {"original_word": "ìyánífẹ́", "filename": "iyanife.mp3"},
        {"original_word": "ọjọ́", "filename": "ojo.mp3"},
        {"original_word": "ọsẹ̀", "filename": "ose.mp3"},
        {"original_word": "ọdún", "filename": "odun.mp3"},
        {"original_word": "ìmọ̀", "filename": "imo.mp3"},
        {"original_word": "àdúrà", "filename": "adura.mp3"},
        {"original_word": "àṣẹ", "filename": "ase.mp3"}
    ]
    
    json_path = "yoruba_pronunciation_mapping.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(conversion_instructions, f, ensure_ascii=False, indent=2)
    
    print(f"Saved conversion mapping: {json_path}")
    return json_path

if __name__ == "__main__":
    print("Creating Yoruba pronunciation PDF and mapping...")
    pdf_path = create_yoruba_pronunciation_pdf()
    json_path = save_conversion_json()
    print(f"Files created: {pdf_path}, {json_path}")