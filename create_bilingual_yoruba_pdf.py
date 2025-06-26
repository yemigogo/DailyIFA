#!/usr/bin/env python3
"""
Create Enhanced Bilingual Yoruba Pronunciation PDF with English meanings
"""

from reportlab.lib.pagesizes import LETTER
from reportlab.pdfgen import canvas
import json

def create_bilingual_yoruba_pdf():
    """Create enhanced bilingual Yoruba pronunciation PDF with meanings"""
    
    # Bilingual vocabulary list with cultural meanings
    conversion_with_meanings = [
        {"original_word": "ṣàngó", "filename": "sango.mp3", "meaning": "Orisha of thunder"},
        {"original_word": "òrìṣà", "filename": "orisa.mp3", "meaning": "Deity"},
        {"original_word": "ọ̀run", "filename": "orun.mp3", "meaning": "Heaven"},
        {"original_word": "ayé", "filename": "aye.mp3", "meaning": "Earth"},
        {"original_word": "ògún", "filename": "ogun.mp3", "meaning": "Orisha of iron and war"},
        {"original_word": "ìwòrì", "filename": "iwori.mp3", "meaning": "Odu Ifá sign"},
        {"original_word": "ẹ̀jẹ̀", "filename": "eje.mp3", "meaning": "Blood"},
        {"original_word": "àlàáfíà", "filename": "alafia.mp3", "meaning": "Peace"},
        {"original_word": "odù", "filename": "odu.mp3", "meaning": "Divination sign"},
        {"original_word": "bàbáláwo", "filename": "babalawo.mp3", "meaning": "Diviner, priest"},
        {"original_word": "ìyánífẹ́", "filename": "iyanife.mp3", "meaning": "Love"},
        {"original_word": "ọjọ́", "filename": "ojo.mp3", "meaning": "Day"},
        {"original_word": "ọsẹ̀", "filename": "ose.mp3", "meaning": "Week"},
        {"original_word": "ọdún", "filename": "odun.mp3", "meaning": "Year"},
        {"original_word": "ìmọ̀", "filename": "imo.mp3", "meaning": "Knowledge"},
        {"original_word": "àdúrà", "filename": "adura.mp3", "meaning": "Prayer"},
        {"original_word": "àṣẽ", "filename": "ase.mp3", "meaning": "Divine command / affirmation"}
    ]
    
    # Create the bilingual PDF
    pdf_vocab_bilingual_path = "Yoruba_Bilingual_Pronunciation_Guide.pdf"
    c = canvas.Canvas(pdf_vocab_bilingual_path, pagesize=LETTER)
    width, height = LETTER
    
    # Header
    y = height - 40
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, y, "Yorùbá Bilingual Vocabulary & Pronunciation Guide")
    y -= 25
    c.setFont("Helvetica-Oblique", 10)
    c.drawString(50, y, "Authentic Yoruba Terms with Cultural Meanings")
    y -= 30
    
    # Column headers
    c.setFont("Helvetica-Bold", 10)
    c.drawString(50, y, "Original Word")
    c.drawString(180, y, "MP3 Filename")
    c.drawString(320, y, "English Meaning")
    y -= 15
    c.setFont("Helvetica", 9)
    
    # Draw header line
    c.line(50, y, width - 50, y)
    y -= 10
    
    # Rows with alternating background
    row_count = 0
    for item in conversion_with_meanings:
        word = item["original_word"]
        file = item["filename"]
        meaning = item["meaning"]
        
        if y < 60:
            c.showPage()
            y = height - 40
            c.setFont("Helvetica-Bold", 10)
            c.drawString(50, y, "Original Word")
            c.drawString(180, y, "MP3 Filename")
            c.drawString(320, y, "English Meaning")
            y -= 15
            c.setFont("Helvetica", 9)
            c.line(50, y, width - 50, y)
            y -= 10
            row_count = 0
        
        # Alternating row background
        if row_count % 2 == 0:
            c.setFillColorRGB(0.95, 0.95, 0.95)
            c.rect(45, y - 2, width - 90, 12, fill=1, stroke=0)
            c.setFillColorRGB(0, 0, 0)
        
        c.drawString(50, y, word)
        c.drawString(180, y, file)
        c.drawString(320, y, meaning)
        y -= 15
        row_count += 1
    
    # Add cultural authenticity section
    y -= 20
    if y < 120:
        c.showPage()
        y = height - 40
    
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, y, "Cultural Authenticity Statement")
    y -= 15
    c.setFont("Helvetica", 9)
    c.drawString(50, y, "All pronunciation files are currently disabled pending authentic native speaker recordings")
    y -= 12
    c.drawString(50, y, "from qualified Yoruba speakers with spiritual context understanding. This maintains")
    y -= 12
    c.drawString(50, y, "cultural integrity over technical functionality in accordance with traditional values.")
    
    y -= 20
    c.setFont("Helvetica-Bold", 10)
    c.drawString(50, y, "Usage Guidelines:")
    y -= 12
    c.setFont("Helvetica", 9)
    c.drawString(50, y, "• Diacritical marks are essential for proper pronunciation")
    y -= 10
    c.drawString(50, y, "• Each term carries deep cultural and spiritual significance")
    y -= 10
    c.drawString(50, y, "• Pronunciation should be learned from qualified native speakers")
    y -= 10
    c.drawString(50, y, "• MP3 filenames use ASCII-safe characters for technical compatibility")
    
    c.save()
    
    # Also save enhanced JSON with meanings
    json_bilingual_path = "yoruba_bilingual_pronunciation_mapping.json"
    with open(json_bilingual_path, 'w', encoding='utf-8') as f:
        json.dump(conversion_with_meanings, f, indent=2, ensure_ascii=False)
    
    print(f"Created bilingual Yoruba pronunciation PDF: {pdf_vocab_bilingual_path}")
    print(f"Saved enhanced mapping with meanings: {json_bilingual_path}")
    
    return pdf_vocab_bilingual_path, json_bilingual_path

if __name__ == "__main__":
    pdf_path, json_path = create_bilingual_yoruba_pdf()
    print(f"Files created: {pdf_path}, {json_path}")