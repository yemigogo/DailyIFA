"""
Generate comprehensive Yoruba Vocabulary & Pronunciation PDF Guide
Uses the audio mapping JSON data to create a professional reference document
"""

import json
import os
from reportlab.lib.pagesizes import LETTER
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from datetime import datetime

def create_yoruba_vocabulary_pdf():
    """Create comprehensive Yoruba vocabulary PDF with professional formatting"""
    
    # Load vocabulary data
    json_path = "yoruba_audio_conversion_list.json"
    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found")
        return None
    
    with open(json_path, "r", encoding="utf-8") as f:
        vocab_data = json.load(f)
    
    # Output path
    pdf_path = "Yoruba_Pronunciation_Vocabulary_Guide.pdf"
    
    # Create PDF with advanced formatting
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=LETTER,
        rightMargin=72,
        leftMargin=72,
        topMargin=72,
        bottomMargin=72
    )
    
    # Define styles
    styles = getSampleStyleSheet()
    
    # Custom styles for Yoruba text
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        spaceAfter=30,
        alignment=TA_CENTER,
        textColor=HexColor('#B45309'),  # Amber-700
        fontName='Helvetica-Bold'
    )
    
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontSize=14,
        spaceAfter=20,
        alignment=TA_CENTER,
        textColor=HexColor('#059669'),  # Emerald-600
        fontName='Helvetica'
    )
    
    header_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Heading3'],
        fontSize=16,
        spaceAfter=15,
        spaceBefore=20,
        textColor=HexColor('#B45309'),  # Amber-700
        fontName='Helvetica-Bold'
    )
    
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontSize=11,
        spaceAfter=12,
        alignment=TA_LEFT,
        fontName='Helvetica'
    )
    
    # Build document content
    story = []
    
    # Title page
    story.append(Paragraph("Yorùbá Vocabulary & Pronunciation Guide", title_style))
    story.append(Spacer(1, 0.2*inch))
    story.append(Paragraph("Ifá Daily Reading App", subtitle_style))
    story.append(Spacer(1, 0.3*inch))
    
    # Introduction
    story.append(Paragraph("Introduction", header_style))
    intro_text = """
    This comprehensive guide provides authentic Yorùbá vocabulary with proper pronunciation references. 
    Each entry includes the original Yorùbá word with diacritical marks and its corresponding audio filename 
    for accurate pronunciation practice. This guide supports the Ifá Daily Reading App's commitment to 
    preserving authentic Yorùbá spiritual and cultural terminology.
    """
    story.append(Paragraph(intro_text, body_style))
    story.append(Spacer(1, 0.3*inch))
    
    # Pronunciation notes
    story.append(Paragraph("Pronunciation Notes", header_style))
    pronunciation_notes = """
    <b>Diacritical Marks:</b><br/>
    • Dots under letters (ẹ, ọ, ṣ) indicate different vowel sounds<br/>
    • Accent marks (á, à, ā) indicate tonal patterns (high, low, mid)<br/>
    • Proper pronunciation requires attention to both vowel quality and tone<br/><br/>
    
    <b>Audio Status:</b><br/>
    All pronunciation files are currently disabled pending authentic native speaker recordings. 
    The filenames provided serve as placeholders for future authentic audio content.
    """
    story.append(Paragraph(pronunciation_notes, body_style))
    story.append(Spacer(1, 0.4*inch))
    
    # Vocabulary table header
    story.append(Paragraph("Vocabulary Reference", header_style))
    
    # Create vocabulary table
    table_data = [
        ['Original Yorùbá Word', 'Audio Filename', 'Category'],
    ]
    
    # Categorize vocabulary
    spiritual_terms = ['ifá', 'àṣẹ', 'odù', 'bàbáláwo', 'òrìṣà']
    orisha_names = ['ṣàngó', 'ògún', 'ọ̀rúnmìlà', 'yemọja', 'ọbàtálá', 'ọya', 'èṣù', 'ọ̀ṣun']
    time_terms = ['ọjọ́', 'ọsẹ̀', 'ọdún']
    concepts = ['ọ̀run', 'ayé', 'àlàáfíà', 'ìmọ̀', 'àdúrà']
    
    def categorize_word(word):
        word_lower = word.lower()
        if word_lower in spiritual_terms:
            return 'Spiritual Concept'
        elif word_lower in orisha_names:
            return 'Orisha/Deity'
        elif word_lower in time_terms:
            return 'Time/Calendar'
        elif word_lower in concepts:
            return 'General Concept'
        else:
            return 'Vocabulary'
    
    # Sort vocabulary by category and then alphabetically
    sorted_vocab = sorted(vocab_data, key=lambda x: (categorize_word(x['original_word']), x['original_word']))
    
    for item in sorted_vocab:
        word = item['original_word']
        filename = item['filename']
        category = categorize_word(word)
        table_data.append([word, filename, category])
    
    # Create table with styling
    table = Table(table_data, colWidths=[2.5*inch, 2*inch, 1.5*inch])
    table.setStyle(TableStyle([
        # Header row
        ('BACKGROUND', (0, 0), (-1, 0), HexColor('#F3F4F6')),
        ('TEXTCOLOR', (0, 0), (-1, 0), HexColor('#1F2937')),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        
        # Data rows
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor('#FFFFFF'), HexColor('#FAFAFA')]),
        ('GRID', (0, 0), (-1, -1), 1, HexColor('#E5E7EB')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    
    story.append(table)
    story.append(Spacer(1, 0.3*inch))
    
    # Statistics section
    story.append(Paragraph("Vocabulary Statistics", header_style))
    
    # Count by category
    category_counts = {}
    for item in vocab_data:
        category = categorize_word(item['original_word'])
        category_counts[category] = category_counts.get(category, 0) + 1
    
    stats_text = f"""
    <b>Total Vocabulary Entries:</b> {len(vocab_data)}<br/><br/>
    <b>By Category:</b><br/>
    """
    
    for category, count in sorted(category_counts.items()):
        stats_text += f"• {category}: {count} terms<br/>"
    
    story.append(Paragraph(stats_text, body_style))
    story.append(Spacer(1, 0.3*inch))
    
    # Cultural authenticity notice
    story.append(Paragraph("Cultural Authenticity Statement", header_style))
    authenticity_text = """
    This vocabulary guide maintains strict cultural authenticity standards. All Yorùbá terms 
    preserve their original diacritical marks and traditional spellings. The pronunciation 
    system is designed to support only authentic native speaker recordings from Nigeria, 
    Benin, or Togo, ensuring respect for the sacred nature of these spiritual concepts.
    """
    story.append(Paragraph(authenticity_text, body_style))
    story.append(Spacer(1, 0.3*inch))
    
    # Footer information
    footer_text = f"""
    <b>Generated:</b> {datetime.now().strftime('%B %d, %Y')}<br/>
    <b>Source:</b> Ifá Daily Reading App - Yorùbá Audio Conversion Mapping<br/>
    <b>Total Terms:</b> {len(vocab_data)} authentic Yorùbá vocabulary entries
    """
    story.append(Paragraph(footer_text, body_style))
    
    # Build PDF
    try:
        doc.build(story)
        print(f"✅ Yoruba vocabulary PDF created successfully: {pdf_path}")
        print(f"📖 Total vocabulary entries: {len(vocab_data)}")
        print(f"📊 Categories: {', '.join(sorted(category_counts.keys()))}")
        return pdf_path
    except Exception as e:
        print(f"❌ Error creating PDF: {e}")
        return None

def create_simple_vocabulary_pdf():
    """Create a simple version using basic canvas drawing"""
    json_path = "yoruba_audio_conversion_list.json"
    
    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found")
        return None
    
    with open(json_path, "r", encoding="utf-8") as f:
        vocab_data = json.load(f)
    
    pdf_path = "Yoruba_Pronunciation_List_Simple.pdf"
    c = canvas.Canvas(pdf_path, pagesize=LETTER)
    width, height = LETTER
    
    # Header
    y = height - 40
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, y, "Yorùbá Vocabulary & Pronunciation Guide")
    
    y -= 30
    c.setFont("Helvetica", 10)
    c.drawString(50, y, f"Generated: {datetime.now().strftime('%B %d, %Y')} | Total Terms: {len(vocab_data)}")
    
    y -= 30
    c.setFont("Helvetica-Bold", 11)
    c.drawString(50, y, "Original Yorùbá Word")
    c.drawString(250, y, "Audio Filename")
    c.drawString(400, y, "Status")
    
    y -= 20
    c.setFont("Helvetica", 10)
    
    # Vocabulary rows
    for item in vocab_data:
        if y < 40:
            c.showPage()
            y = height - 40
            c.setFont("Helvetica-Bold", 11)
            c.drawString(50, y, "Original Yorùbá Word")
            c.drawString(250, y, "Audio Filename")
            c.drawString(400, y, "Status")
            y -= 20
            c.setFont("Helvetica", 10)
        
        word = item["original_word"]
        filename = item["filename"]
        
        c.drawString(50, y, word)
        c.drawString(250, y, filename)
        c.drawString(400, y, "🔇 Disabled")
        y -= 15
    
    c.save()
    print(f"✅ Simple vocabulary PDF created: {pdf_path}")
    return pdf_path

if __name__ == "__main__":
    print("🎯 Creating Yoruba Vocabulary & Pronunciation PDF Guide...")
    
    # Try advanced PDF first, fall back to simple if needed
    pdf_path = create_yoruba_vocabulary_pdf()
    
    if not pdf_path:
        print("📝 Falling back to simple PDF format...")
        pdf_path = create_simple_vocabulary_pdf()
    
    if pdf_path:
        print(f"✅ PDF generation complete: {pdf_path}")
        print("📚 Ready for authentic Yorùbá pronunciation reference")
    else:
        print("❌ PDF generation failed")