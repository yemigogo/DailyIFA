#!/usr/bin/env python3
"""
Generate Authentic Odu Cards from User's Excel Data
Creates traditional-style Odu card images with authentic patterns and sacred aesthetics
"""

import os
import sqlite3
from PIL import Image, ImageDraw, ImageFont
import json
from datetime import datetime

class AuthenticOduCardGenerator:
    def __init__(self):
        self.database_path = "ifa_app.db"
        self.static_cards_dir = "static/odu_cards"
        self.card_width = 640
        self.card_height = 512
        self.carving_width = 128
        
        # Create output directory
        os.makedirs(self.static_cards_dir, exist_ok=True)
        
        # Sacred color palette
        self.colors = {
            'background': '#1a1a1a',  # Deep black
            'primary': '#FFD700',     # Sacred gold
            'secondary': '#FF8C00',   # Amber
            'accent': '#4169E1',      # Royal blue
            'text': '#FFFFFF',        # Pure white
            'carving': '#654321',     # Wood brown
            'pattern': '#FF6B35'      # Sacred orange
        }
        
        # Load fonts
        self.setup_fonts()
    
    def setup_fonts(self):
        """Setup fonts for card generation"""
        try:
            self.title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 28)
            self.line_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
            self.meaning_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 16)
        except OSError:
            # Fallback to default font
            self.title_font = ImageFont.load_default()
            self.line_font = ImageFont.load_default()
            self.meaning_font = ImageFont.load_default()
    
    def create_sacred_gradient(self, width, height):
        """Create sacred gradient background"""
        gradient = Image.new('RGB', (width, height), self.colors['background'])
        draw = ImageDraw.Draw(gradient)
        
        # Add subtle spiritual patterns
        for i in range(0, width, 40):
            for j in range(0, height, 40):
                draw.ellipse([i, j, i+8, j+8], fill=self.colors['accent'], outline=None)
        
        return gradient
    
    def create_wood_carving_texture(self, width, height):
        """Create wood carving texture for traditional aesthetic"""
        carving = Image.new('RGB', (width, height), self.colors['carving'])
        draw = ImageDraw.Draw(carving)
        
        # Add wood grain pattern
        for i in range(0, height, 8):
            color_variation = min(255, int(self.colors['carving'].replace('#', ''), 16) + (i % 20))
            hex_color = f'#{color_variation:06x}'
            draw.line([(0, i), (width, i)], fill=hex_color, width=2)
        
        # Add carved symbols
        for i in range(20, height-20, 60):
            draw.ellipse([width//2-15, i, width//2+15, i+30], 
                        fill=self.colors['pattern'], outline=self.colors['primary'])
        
        return carving
    
    def draw_odu_pattern(self, draw, pattern_text, x, y):
        """Draw traditional Odu pattern with sacred styling"""
        lines = pattern_text.split()
        
        for i, line in enumerate(lines):
            line_y = y + (i * 45)
            
            if line == 'I':
                # Single line
                draw.rectangle([x-40, line_y-8, x+40, line_y+8], 
                              fill=self.colors['primary'], outline=self.colors['secondary'])
            elif line == 'II':
                # Double line
                draw.rectangle([x-40, line_y-12, x-10, line_y-4], 
                              fill=self.colors['primary'], outline=self.colors['secondary'])
                draw.rectangle([x+10, line_y-12, x+40, line_y-4], 
                              fill=self.colors['primary'], outline=self.colors['secondary'])
    
    def generate_odu_card(self, odu_data):
        """Generate a single authentic Odu card"""
        # Create card base
        card = Image.new('RGB', (self.card_width, self.card_height), self.colors['background'])
        
        # Add sacred gradient
        gradient = self.create_sacred_gradient(self.card_width - self.carving_width, self.card_height)
        card.paste(gradient, (0, 0))
        
        # Add wood carving texture
        carving = self.create_wood_carving_texture(self.carving_width, self.card_height)
        card.paste(carving, (self.card_width - self.carving_width, 0))
        
        # Draw on card
        draw = ImageDraw.Draw(card)
        
        # Add decorative border
        draw.rectangle([10, 10, self.card_width-self.carving_width-10, self.card_height-10], 
                      outline=self.colors['primary'], width=3)
        
        # Title
        title_x = (self.card_width - self.carving_width) // 2
        draw.text((title_x, 40), odu_data['name'], fill=self.colors['text'], 
                 anchor="mm", font=self.title_font)
        
        # Category badge
        category_color = self.colors['accent'] if odu_data['category'] == 'Major' else self.colors['secondary']
        draw.rectangle([title_x-50, 65, title_x+50, 85], fill=category_color)
        draw.text((title_x, 75), odu_data['category'], fill=self.colors['text'], 
                 anchor="mm", font=self.meaning_font)
        
        # Odu pattern
        self.draw_odu_pattern(draw, odu_data['pattern'], title_x, 120)
        
        # Meaning (truncated)
        meaning_text = odu_data['meaning'][:60] + "..." if len(odu_data['meaning']) > 60 else odu_data['meaning']
        draw.text((title_x, 350), meaning_text, fill=self.colors['text'], 
                 anchor="mm", font=self.meaning_font)
        
        # Number
        draw.text((title_x, 450), f"#{odu_data['number']}", fill=self.colors['accent'], 
                 anchor="mm", font=self.meaning_font)
        
        return card
    
    def generate_all_cards(self):
        """Generate all 256 authentic Odu cards"""
        print("🎨 Generating 256 Authentic Odu Cards from Your Excel Data")
        print("=" * 60)
        
        # Load authentic data from database
        conn = sqlite3.connect(self.database_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, name, pattern, meaning, category
            FROM odu_256_complete
            ORDER BY id
        ''')
        
        odu_records = cursor.fetchall()
        conn.close()
        
        if not odu_records:
            print("❌ No Odu data found in database. Please run integration first.")
            return
        
        generated_cards = []
        
        for record in odu_records:
            odu_data = {
                'number': record[0],
                'name': record[1],
                'pattern': record[2],
                'meaning': record[3],
                'category': record[4]
            }
            
            # Generate card
            card = self.generate_odu_card(odu_data)
            
            # Save card
            filename = f"{odu_data['number']:03d}_{odu_data['name'].replace(' ', '_')}.png"
            filepath = os.path.join(self.static_cards_dir, filename)
            card.save(filepath)
            
            generated_cards.append({
                'number': odu_data['number'],
                'name': odu_data['name'],
                'filename': filename,
                'filepath': filepath
            })
            
            if len(generated_cards) % 50 == 0:
                print(f"Generated {len(generated_cards)} cards...")
        
        print(f"✅ Generated {len(generated_cards)} authentic Odu cards")
        
        # Create card manifest
        self.create_card_manifest(generated_cards)
        
        return generated_cards
    
    def create_card_manifest(self, cards):
        """Create manifest of generated cards"""
        manifest = {
            'metadata': {
                'title': 'Authentic 256 Odu Cards',
                'source': 'User Excel Data',
                'total_cards': len(cards),
                'generated_at': datetime.now().isoformat(),
                'card_dimensions': f'{self.card_width}x{self.card_height}',
                'directory': self.static_cards_dir
            },
            'cards': cards,
            'categories': {
                'major': [card for card in cards if card['number'] in [1, 18, 35, 52, 69, 86, 103, 120, 137, 154, 171, 188, 205, 222, 239, 256]],
                'minor': [card for card in cards if card['number'] not in [1, 18, 35, 52, 69, 86, 103, 120, 137, 154, 171, 188, 205, 222, 239, 256]]
            }
        }
        
        manifest_file = os.path.join(self.static_cards_dir, 'card_manifest.json')
        with open(manifest_file, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, ensure_ascii=False, indent=2)
        
        print(f"📋 Card manifest created: {manifest_file}")
    
    def update_flask_integration(self):
        """Update Flask app to serve the generated cards"""
        print("🔧 Updating Flask integration for authentic Odu cards...")
        
        # Create Flask route addition
        flask_route_code = '''
# Authentic Odu Cards Routes (Add to app.py)
@app.route('/api/odu-cards-authentic')
def api_odu_cards_authentic():
    """API endpoint for authentic Odu cards generated from user Excel data"""
    try:
        manifest_path = os.path.join('static', 'odu_cards', 'card_manifest.json')
        
        if os.path.exists(manifest_path):
            with open(manifest_path, 'r', encoding='utf-8') as f:
                manifest = json.load(f)
            
            return jsonify({
                'status': 'success',
                'cards': manifest['cards'],
                'metadata': manifest['metadata'],
                'total_cards': manifest['metadata']['total_cards']
            })
        else:
            return jsonify({
                'status': 'error',
                'message': 'Card manifest not found. Please generate cards first.'
            })
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error loading authentic cards: {str(e)}'
        })

@app.route('/odu-cards-authentic')
def authentic_odu_cards():
    """Display authentic Odu cards from user Excel data"""
    return render_template('authentic_odu_cards.html')
'''
        
        # Save Flask integration code
        with open('flask_authentic_cards_integration.py', 'w') as f:
            f.write(flask_route_code)
        
        print("📁 Flask integration code saved to: flask_authentic_cards_integration.py")
        print("   Add this code to your app.py to enable authentic card serving")
    
    def run_complete_generation(self):
        """Run complete authentic card generation"""
        print("🚀 Starting Authentic Odu Card Generation")
        print("=" * 60)
        
        # Generate all cards
        cards = self.generate_all_cards()
        
        # Update Flask integration
        self.update_flask_integration()
        
        print(f"\n✅ Authentic Odu Card Generation Complete!")
        print("=" * 60)
        print(f"📊 Generation Statistics:")
        print(f"• Total Cards Generated: {len(cards)}")
        print(f"• Card Dimensions: {self.card_width}x{self.card_height}")
        print(f"• Output Directory: {self.static_cards_dir}")
        print(f"• Source: User's Authentic Excel Data")
        
        print(f"\n🎨 Card Features:")
        print("• Sacred color palette (gold, amber, blue)")
        print("• Traditional wood carving texture")
        print("• Authentic I/II line patterns")
        print("• Spiritual gradient backgrounds")
        print("• Category badges (Major/Minor)")
        print("• Traditional Yoruba aesthetics")
        
        print(f"\n🔗 Integration Points:")
        print(f"• Static Files: {self.static_cards_dir}/")
        print("• Flask API: /api/odu-cards-authentic")
        print("• Card Manifest: card_manifest.json")
        print("• Database: odu_256_complete table")
        
        return {
            'cards_generated': len(cards),
            'output_directory': self.static_cards_dir,
            'manifest_file': os.path.join(self.static_cards_dir, 'card_manifest.json'),
            'flask_integration': 'flask_authentic_cards_integration.py'
        }

def main():
    """Main generation function"""
    generator = AuthenticOduCardGenerator()
    result = generator.run_complete_generation()
    
    print(f"\n🎉 {result['cards_generated']} Authentic Odu Cards Generated!")
    print("Your Excel data has been transformed into beautiful traditional card images.")

if __name__ == '__main__':
    main()