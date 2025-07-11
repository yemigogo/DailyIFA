#!/usr/bin/env python3
"""
Create Filtered 256 Odu Cards ZIP Archive
Creates ZIP with only cards having valid integer numbers 1-256
"""

import os
import zipfile
import json
from datetime import datetime

def create_filtered_256_zip():
    """Create ZIP archive with only valid numbered cards 1-256"""
    
    # Source directory with all generated cards
    source_dir = "/tmp/odu_ifa_corrected_256"
    
    # Get all card files
    all_odu_cards = []
    if os.path.exists(source_dir):
        for filename in os.listdir(source_dir):
            if filename.startswith("odu_card_") and filename.endswith(".png"):
                all_odu_cards.append(os.path.join(source_dir, filename))
    
    print(f"Found {len(all_odu_cards)} total card files")
    
    # Filter the filenames with valid integer card numbers only (1 to 256)
    valid_cards = []
    for card in all_odu_cards:
        filename = os.path.basename(card)
        number_part = filename.replace("odu_card_", "").replace(".png", "")
        if number_part.isdigit():
            card_number = int(number_part)
            if 1 <= card_number <= 256:
                valid_cards.append(card)
    
    print(f"Filtered to {len(valid_cards)} valid cards with integer numbers 1-256")
    
    # Sort valid cards by number
    valid_cards.sort(key=lambda x: int(os.path.basename(x).replace("odu_card_", "").replace(".png", "")))
    
    # Create zip with only valid 256 cards
    zip_path = "/tmp/odu_ifa_256_cards.zip"
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        # Add each valid card
        for card in valid_cards:
            if os.path.exists(card):
                zipf.write(card, arcname=os.path.basename(card))
        
        # Add detailed manifest
        card_details = []
        for card in valid_cards:
            filename = os.path.basename(card)
            number = int(filename.replace("odu_card_", "").replace(".png", ""))
            size = os.path.getsize(card) if os.path.exists(card) else 0
            card_details.append({
                "number": number,
                "filename": filename,
                "size_bytes": size
            })
        
        manifest = {
            "title": "Filtered 256 Odu Ifá Cards Collection",
            "description": "Cards with valid integer numbers 1-256 only",
            "created_at": datetime.now().isoformat(),
            "filter_criteria": {
                "number_range": "1 to 256",
                "filename_format": "odu_card_{integer}.png",
                "total_valid_cards": len(valid_cards)
            },
            "specifications": {
                "image_size": "600x800 pixels",
                "background": "black",
                "wood_carving": True,
                "authentic_excel_data": True
            },
            "cards": card_details
        }
        
        manifest_json = json.dumps(manifest, indent=2, ensure_ascii=False)
        zipf.writestr("manifest.json", manifest_json)
        
        # Add README
        readme = f"""# Filtered 256 Odu Ifá Cards

## Collection Summary
This archive contains {len(valid_cards)} Odu cards with valid integer numbers 1-256.

## Filter Criteria
- Filename format: odu_card_{{integer}}.png
- Number range: 1 to 256
- Only cards with valid integer numbers included

## Card Specifications
- Size: 600x800 pixels
- Background: Black
- Text: White
- Wood carving texture with sacred symbols
- Traditional Odu names and I/II patterns

## Files Included
{len(valid_cards)} card images from odu_card_1.png to odu_card_256.png

Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
        zipf.writestr("README.md", readme)
    
    # Show results
    file_size_mb = os.path.getsize(zip_path) / (1024 * 1024)
    
    print(f"""
✅ Filtered 256 Cards ZIP Created!

📊 Results:
- Archive: {zip_path}
- Size: {file_size_mb:.1f} MB
- Valid Cards: {len(valid_cards)}
- Filter: Integer numbers 1-256 only

📁 Contents:
- {len(valid_cards)} PNG card images
- manifest.json (filter details)
- README.md (documentation)
""")
    
    return zip_path

if __name__ == "__main__":
    zip_path = create_filtered_256_zip()
    print(f"Final archive: {zip_path}")