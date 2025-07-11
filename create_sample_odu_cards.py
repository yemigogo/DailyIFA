#!/usr/bin/env python3
"""
Generate sample Odu card images for the Flask backend
Creates traditional-style Odu cards with authentic patterns and colors
"""

import os
from PIL import Image, ImageDraw, ImageFont
import random

def create_odu_card(name, pattern, spiritual_meaning, filename):
    """Create a traditional Odu card image"""
    # Card dimensions
    width, height = 400, 600
    
    # Create image with sacred gradient background
    img = Image.new('RGB', (width, height), color='#0F172A')
    draw = ImageDraw.Draw(img)
    
    # Sacred color palette
    colors = {
        'gold': '#D4AF37',
        'amber': '#F59E0B',
        'brown': '#8B4513',
        'blue': '#1E40AF',
        'white': '#FFFFFF',
        'cream': '#F5F5DC'
    }
    
    # Background gradient effect
    for y in range(height):
        gradient_color = (
            int(15 + (52 - 15) * (y / height)),  # R: 15 to 52
            int(23 + (45 - 23) * (y / height)),  # G: 23 to 45
            int(42 + (69 - 42) * (y / height))   # B: 42 to 69
        )
        draw.line([(0, y), (width, y)], fill=gradient_color)
    
    # Draw traditional border
    border_width = 8
    draw.rectangle([border_width//2, border_width//2, width-border_width//2, height-border_width//2], 
                  outline=colors['gold'], width=border_width)
    
    # Inner decorative border
    inner_border = 20
    draw.rectangle([inner_border, inner_border, width-inner_border, height-inner_border], 
                  outline=colors['amber'], width=2)
    
    # Title area
    title_height = 80
    draw.rectangle([30, 30, width-30, title_height], fill=colors['gold'])
    
    # Try to use system font, fallback to default
    try:
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
        name_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 18)
        meaning_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 14)
    except:
        title_font = ImageFont.load_default()
        name_font = ImageFont.load_default()
        meaning_font = ImageFont.load_default()
    
    # Draw title
    title_bbox = draw.textbbox((0, 0), name, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (width - title_width) // 2
    draw.text((title_x, 45), name, fill='#1E293B', font=title_font)
    
    # Draw traditional Odu pattern
    pattern_area_top = 120
    pattern_area_height = 200
    pattern_center_x = width // 2
    pattern_center_y = pattern_area_top + (pattern_area_height // 2)
    
    # Draw Odu pattern lines (traditional divination marks)
    line_spacing = 25
    line_length = 60
    
    for i, row in enumerate(pattern):
        y = pattern_center_y - ((len(pattern) - 1) * line_spacing // 2) + (i * line_spacing)
        for j, mark in enumerate(row):
            x = pattern_center_x - ((len(row) - 1) * line_spacing // 2) + (j * line_spacing)
            
            if mark:  # Single line
                draw.line([x - line_length//2, y, x + line_length//2, y], 
                         fill=colors['white'], width=6)
            else:  # Broken line
                draw.line([x - line_length//2, y, x - 5, y], 
                         fill=colors['white'], width=6)
                draw.line([x + 5, y, x + line_length//2, y], 
                         fill=colors['white'], width=6)
    
    # Draw sacred symbols around pattern
    symbol_radius = 8
    for angle in [0, 90, 180, 270]:
        import math
        rad = math.radians(angle)
        symbol_x = pattern_center_x + int(80 * math.cos(rad))
        symbol_y = pattern_center_y + int(80 * math.sin(rad))
        draw.ellipse([symbol_x - symbol_radius, symbol_y - symbol_radius, 
                     symbol_x + symbol_radius, symbol_y + symbol_radius], 
                    fill=colors['amber'])
    
    # Spiritual meaning area
    meaning_area_top = 350
    meaning_area_height = 200
    
    # Background for meaning text
    draw.rectangle([40, meaning_area_top, width-40, meaning_area_top + meaning_area_height], 
                  fill=(30, 41, 59, 200))  # Semi-transparent
    
    # Draw meaning text
    meaning_lines = spiritual_meaning.split('\n')
    line_height = 20
    start_y = meaning_area_top + 20
    
    for i, line in enumerate(meaning_lines[:8]):  # Limit to 8 lines
        y = start_y + (i * line_height)
        text_bbox = draw.textbbox((0, 0), line, font=meaning_font)
        text_width = text_bbox[2] - text_bbox[0]
        text_x = (width - text_width) // 2
        draw.text((text_x, y), line, fill=colors['cream'], font=meaning_font)
    
    # Save the card
    img.save(filename)
    return filename

def generate_sample_odu_cards():
    """Generate sample Odu cards for the 16 major Odu"""
    cards_dir = 'static/odu_cards'
    os.makedirs(cards_dir, exist_ok=True)
    
    # 16 Major Odu with authentic patterns and meanings
    odu_data = [
        {
            'name': 'Eji Ogbe',
            'pattern': [[True, True], [True, True], [True, True], [True, True]],
            'meaning': 'Light and Clarity\nFoundation of all wisdom\nSpiritual illumination\nDivine blessing\n\nRepresents the beginning\nof all spiritual paths\nand the source of\nall knowledge'
        },
        {
            'name': 'Oyeku Meji',
            'pattern': [[False, False], [False, False], [False, False], [False, False]],
            'meaning': 'Mystery and Reflection\nDeep spiritual insight\nInner wisdom\nTransformation\n\nRepresents the hidden\nmysteries of existence\nand the power of\ncontemplation'
        },
        {
            'name': 'Iwori Meji',
            'pattern': [[False, True], [False, True], [False, True], [False, True]],
            'meaning': 'Character Development\nSpiritual growth\nPersonal transformation\nInner strength\n\nRepresents the journey\nof spiritual evolution\nand character building'
        },
        {
            'name': 'Idi Meji',
            'pattern': [[True, False], [True, False], [True, False], [True, False]],
            'meaning': 'Foundation and Stability\nSolid spiritual base\nGrounding energy\nPerseverance\n\nRepresents the importance\nof strong foundations\nin spiritual practice'
        },
        {
            'name': 'Irosun Meji',
            'pattern': [[True, True], [False, False], [True, True], [False, False]],
            'meaning': 'Healing and Restoration\nSpiritual cleansing\nRenewal of energy\nEmotional balance\n\nRepresents the power\nof healing and the\nrenewal of spiritual\nand physical well-being'
        },
        {
            'name': 'Owonrin Meji',
            'pattern': [[False, False], [True, True], [False, False], [True, True]],
            'meaning': 'Chaos and Transformation\nSpiritual upheaval\nNecessary change\nBreaking old patterns\n\nRepresents the creative\npower of destruction\nand transformation'
        },
        {
            'name': 'Obara Meji',
            'pattern': [[True, False], [False, True], [True, False], [False, True]],
            'meaning': 'Passion and Emotion\nSpiritual intensity\nEmotional depth\nCreative expression\n\nRepresents the power\nof emotional energy\nin spiritual practice'
        },
        {
            'name': 'Okanran Meji',
            'pattern': [[False, True], [True, False], [False, True], [True, False]],
            'meaning': 'Protection and Boundaries\nSpiritual defense\nSacred boundaries\nGuardian energy\n\nRepresents the importance\nof spiritual protection\nand maintaining\nsacred boundaries'
        },
        {
            'name': 'Ogunda Meji',
            'pattern': [[True, True], [True, False], [True, True], [True, False]],
            'meaning': 'Warrior Spirit\nSpiritual strength\nCourage and determination\nOvercoming obstacles\n\nRepresents the warrior\naspect of spiritual\npractice and the\nstrength to overcome'
        },
        {
            'name': 'Osa Meji',
            'pattern': [[False, False], [False, True], [False, False], [False, True]],
            'meaning': 'Intuition and Insight\nSpiritual perception\nInner knowing\nDivine guidance\n\nRepresents the power\nof intuition and\nspiritual insight'
        },
        {
            'name': 'Ika Meji',
            'pattern': [[True, False], [True, True], [True, False], [True, True]],
            'meaning': 'Transformation\nSpiritual evolution\nCunning wisdom\nStrategic thinking\n\nRepresents the power\nof transformation\nand strategic\nspiritual planning'
        },
        {
            'name': 'Oturupon Meji',
            'pattern': [[False, True], [False, False], [False, True], [False, False]],
            'meaning': 'Patience and Endurance\nSpiritual perseverance\nLong-term growth\nSteady progress\n\nRepresents the virtue\nof patience in\nspiritual development'
        },
        {
            'name': 'Otura Meji',
            'pattern': [[True, False], [False, False], [True, False], [False, False]],
            'meaning': 'Hidden Mysteries\nSpiritual secrets\nEsoteric knowledge\nDeep revelation\n\nRepresents the hidden\nmysteries of existence\nand secret wisdom'
        },
        {
            'name': 'Irete Meji',
            'pattern': [[False, True], [True, True], [False, True], [True, True]],
            'meaning': 'Victory and Triumph\nSpiritual success\nOvercoming challenges\nAchievement\n\nRepresents victory\nthrough spiritual\nstrength and\nperseverance'
        },
        {
            'name': 'Ose Meji',
            'pattern': [[True, True], [False, True], [True, True], [False, True]],
            'meaning': 'Abundance and Prosperity\nSpiritual gifts\nMaterial blessings\nGenerosity\n\nRepresents the flow\nof abundance and\nspiritual gifts'
        },
        {
            'name': 'Ofun Meji',
            'pattern': [[False, False], [True, False], [False, False], [True, False]],
            'meaning': 'Completion and Fulfillment\nSpiritual wholeness\nDivine blessing\nSacred completion\n\nRepresents the completion\nof spiritual journey\nand divine fulfillment'
        }
    ]
    
    created_cards = []
    for odu in odu_data:
        filename = os.path.join(cards_dir, f"{odu['name'].lower().replace(' ', '-')}.png")
        try:
            create_odu_card(odu['name'], odu['pattern'], odu['meaning'], filename)
            created_cards.append(filename)
            print(f"Created: {filename}")
        except Exception as e:
            print(f"Error creating {odu['name']}: {e}")
    
    return created_cards

if __name__ == '__main__':
    print("Generating sample Odu cards...")
    cards = generate_sample_odu_cards()
    print(f"Generated {len(cards)} Odu cards successfully!")
    print("Cards available at: /odu")
    print("API endpoint: /api/odu-cards")