#!/usr/bin/env python3
"""
Generate Odu Card Images from Excel Pattern Data
Creates visual cards based on the patterns found in the Excel matrix
"""

import pandas as pd
from PIL import Image, ImageDraw, ImageFont
import os
import json
from datetime import datetime
import re

class ExcelOduCardGenerator:
    def __init__(self):
        self.excel_path = "attached_assets/256_ODU_graph_1752246322368.xlsx"
        self.output_dir = "static/odu_cards"
        self.card_width = 640
        self.card_height = 512
        
        # Sacred color palette
        self.colors = {
            'gold': '#FFD700',
            'amber': '#FFA500',
            'blue': '#1E40AF',
            'dark_blue': '#1E3A8A',
            'white': '#FFFFFF',
            'black': '#000000',
            'brown': '#8B4513',
            'cream': '#F5F5DC'
        }
        
        os.makedirs(self.output_dir, exist_ok=True)
        
    def load_excel_data(self):
        """Load and parse Excel data"""
        try:
            df = pd.read_excel(self.excel_path, header=None)
            print(f"Loaded Excel data: {df.shape}")
            
            # Extract Odu data from cells
            odu_data = []
            for row in range(df.shape[0]):
                for col in range(df.shape[1]):
                    cell_value = df.iloc[row, col]
                    if pd.notna(cell_value):
                        cell_str = str(cell_value)
                        if self.is_odu_cell(cell_str):
                            odu_info = self.parse_odu_cell(cell_str, len(odu_data) + 1)
                            if odu_info:
                                odu_data.append(odu_info)
            
            print(f"Extracted {len(odu_data)} Odu entries")
            return odu_data
            
        except Exception as e:
            print(f"Error loading Excel data: {e}")
            return []
    
    def is_odu_cell(self, text):
        """Check if cell contains Odu data"""
        odu_names = ['OGBE', 'OYEKU', 'IWORI', 'ODI', 'IROSUN', 'OWONRIN', 
                     'OBARA', 'OKANRAN', 'OGUNDA', 'OSA', 'IKA', 'OTURUPON', 
                     'OTURA', 'IRETE', 'OSE', 'OFUN', 'MEJI']
        
        text_upper = text.upper()
        return any(name in text_upper for name in odu_names)
    
    def parse_odu_cell(self, cell_text, number):
        """Parse Odu information from cell"""
        try:
            lines = cell_text.strip().split('\n')
            
            # Extract number (first line if numeric)
            odu_number = number
            if lines and lines[0].strip().isdigit():
                odu_number = int(lines[0].strip())
                lines = lines[1:]
            
            # Extract Odu names
            odu_names = []
            pattern_lines = []
            
            for line in lines:
                line = line.strip()
                if line and any(name in line.upper() for name in ['OGBE', 'OYEKU', 'IWORI', 'ODI', 'IROSUN', 'OWONRIN', 'OBARA', 'OKANRAN', 'OGUNDA', 'OSA', 'IKA', 'OTURUPON', 'OTURA', 'IRETE', 'OSE', 'OFUN', 'MEJI']):
                    odu_names.append(line)
                elif line and ('I' in line or 'II' in line or ' ' in line):
                    pattern_lines.append(line)
            
            # Create Odu name
            if len(odu_names) == 1:
                odu_name = odu_names[0] + " MEJI"
            elif len(odu_names) == 2:
                odu_name = f"{odu_names[0]} {odu_names[1]}"
            else:
                odu_name = f"ODU {odu_number}"
            
            # Clean pattern lines
            if not pattern_lines:
                pattern_lines = ["II II", "I I", "II II", "I I"]
            
            return {
                'number': odu_number,
                'name': odu_name,
                'pattern_lines': pattern_lines,
                'raw_text': cell_text
            }
            
        except Exception as e:
            print(f"Error parsing cell: {e}")
            return None
    
    def create_odu_card(self, odu_data):
        """Create visual Odu card from data"""
        try:
            # Create image with sacred gradient background
            img = Image.new('RGB', (self.card_width, self.card_height), self.colors['cream'])
            draw = ImageDraw.Draw(img)
            
            # Create gradient background
            for y in range(self.card_height):
                blend_factor = y / self.card_height
                # Sacred gradient from gold to amber
                color = self.blend_colors(self.colors['gold'], self.colors['amber'], blend_factor)
                draw.rectangle([0, y, self.card_width, y+1], fill=color)
            
            # Draw sacred border
            border_width = 8
            draw.rectangle([0, 0, self.card_width, self.card_height], 
                          outline=self.colors['dark_blue'], width=border_width)
            
            # Try to load font
            try:
                title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 32)
                pattern_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
                number_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
            except:
                title_font = ImageFont.load_default()
                pattern_font = ImageFont.load_default()
                number_font = ImageFont.load_default()
            
            # Draw Odu number
            number_text = str(odu_data['number'])
            draw.text((20, 20), number_text, fill=self.colors['dark_blue'], font=number_font)
            
            # Draw Odu name
            name_parts = odu_data['name'].split()
            if len(name_parts) > 1:
                # Split into two lines for better fit
                line1 = name_parts[0]
                line2 = ' '.join(name_parts[1:])
                draw.text((20, 80), line1, fill=self.colors['dark_blue'], font=title_font)
                draw.text((20, 120), line2, fill=self.colors['dark_blue'], font=title_font)
            else:
                draw.text((20, 80), odu_data['name'], fill=self.colors['dark_blue'], font=title_font)
            
            # Draw Odu pattern
            pattern_start_y = 180
            line_height = 40
            
            for i, pattern_line in enumerate(odu_data['pattern_lines'][:4]):  # Max 4 lines
                y_pos = pattern_start_y + (i * line_height)
                
                # Clean up pattern line
                clean_pattern = pattern_line.strip()
                
                # Draw pattern symbols
                x_pos = 50
                for char in clean_pattern:
                    if char == 'I':
                        # Single line (broken)
                        draw.rectangle([x_pos, y_pos, x_pos + 15, y_pos + 25], 
                                     fill=self.colors['dark_blue'])
                        x_pos += 25
                    elif char == 'I' and clean_pattern[clean_pattern.index(char):clean_pattern.index(char)+2] == 'II':
                        # Double line (unbroken)
                        draw.rectangle([x_pos, y_pos, x_pos + 35, y_pos + 25], 
                                     fill=self.colors['dark_blue'])
                        x_pos += 45
                    elif char == ' ':
                        x_pos += 15
                
                # Also draw the text pattern
                draw.text((300, y_pos), clean_pattern, fill=self.colors['black'], font=pattern_font)
            
            # Draw decorative elements
            self.draw_sacred_symbols(draw, img)
            
            # Save image
            filename = f"{odu_data['number']:03d}_{self.clean_filename(odu_data['name'])}.png"
            filepath = os.path.join(self.output_dir, filename)
            img.save(filepath, 'PNG')
            
            return {
                'filename': filename,
                'filepath': filepath,
                'odu_data': odu_data
            }
            
        except Exception as e:
            print(f"Error creating card for {odu_data.get('name', 'unknown')}: {e}")
            return None
    
    def draw_sacred_symbols(self, draw, img):
        """Draw sacred geometric symbols"""
        # Draw corner symbols
        symbol_size = 30
        
        # Top right corner - sacred circle
        draw.ellipse([self.card_width - symbol_size - 20, 20, 
                     self.card_width - 20, symbol_size + 20], 
                    outline=self.colors['dark_blue'], width=3)
        
        # Bottom left corner - sacred triangle
        points = [
            (20, self.card_height - 20),
            (50, self.card_height - 20),
            (35, self.card_height - 40)
        ]
        draw.polygon(points, outline=self.colors['dark_blue'], width=3)
        
        # Bottom right corner - sacred square
        draw.rectangle([self.card_width - symbol_size - 20, self.card_height - symbol_size - 20,
                       self.card_width - 20, self.card_height - 20], 
                      outline=self.colors['dark_blue'], width=3)
    
    def blend_colors(self, color1, color2, factor):
        """Blend two hex colors"""
        def hex_to_rgb(hex_color):
            hex_color = hex_color.lstrip('#')
            return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
        
        def rgb_to_hex(rgb):
            return '#{:02x}{:02x}{:02x}'.format(int(rgb[0]), int(rgb[1]), int(rgb[2]))
        
        rgb1 = hex_to_rgb(color1)
        rgb2 = hex_to_rgb(color2)
        
        blended = [
            rgb1[0] * (1 - factor) + rgb2[0] * factor,
            rgb1[1] * (1 - factor) + rgb2[1] * factor,
            rgb1[2] * (1 - factor) + rgb2[2] * factor
        ]
        
        return rgb_to_hex(blended)
    
    def clean_filename(self, name):
        """Clean filename for safe saving"""
        safe_name = re.sub(r'[^\w\s-]', '', name)
        safe_name = re.sub(r'[-\s]+', '_', safe_name)
        return safe_name.strip('_')
    
    def generate_all_cards(self):
        """Generate all Odu cards from Excel data"""
        print("🎨 Starting Odu Card Generation from Excel Data...")
        
        # Load Excel data
        odu_data_list = self.load_excel_data()
        if not odu_data_list:
            print("No Odu data found in Excel file")
            return []
        
        # Generate cards
        generated_cards = []
        for odu_data in odu_data_list:
            card_info = self.create_odu_card(odu_data)
            if card_info:
                generated_cards.append(card_info)
                if len(generated_cards) <= 20 or len(generated_cards) % 50 == 0:
                    print(f"Generated card {len(generated_cards)}: {odu_data['name']}")
        
        print(f"Generated {len(generated_cards)} Odu cards")
        
        # Create manifest
        manifest = {
            "metadata": {
                "title": "Odu Cards Generated from Excel Data",
                "source": "256 Odu Excel Matrix",
                "generated_at": datetime.now().isoformat(),
                "total_cards": len(generated_cards),
                "card_dimensions": f"{self.card_width}x{self.card_height}",
                "color_palette": self.colors
            },
            "cards": [
                {
                    "number": card['odu_data']['number'],
                    "name": card['odu_data']['name'],
                    "filename": card['filename'],
                    "filepath": card['filepath'],
                    "pattern_lines": card['odu_data']['pattern_lines'],
                    "has_authentic_image": True
                }
                for card in generated_cards
            ]
        }
        
        # Save manifest
        manifest_path = os.path.join(self.output_dir, "generated_cards_manifest.json")
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2, ensure_ascii=False)
        
        # Update the main card manifest
        self.update_main_manifest(generated_cards)
        
        return generated_cards
    
    def update_main_manifest(self, generated_cards):
        """Update the main card manifest with generated cards"""
        try:
            # Load existing manifest
            manifest_path = os.path.join(self.output_dir, "card_manifest.json")
            with open(manifest_path, 'r', encoding='utf-8') as f:
                manifest = json.load(f)
            
            # Update cards with image information
            for card in manifest['cards']:
                for gen_card in generated_cards:
                    if card['number'] == gen_card['odu_data']['number']:
                        card['image_path'] = f"/static/odu_cards/{gen_card['filename']}"
                        card['has_authentic_image'] = True
                        card['generated_from_excel'] = True
                        break
            
            # Save updated manifest
            with open(manifest_path, 'w', encoding='utf-8') as f:
                json.dump(manifest, f, indent=2, ensure_ascii=False)
            
            print(f"Updated main manifest with {len(generated_cards)} card images")
            
        except Exception as e:
            print(f"Error updating main manifest: {e}")
    
    def run_complete_generation(self):
        """Run complete card generation process"""
        print("🚀 Starting Complete Odu Card Generation...")
        
        generated_cards = self.generate_all_cards()
        
        print(f"""
✅ Odu Card Generation Complete!

📊 Results:
- Cards Generated: {len(generated_cards)}
- Image Size: {self.card_width}x{self.card_height}
- Color Palette: Sacred gold/amber gradient
- Sacred Symbols: Geometric patterns

📁 Files:
- Cards saved to: {self.output_dir}
- Manifest: {self.output_dir}/generated_cards_manifest.json
- Updated main manifest with image paths

🎯 Cards ready for display in the app!
""")
        
        return len(generated_cards) > 0

def main():
    generator = ExcelOduCardGenerator()
    success = generator.run_complete_generation()
    
    if success:
        print("🎉 Card generation successful!")
    else:
        print("❌ Card generation failed")

if __name__ == "__main__":
    main()