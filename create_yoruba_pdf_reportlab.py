#!/usr/bin/env python3
"""
Create Yoruba Pronunciation PDF using ReportLab with the exact conversion list
"""

from reportlab.lib.pagesizes import LETTER
from reportlab.pdfgen import canvas
import json

def create_yoruba_pdf_with_reportlab():
    """Create the Yoruba pronunciation PDF using ReportLab"""
    
    # Recreate the conversion list
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
    
    # Create the PDF
    pdf_vocab_path = "Yoruba_Pronunciation_List.pdf"
    c = canvas.Canvas(pdf_vocab_path, pagesize=LETTER)
    width, height = LETTER
    
    # Header
    y = height - 40
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y, "Yorùbá Vocabulary & Pronunciation Guide")
    y -= 30
    c.setFont("Helvetica-Bold", 10)
    c.drawString(50, y, "Original Word")
    c.drawString(200, y, "MP3 Filename")
    y -= 15
    c.setFont("Helvetica", 10)
    
    # Rows
    for item in conversion_instructions:
        word = item["original_word"]
        file = item["filename"]
        if y < 40:
            c.showPage()
            y = height - 40
            c.setFont("Helvetica", 10)
        c.drawString(50, y, word)
        c.drawString(200, y, file)
        y -= 15
    
    # Add cultural authenticity note
    y -= 20
    if y < 80:
        c.showPage()
        y = height - 40
    
    c.setFont("Helvetica-Bold", 10)
    c.drawString(50, y, "Cultural Authenticity Note:")
    y -= 15
    c.setFont("Helvetica", 9)
    c.drawString(50, y, "All pronunciation files are currently disabled pending authentic")
    y -= 12
    c.drawString(50, y, "native speaker recordings to maintain cultural integrity.")
    
    c.save()
    
    # Also save as JSON for programmatic use
    json_path = "yoruba_pronunciation_mapping.json"
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(conversion_instructions, f, indent=2, ensure_ascii=False)
    
    print(f"Created Yoruba pronunciation PDF: {pdf_vocab_path}")
    print(f"Saved conversion mapping: {json_path}")
    
    return pdf_vocab_path, json_path

if __name__ == "__main__":
    pdf_path, json_path = create_yoruba_pdf_with_reportlab()
    print(f"Files created: {pdf_path}, {json_path}")