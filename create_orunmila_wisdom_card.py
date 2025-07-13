#!/usr/bin/env python3
"""
Create Òrúnmìlà Wisdom & Intuition Card
Generates spiritual card for the Orisha of divine wisdom and divination
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_orunmila_wisdom_card():
    """Create Òrúnmìlà wisdom card with authentic spiritual content"""
    
    # Create a new image
    width, height = 800, 1200
    image = Image.new("RGB", (width, height), "black")
    draw = ImageDraw.Draw(image)

    # Try to load fonts with fallbacks
    try:
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 48)
        text_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 30)
    except:
        try:
            title_font = ImageFont.truetype("arial.ttf", 48)
            text_font = ImageFont.truetype("arial.ttf", 30)
        except:
            title_font = ImageFont.load_default()
            text_font = ImageFont.load_default()

    # Title
    title = "ÒRÚNMÌLÀ – WISDOM & INTUITION"
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    draw.text((width // 2 - title_width // 2, 30), title, font=title_font, fill="white")

    # Description
    description = (
        "• Custodian of divine wisdom\n"
        "• Master of intuitive sight\n"
        "• Seer of destinies and hidden truths\n"
        "• Guide to inner knowing and clarity\n"
        "• Channel for Orí (divine consciousness)\n"
        "• Bringer of balance, insight, and vision\n"
        "• Teacher of spiritual laws and Odu Ifá"
    )

    y_text = 120
    for line in description.split("\n"):
        draw.text((50, y_text), line, font=text_font, fill="white")
        y_text += 40

    # Affirmations section
    affirmations_title = "Affirmations:"
    draw.text((50, y_text + 40), affirmations_title, font=title_font, fill="white")

    affirmations = [
        '"Orunmila, open my mind to divine insight."',
        '"My path is clear; my spirit is guided."',
        '"I awaken the intuition within me."'
    ]

    y_text += 100
    for affirmation in affirmations:
        draw.text((50, y_text), affirmation, font=text_font, fill="white")
        y_text += 40

    # Ensure static/images directory exists
    os.makedirs("static/images", exist_ok=True)
    
    # Save the image
    output_path = "static/images/orunmila_wisdom_card.png"
    image.save(output_path)
    
    print(f"✅ Òrúnmìlà Wisdom & Intuition Card created: {output_path}")
    return output_path

if __name__ == "__main__":
    create_orunmila_wisdom_card()