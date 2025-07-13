#!/usr/bin/env python3
"""
Create Èṣù Transformation Card with Yoruba Affirmations
Generates spiritual card for the guardian of crossroads and transformation
"""

from PIL import Image, ImageDraw, ImageFont
import textwrap
import os

def create_esu_transformation_card():
    """Create Èṣù transformation card with authentic Yoruba content"""
    
    # Create a black background image
    width, height = 800, 1200
    image = Image.new("RGB", (width, height), "black")
    draw = ImageDraw.Draw(image)

    # Load a font with fallback options
    font_paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
        "/System/Library/Fonts/Times.ttc",
        "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
    ]
    
    title_font = None
    text_font = None
    
    for font_path in font_paths:
        if os.path.exists(font_path):
            try:
                title_font = ImageFont.truetype(font_path, 48)
                text_font = ImageFont.truetype(font_path, 30)
                break
            except:
                continue
    
    # Fallback to default font if no truetype fonts found
    if not title_font:
        title_font = ImageFont.load_default()
        text_font = ImageFont.load_default()

    # Title
    title = "ÈṢÙ – FIRE OF TRANSFORMATION"
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    draw.text((width // 2 - title_width // 2, 30), title, font=title_font, fill="white")

    # Description
    description = (
        "• Guardian of the crossroads\n"
        "• Mediator between heaven and earth\n"
        "• Liberator from guilt and fear\n"
        "• Transformer of negative energy\n"
        "• Opener of spiritual paths\n"
        "• Witness to all destinies\n"
        "• Balancer of karma and justice\n"
        "• Activator of divine destiny"
    )

    # Split description into lines and draw
    y_text = 120
    for line in description.split('\n'):
        if line.strip():
            draw.text((50, y_text), line, font=text_font, fill="white")
            y_text += 40

    # Affirmations section
    affirmations_title = "Affirmations:"
    draw.text((50, y_text + 40), affirmations_title, font=title_font, fill="white")

    affirmations = [
        '"Èṣù rere, ṣi ilẹ̀kùn àyọ̀ sílẹ̀ fún mi."',
        '"Mo yọ ara mi kúrò nínú ẹ̀rù àti ìbànújẹ."',
        '"Pẹlu iná rẹ, yí ayé mi padà."'
    ]

    y_text += 100
    for affirmation in affirmations:
        draw.text((50, y_text), affirmation, font=text_font, fill="white")
        y_text += 40

    # Add English translations
    english_title = "English Translations:"
    draw.text((50, y_text + 40), english_title, font=title_font, fill="white")
    
    translations = [
        '"Good Èṣù, open the door of joy for me."',
        '"I free myself from fear and sorrow."',
        '"With your fire, transform my world."'
    ]
    
    y_text += 100
    for translation in translations:
        draw.text((50, y_text), translation, font=text_font, fill="lightgray")
        y_text += 40

    # Create output directory if it doesn't exist
    os.makedirs("static/images", exist_ok=True)
    
    # Save image
    output_path = "static/images/esu_transformation_card.png"
    image.save(output_path)
    
    print(f"Èṣù Transformation Card created: {output_path}")
    return output_path

if __name__ == "__main__":
    create_esu_transformation_card()