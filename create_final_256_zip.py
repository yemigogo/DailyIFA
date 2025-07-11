#!/usr/bin/env python3
"""
Create Final 256 Odu Cards ZIP Archive
Creates clean ZIP with only cards numbered 1-256
"""

import os
import zipfile
import json
from datetime import datetime

def create_final_256_zip():
    """Create ZIP archive with exactly 256 cards numbered 1-256"""
    
    # Source directory with all generated cards
    source_dir = "/tmp/odu_ifa_corrected_256"
    
    # Output ZIP path
    zip_path = "/tmp/odu_ifa_256_cards_final.zip"
    
    # Find all card files
    all_card_files = []
    if os.path.exists(source_dir):
        for filename in os.listdir(source_dir):
            if filename.startswith("odu_card_") and filename.endswith(".png"):
                all_card_files.append(os.path.join(source_dir, filename))
    
    print(f"Found {len(all_card_files)} card files")
    
    # Filter and sort cards by number (1-256)
    valid_cards = []
    
    for card_path in all_card_files:
        filename = os.path.basename(card_path)
        try:
            # Extract number from filename (odu_card_123.png -> 123)
            number_str = filename.split("_")[-1].split(".")[0]
            card_number = int(number_str)
            
            # Only include cards numbered 1-256
            if 1 <= card_number <= 256:
                valid_cards.append((card_number, card_path, filename))
                
        except (ValueError, IndexError):
            continue
    
    # Sort by card number
    valid_cards.sort(key=lambda x: x[0])
    
    print(f"Filtered to {len(valid_cards)} valid cards (numbers 1-256)")
    
    # Create ZIP archive
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        
        # Add each valid card
        for card_number, card_path, filename in valid_cards:
            if os.path.exists(card_path):
                zipf.write(card_path, arcname=filename)
        
        # Create comprehensive manifest
        manifest = {
            "title": "Final 256 Odu Ifá Cards Collection",
            "description": "Complete authentic Odu cards with black backgrounds and wooden textures",
            "created_at": datetime.now().isoformat(),
            "specifications": {
                "total_cards": len(valid_cards),
                "numbering": "1 to 256 (no zero padding)",
                "image_size": "600x800 pixels",
                "background": "black",
                "wood_carving": "authentic texture with sacred symbols",
                "filename_format": "odu_card_{number}.png",
                "extracted_from": "256 Odu Excel matrix data"
            },
            "cards": [
                {
                    "number": card_number,
                    "filename": filename,
                    "size_bytes": os.path.getsize(card_path) if os.path.exists(card_path) else 0
                }
                for card_number, card_path, filename in valid_cards
            ]
        }
        
        # Add manifest to ZIP
        manifest_json = json.dumps(manifest, indent=2, ensure_ascii=False)
        zipf.writestr("manifest.json", manifest_json)
        
        # Add README
        readme_content = f"""# Final 256 Odu Ifá Cards Collection

## Overview
This archive contains the complete collection of 256 Odu Ifá cards extracted from authentic Excel matrix data.

## Card Specifications
- **Total Cards**: {len(valid_cards)}
- **Image Size**: 600x800 pixels
- **Background**: Black
- **Text Color**: White
- **Wood Carving**: Authentic texture with traditional sacred symbols
- **Filename Format**: odu_card_{{number}}.png (no zero padding)

## Card Features
- Traditional Odu names (OGBE MEJI, OYEKU MEJI, etc.)
- Authentic I/II divination line patterns
- Professional typography
- Sacred wooden carving texture
- Traditional Ifá symbols

## Numbering System
Cards are numbered 1-256 representing:
- Cards 1-16: Major Odu (Meji)
- Cards 17-256: Minor Odu combinations

## Usage
Each card displays:
1. Odu number and traditional name
2. Four traditional divination lines
3. Authentic wooden carving with sacred symbols

## Source
Generated from authentic 256 Odu Excel matrix data
Created: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## File Structure
- odu_card_1.png through odu_card_256.png
- manifest.json (technical details)
- README.md (this file)
"""
        
        zipf.writestr("README.md", readme_content)
    
    # Show results
    file_size_mb = os.path.getsize(zip_path) / (1024 * 1024)
    
    print(f"""
✅ Final 256 Odu Cards ZIP Created!

📊 Archive Details:
- File: {zip_path}
- Size: {file_size_mb:.1f} MB
- Cards: {len(valid_cards)} (numbered 1-256)
- Format: PNG images with manifest and README

📁 Contents:
- {len(valid_cards)} card images (odu_card_1.png to odu_card_256.png)
- manifest.json (technical specifications)
- README.md (documentation)

🎯 Ready for download and distribution!
""")
    
    return zip_path, len(valid_cards)

if __name__ == "__main__":
    zip_path, card_count = create_final_256_zip()
    print(f"Success! Created {zip_path} with {card_count} cards")