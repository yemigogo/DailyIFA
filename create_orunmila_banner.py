#!/usr/bin/env python3
"""
Create Òrúnmìlà Banner Image
Generates banner for mobile-first HTML template
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_orunmila_banner():
    """Create Òrúnmìlà banner with authentic divine wisdom styling"""
    
    # Create banner image
    banner_width, banner_height = 1200, 600
    banner = Image.new("RGB", (banner_width, banner_height), "black")
    draw = ImageDraw.Draw(banner)

    # Try to load fonts with fallbacks
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 64)
    except:
        try:
            font = ImageFont.truetype("arial.ttf", 64)
        except:
            font = ImageFont.load_default()

    # Draw centered text
    text = "ÒRÚNMÌLÀ – Intuition & Divine Wisdom"
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_position = ((banner_width - text_width) // 2, banner_height // 2 - 32)
    draw.text(text_position, text, font=font, fill="#A4DDED")

    # Ensure static/images directory exists
    os.makedirs("static/images", exist_ok=True)
    
    # Save banner
    banner_path = "static/images/orunmila_banner.jpg"
    banner.save(banner_path)
    
    print(f"✅ Òrúnmìlà Banner created: {banner_path}")
    return banner_path

if __name__ == "__main__":
    create_orunmila_banner()