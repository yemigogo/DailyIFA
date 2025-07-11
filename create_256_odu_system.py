#!/usr/bin/env python3
"""
Create Complete 256 Odu System for Flask Backend
Integrates Excel data with traditional Yoruba naming and patterns
"""

import os
import json
import pandas as pd
from datetime import datetime
from PIL import Image, ImageDraw, ImageFont
import sqlite3

class Complete256OduSystem:
    def __init__(self, excel_path=None):
        """Initialize the 256 Odu system"""
        self.excel_path = excel_path
        self.odu_data = []
        self.database_path = "ifa_app.db"
        
        # Traditional 16 major Odu with authentic patterns and meanings
        self.major_odu = [
            {"name": "Eji Ogbe", "pattern": "I I I I I I I I", "meaning": "Light, clarity, divine wisdom"},
            {"name": "Oyeku Meji", "pattern": "II II II II II II II II", "meaning": "Mystery, reflection, spiritual depth"},
            {"name": "Iwori Meji", "pattern": "II I I II I II II I", "meaning": "Character development, spiritual growth"},
            {"name": "Idi Meji", "pattern": "I II II I II I I II", "meaning": "Foundation, stability, spiritual grounding"},
            {"name": "Irosun Meji", "pattern": "I I II II II II I I", "meaning": "Healing, restoration, divine medicine"},
            {"name": "Owonrin Meji", "pattern": "II II I I I I II II", "meaning": "Chaos, transformation, spiritual revolution"},
            {"name": "Obara Meji", "pattern": "I II I II II I II I", "meaning": "Passion, emotion, heart wisdom"},
            {"name": "Okanran Meji", "pattern": "II I II I I II I II", "meaning": "Protection, boundaries, spiritual defense"},
            {"name": "Ogunda Meji", "pattern": "I I I II II I I I", "meaning": "Warrior spirit, strength, divine courage"},
            {"name": "Osa Meji", "pattern": "II II II I I II II II", "meaning": "Intuition, spiritual insight, divine vision"},
            {"name": "Ika Meji", "pattern": "II I I I I I I II", "meaning": "Transformation, cunning strategy, divine intellect"},
            {"name": "Oturupon Meji", "pattern": "I II II II II II II I", "meaning": "Patience, endurance, spiritual growth"},
            {"name": "Otura Meji", "pattern": "I I II I I II I I", "meaning": "Hidden mysteries, spiritual revelation"},
            {"name": "Irete Meji", "pattern": "II II I II II I II II", "meaning": "Victory, triumph, perseverance"},
            {"name": "Ose Meji", "pattern": "I II I I I I II I", "meaning": "Abundance, prosperity, spiritual gifts"},
            {"name": "Ofun Meji", "pattern": "II I II II II II I II", "meaning": "Completion, spiritual fulfillment, divine blessing"}
        ]
    
    def load_excel_data(self):
        """Load 256 Odu data from Excel file"""
        if not self.excel_path or not os.path.exists(self.excel_path):
            print("Excel file not found, generating traditional 256 Odu system...")
            self.generate_traditional_256_odu()
            return
        
        try:
            df = pd.read_excel(self.excel_path)
            print(f"Loaded Excel with {len(df)} rows and columns: {list(df.columns)}")
            
            # Process Excel data based on expected structure
            for idx, row in df.iterrows():
                odu_entry = {
                    "id": idx + 1,
                    "name": row.get("Name", f"Odu {idx + 1}"),
                    "pattern": row.get("Pattern", "I I I I I I I I"),
                    "meaning": row.get("Meaning", "Divine wisdom and guidance"),
                    "guidance": row.get("Guidance", "Seek spiritual clarity and wisdom"),
                    "category": "Minor" if idx >= 16 else "Major",
                    "spiritual_significance": row.get("Spiritual_Significance", "Connection to divine wisdom"),
                    "traditional_story": row.get("Traditional_Story", "Ancient wisdom teachings"),
                    "modern_application": row.get("Modern_Application", "Contemporary spiritual guidance")
                }
                self.odu_data.append(odu_entry)
                
        except Exception as e:
            print(f"Error loading Excel: {e}")
            self.generate_traditional_256_odu()
    
    def generate_traditional_256_odu(self):
        """Generate traditional 256 Odu system with authentic combinations"""
        print("Generating traditional 256 Odu system...")
        
        # Create all 256 combinations (16 x 16)
        for i, primary in enumerate(self.major_odu):
            for j, secondary in enumerate(self.major_odu):
                odu_id = (i * 16) + j + 1
                
                if i == j:
                    # Major Odu (when both legs are the same)
                    odu_name = primary["name"]
                    category = "Major"
                    spiritual_significance = f"Primary {primary['name']} - {primary['meaning']}"
                else:
                    # Minor Odu (combination of two different Odu)
                    odu_name = f"{primary['name'].split()[0]}-{secondary['name'].split()[0]}"
                    category = "Minor"
                    spiritual_significance = f"Combination of {primary['name']} and {secondary['name']}"
                
                # Generate combined pattern
                primary_pattern = primary["pattern"].split()
                secondary_pattern = secondary["pattern"].split()
                combined_pattern = " ".join(primary_pattern[:4] + secondary_pattern[:4])
                
                # Generate combined meaning
                combined_meaning = f"{primary['meaning']} harmonized with {secondary['meaning']}"
                
                odu_entry = {
                    "id": odu_id,
                    "name": odu_name,
                    "pattern": combined_pattern,
                    "meaning": combined_meaning,
                    "guidance": f"Seek balance between {primary['name']} and {secondary['name']} energies",
                    "category": category,
                    "spiritual_significance": spiritual_significance,
                    "traditional_story": f"Ancient teachings of {odu_name}",
                    "modern_application": f"Apply {odu_name} wisdom in contemporary life",
                    "primary_odu": primary["name"],
                    "secondary_odu": secondary["name"]
                }
                self.odu_data.append(odu_entry)
        
        print(f"Generated {len(self.odu_data)} traditional Odu combinations")
    
    def create_database_schema(self):
        """Create SQLite database schema for 256 Odu system"""
        conn = sqlite3.connect(self.database_path)
        cursor = conn.cursor()
        
        # Create comprehensive Odu table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS odu_256 (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                pattern TEXT NOT NULL,
                meaning TEXT NOT NULL,
                guidance TEXT NOT NULL,
                category TEXT NOT NULL,
                spiritual_significance TEXT,
                traditional_story TEXT,
                modern_application TEXT,
                primary_odu TEXT,
                secondary_odu TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Clear existing data
        cursor.execute('DELETE FROM odu_256')
        
        # Insert all 256 Odu
        for odu in self.odu_data:
            cursor.execute('''
                INSERT INTO odu_256 (
                    id, name, pattern, meaning, guidance, category,
                    spiritual_significance, traditional_story, modern_application,
                    primary_odu, secondary_odu
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                odu["id"], odu["name"], odu["pattern"], odu["meaning"],
                odu["guidance"], odu["category"], odu["spiritual_significance"],
                odu["traditional_story"], odu["modern_application"],
                odu.get("primary_odu"), odu.get("secondary_odu")
            ))
        
        conn.commit()
        conn.close()
        print(f"Database updated with {len(self.odu_data)} Odu entries")
    
    def create_json_export(self):
        """Create JSON export for React frontend"""
        output_file = "odu_256_complete.json"
        
        export_data = {
            "total_odu": len(self.odu_data),
            "major_odu": [odu for odu in self.odu_data if odu["category"] == "Major"],
            "minor_odu": [odu for odu in self.odu_data if odu["category"] == "Minor"],
            "all_odu": self.odu_data,
            "created_at": datetime.now().isoformat(),
            "source": "Traditional Yoruba Odu system",
            "description": "Complete 256 Odu Ifá system with authentic patterns and meanings"
        }
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(export_data, f, ensure_ascii=False, indent=2)
        
        print(f"JSON export created: {output_file}")
        return output_file
    
    def create_flask_integration(self):
        """Create Flask integration code for 256 Odu system"""
        flask_integration = '''
# Add to app.py - 256 Odu System Routes

@app.route('/api/odu-256')
def api_get_all_256_odu():
    """Get all 256 Odu with pagination and filtering"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    category = request.args.get('category', 'all')
    search = request.args.get('search', '')
    
    conn = get_db_connection()
    
    # Build query with filters
    query = "SELECT * FROM odu_256 WHERE 1=1"
    params = []
    
    if category != 'all':
        query += " AND category = ?"
        params.append(category)
    
    if search:
        query += " AND (name LIKE ? OR meaning LIKE ? OR guidance LIKE ?)"
        params.extend([f'%{search}%', f'%{search}%', f'%{search}%'])
    
    query += " ORDER BY id LIMIT ? OFFSET ?"
    params.extend([per_page, (page - 1) * per_page])
    
    odu_list = conn.execute(query, params).fetchall()
    
    # Get total count
    count_query = "SELECT COUNT(*) as total FROM odu_256 WHERE 1=1"
    count_params = []
    
    if category != 'all':
        count_query += " AND category = ?"
        count_params.append(category)
    
    if search:
        count_query += " AND (name LIKE ? OR meaning LIKE ? OR guidance LIKE ?)"
        count_params.extend([f'%{search}%', f'%{search}%', f'%{search}%'])
    
    total = conn.execute(count_query, count_params).fetchone()['total']
    conn.close()
    
    return jsonify({
        "odu_list": [dict(odu) for odu in odu_list],
        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": total,
            "pages": (total + per_page - 1) // per_page
        },
        "filters": {
            "category": category,
            "search": search
        }
    })

@app.route('/api/odu-256/<int:odu_id>')
def api_get_specific_odu(odu_id):
    """Get specific Odu by ID"""
    conn = get_db_connection()
    odu = conn.execute('SELECT * FROM odu_256 WHERE id = ?', (odu_id,)).fetchone()
    conn.close()
    
    if odu:
        return jsonify(dict(odu))
    else:
        return jsonify({"error": "Odu not found"}), 404

@app.route('/odu-256')
def odu_256_page():
    """Complete 256 Odu system page"""
    return render_template('odu_256.html')
'''
        
        with open('flask_256_integration.py', 'w') as f:
            f.write(flask_integration)
        
        print("Flask integration code created: flask_256_integration.py")
    
    def run_complete_setup(self, excel_path=None):
        """Run complete 256 Odu system setup"""
        print("🚀 Setting up Complete 256 Odu System")
        print("=" * 50)
        
        if excel_path:
            self.excel_path = excel_path
        
        # Load data
        self.load_excel_data()
        
        # Create database
        self.create_database_schema()
        
        # Create JSON export
        json_file = self.create_json_export()
        
        # Create Flask integration
        self.create_flask_integration()
        
        print("\n✅ Complete 256 Odu System Setup Complete!")
        print(f"• Database: {self.database_path}")
        print(f"• JSON Export: {json_file}")
        print(f"• Total Odu: {len(self.odu_data)}")
        print(f"• Major Odu: {len([o for o in self.odu_data if o['category'] == 'Major'])}")
        print(f"• Minor Odu: {len([o for o in self.odu_data if o['category'] == 'Minor'])}")
        
        return {
            "total_odu": len(self.odu_data),
            "database_path": self.database_path,
            "json_export": json_file,
            "flask_integration": "flask_256_integration.py"
        }

def main():
    """Main setup function"""
    # Check for Excel file
    excel_files = [f for f in os.listdir('.') if f.endswith('.xlsx')]
    excel_path = excel_files[0] if excel_files else None
    
    if excel_path:
        print(f"Found Excel file: {excel_path}")
    else:
        print("No Excel file found, will generate traditional system")
    
    # Setup complete system
    system = Complete256OduSystem(excel_path)
    result = system.run_complete_setup()
    
    print("\n🎯 Integration Summary:")
    print("• Complete 256 Odu system ready for Flask backend")
    print("• Traditional naming conventions maintained")
    print("• JSON export available for React frontend")
    print("• Database schema created with comprehensive data")
    print("• Flask API endpoints ready for integration")

if __name__ == '__main__':
    main()