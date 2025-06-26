import os, zipfile, textwrap, io, datetime, pathlib, json, base64, sys, re

"""
Ifá Data Processing Utility
Handles data export, import, and processing for the Ifá Daily Reading App
"""

class IfaDataProcessor:
    def __init__(self, base_path="."):
        self.base_path = pathlib.Path(base_path)
        self.data_dir = self.base_path / "data"
        self.output_dir = self.base_path / "exports"
        self.timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        
    def create_directories(self):
        """Ensure required directories exist"""
        self.data_dir.mkdir(exist_ok=True)
        self.output_dir.mkdir(exist_ok=True)
        
    def export_odu_data(self, format="json"):
        """Export Odu database to specified format"""
        self.create_directories()
        
        # Read Odu data from TypeScript files
        odu_files = [
            "server/data/odu-database.ts",
            "server/data/odu-database-updated.ts"
        ]
        
        odu_data = []
        for file_path in odu_files:
            if os.path.exists(file_path):
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # Extract Odu data using regex
                    odu_matches = re.findall(r'{\s*id:\s*(\d+).*?}', content, re.DOTALL)
                    print(f"Found {len(odu_matches)} Odus in {file_path}")
                    
        if format == "json":
            export_file = self.output_dir / f"odu_export_{self.timestamp}.json"
            with open(export_file, 'w', encoding='utf-8') as f:
                json.dump(odu_data, f, indent=2, ensure_ascii=False)
            print(f"Exported Odu data to {export_file}")
            
        return export_file
        
    def create_backup_archive(self):
        """Create comprehensive backup of Ifá app data"""
        self.create_directories()
        
        archive_name = f"ifa_backup_{self.timestamp}.zip"
        archive_path = self.output_dir / archive_name
        
        backup_files = [
            "server/data/",
            "static/audio/pronunciation/",
            "shared/schema.ts",
            "package.json",
            "replit.md"
        ]
        
        with zipfile.ZipFile(archive_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for item in backup_files:
                item_path = pathlib.Path(item)
                if item_path.exists():
                    if item_path.is_file():
                        zipf.write(item_path, item_path.name)
                    elif item_path.is_dir():
                        for file_path in item_path.rglob('*'):
                            if file_path.is_file():
                                arc_path = file_path.relative_to(item_path.parent)
                                zipf.write(file_path, arc_path)
                                
        print(f"Created backup archive: {archive_path}")
        return archive_path
        
    def process_yoruba_text(self, text):
        """Process and validate Yoruba text with diacritical marks"""
        # Common Yoruba diacritical patterns
        yoruba_chars = re.compile(r'[àáèéìíòóùúẹẹ́ọọ́ṣǹ]')
        
        # Extract Yoruba words
        yoruba_words = []
        words = text.split()
        
        for word in words:
            if yoruba_chars.search(word):
                clean_word = re.sub(r'[^\w\u00C0-\u017F]', '', word)
                if clean_word:
                    yoruba_words.append(clean_word)
                    
        return {
            'original_text': text,
            'yoruba_words': yoruba_words,
            'word_count': len(yoruba_words),
            'has_diacritics': bool(yoruba_words)
        }
        
    def generate_pronunciation_manifest(self):
        """Generate manifest of available pronunciation files"""
        audio_dir = pathlib.Path("static/audio/pronunciation")
        
        if not audio_dir.exists():
            print("Pronunciation directory not found")
            return None
            
        manifest = {
            'generated_at': datetime.datetime.now().isoformat(),
            'total_files': 0,
            'files': []
        }
        
        for audio_file in audio_dir.glob('*.mp3'):
            file_info = {
                'filename': audio_file.name,
                'word': audio_file.stem,
                'size_bytes': audio_file.stat().st_size,
                'modified': datetime.datetime.fromtimestamp(
                    audio_file.stat().st_mtime
                ).isoformat()
            }
            manifest['files'].append(file_info)
            
        manifest['total_files'] = len(manifest['files'])
        
        # Save manifest
        manifest_path = self.output_dir / f"pronunciation_manifest_{self.timestamp}.json"
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2)
            
        print(f"Generated pronunciation manifest: {manifest_path}")
        return manifest_path
        
    def extract_odu_wisdom(self):
        """Extract wisdom quotes and verses from Odu data"""
        wisdom_collection = {
            'extracted_at': datetime.datetime.now().isoformat(),
            'wisdom_entries': []
        }
        
        # Read from database files
        db_files = [
            "server/data/odu-database.ts",
            "server/data/odu-database-updated.ts"
        ]
        
        for db_file in db_files:
            if os.path.exists(db_file):
                with open(db_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                    # Extract wisdom quotes using regex
                    wisdom_pattern = r'message:\s*["\']([^"\']+)["\']'
                    wisdom_matches = re.findall(wisdom_pattern, content)
                    
                    for wisdom in wisdom_matches:
                        if len(wisdom) > 50:  # Filter for substantial wisdom
                            wisdom_collection['wisdom_entries'].append({
                                'text': wisdom,
                                'source': db_file,
                                'length': len(wisdom)
                            })
                            
        # Save wisdom collection
        wisdom_path = self.output_dir / f"odu_wisdom_{self.timestamp}.json"
        with open(wisdom_path, 'w', encoding='utf-8') as f:
            json.dump(wisdom_collection, f, indent=2, ensure_ascii=False)
            
        print(f"Extracted {len(wisdom_collection['wisdom_entries'])} wisdom entries")
        return wisdom_path

def main():
    """Main execution function"""
    processor = IfaDataProcessor()
    
    print("Ifá Data Processing Utility")
    print("=" * 40)
    
    # Create backup
    backup_path = processor.create_backup_archive()
    
    # Generate pronunciation manifest
    manifest_path = processor.generate_pronunciation_manifest()
    
    # Extract wisdom
    wisdom_path = processor.extract_odu_wisdom()
    
    # Export Odu data
    export_path = processor.export_odu_data()
    
    print("\nProcessing Complete!")
    print(f"Backup: {backup_path}")
    print(f"Manifest: {manifest_path}")
    print(f"Wisdom: {wisdom_path}")
    print(f"Export: {export_path}")

if __name__ == "__main__":
    main()