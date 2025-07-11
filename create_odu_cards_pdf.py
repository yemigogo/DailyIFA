#!/usr/bin/env python3
"""
Create PDF with All 256 Odu Ifá Cards
Combines all cards into a single PDF document
"""

import os
from fpdf import FPDF
from datetime import datetime

def create_odu_cards_pdf():
    """Create PDF combining all 256 Odu cards"""
    
    # Source directory with all generated cards
    source_dir = "/tmp/odu_ifa_corrected_256"
    
    # Get all card files
    all_odu_cards = []
    if os.path.exists(source_dir):
        for filename in os.listdir(source_dir):
            if filename.startswith("odu_card_") and filename.endswith(".png"):
                all_odu_cards.append(os.path.join(source_dir, filename))
    
    print(f"Found {len(all_odu_cards)} card files")
    
    # Filter the filenames with valid integer card numbers only (1 to 256)
    valid_cards = []
    for card in all_odu_cards:
        filename = os.path.basename(card)
        number_part = filename.replace("odu_card_", "").replace(".png", "")
        if number_part.isdigit():
            card_number = int(number_part)
            if 1 <= card_number <= 256:
                valid_cards.append(card)
    
    print(f"Filtered to {len(valid_cards)} valid cards")
    
    # Create a PDF file combining all 256 Odu Ifá cards
    pdf_output_path = "/tmp/odu_ifa_256_cards.pdf"
    pdf = FPDF(orientation='P', unit='mm', format='A4')
    
    # Set document properties
    pdf.set_title("256 Odu Ifá Cards - Complete Collection")
    pdf.set_author("Ifá Daily Reading App")
    pdf.set_subject("Traditional Yoruba Divination Cards")
    pdf.set_creator("Enhanced Card Generation System")
    
    # Add title page
    pdf.add_page()
    pdf.set_font('Arial', 'B', 24)
    pdf.cell(0, 30, '256 Odu Ifá Cards', 0, 1, 'C')
    pdf.set_font('Arial', '', 16)
    pdf.cell(0, 20, 'Complete Traditional Collection', 0, 1, 'C')
    pdf.ln(20)
    
    pdf.set_font('Arial', '', 12)
    pdf.cell(0, 10, f'Generated: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}', 0, 1, 'C')
    pdf.cell(0, 10, f'Total Cards: {len(valid_cards)}', 0, 1, 'C')
    pdf.cell(0, 10, 'Card Dimensions: 600x800 pixels', 0, 1, 'C')
    pdf.cell(0, 10, 'Features: Black backgrounds, wooden carving textures', 0, 1, 'C')
    pdf.cell(0, 10, 'Source: Authentic 256 Odu Excel matrix data', 0, 1, 'C')
    
    # Add each card image to the PDF
    card_count = 0
    for card in sorted(valid_cards, key=lambda x: int(os.path.basename(x).split("_")[-1].split(".")[0])):
        if os.path.exists(card):
            try:
                pdf.add_page()
                
                # Add card number header
                card_number = int(os.path.basename(card).split("_")[-1].split(".")[0])
                pdf.set_font('Arial', 'B', 14)
                pdf.cell(0, 10, f'Card {card_number}', 0, 1, 'C')
                pdf.ln(5)
                
                # Add card image - fit inside A4 margins
                pdf.image(card, x=10, y=30, w=190)  # Fit inside A4 margins
                
                card_count += 1
                if card_count % 50 == 0:
                    print(f"Added {card_count} cards to PDF")
                    
            except Exception as e:
                print(f"Error adding card {card}: {e}")
                continue
    
    # Save the PDF
    pdf.output(pdf_output_path)
    
    # Show results
    file_size_mb = os.path.getsize(pdf_output_path) / (1024 * 1024)
    
    print(f"""
✅ PDF Created Successfully!

📄 PDF Details:
- File: {pdf_output_path}
- Size: {file_size_mb:.1f} MB
- Pages: {card_count + 1} (title page + {card_count} cards)
- Format: A4 portrait
- Card Layout: One card per page with header

📊 Content:
- Title page with collection information
- {card_count} Odu cards in numerical order
- Each card fitted to A4 page margins
- Card numbers as page headers

🎯 Complete PDF ready for viewing and printing!
""")
    
    return pdf_output_path

if __name__ == "__main__":
    pdf_path = create_odu_cards_pdf()
    print(f"PDF created: {pdf_path}")