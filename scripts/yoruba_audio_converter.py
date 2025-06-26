import os
import json
import subprocess
from pathlib import Path
import shutil

class YorubaAudioConverter:
    def __init__(self):
        self.conversion_instructions = [
            {"original_word": "ṣàngó", "filename": "sango.mp3"},
            {"original_word": "òrìṣà", "filename": "orisa.mp3"},
            {"original_word": "ọ̀run", "filename": "orun.mp3"},
            {"original_word": "ayé", "filename": "aye.mp3"},
            {"original_word": "ògún", "filename": "ogun.mp3"},
            {"original_word": "ìwòrì", "filename": "iwori.mp3"},
            {"original_word": "ẹ̀jẹ̀", "filename": "eje.mp3"},
            {"original_word": "àlàáfíà", "filename": "alafia.mp3"},
            {"original_word": "odù", "filename": "odu.mp3"},
            {"original_word": "bàbáláwo", "filename": "babalawo.mp3"},
            {"original_word": "ìyánífẹ́", "filename": "iyanife.mp3"},
            {"original_word": "ọjọ́", "filename": "ojo.mp3"},
            {"original_word": "ọsẹ̀", "filename": "ose.mp3"},
            {"original_word": "ọdún", "filename": "odun.mp3"},
            {"original_word": "ìmọ̀", "filename": "imo.mp3"},
            {"original_word": "àdúrà", "filename": "adura.mp3"},
            {"original_word": "àṣẹ", "filename": "ase.mp3"},
            {"original_word": "ifá", "filename": "ifa.mp3"},
            {"original_word": "yemọja", "filename": "yemoja.mp3"},
            {"original_word": "ọbàtálá", "filename": "obatala.mp3"},
            {"original_word": "ọya", "filename": "oya.mp3"},
            {"original_word": "èṣù", "filename": "esu.mp3"},
            {"original_word": "ọ̀ṣun", "filename": "osun.mp3"},
            {"original_word": "ọ̀rúnmìlà", "filename": "orunmila.mp3"}
        ]
        
        self.input_dir = Path("audio_sources")
        self.output_dir = Path("static/audio/pronunciation")
        self.temp_dir = Path("temp_conversion")
        
    def setup_directories(self):
        """Create necessary directories"""
        self.input_dir.mkdir(exist_ok=True)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.temp_dir.mkdir(exist_ok=True)
        
    def save_conversion_list(self):
        """Save conversion instructions to JSON file"""
        conversion_file = Path("yoruba_audio_conversion_list.json")
        with open(conversion_file, "w", encoding="utf-8") as f:
            json.dump(self.conversion_instructions, f, ensure_ascii=False, indent=2)
        print(f"Saved conversion list to: {conversion_file}")
        return conversion_file
        
    def find_audio_files(self):
        """Find existing audio files that can be converted"""
        found_files = []
        
        # Common audio extensions
        extensions = ['.wav', '.mp3', '.m4a', '.flac', '.ogg', '.aac']
        
        # Search in multiple locations
        search_paths = [
            self.input_dir,
            Path("static/audio/pronunciation"),
            Path("audio"),
            Path("sounds"),
            Path(".")
        ]
        
        for search_path in search_paths:
            if search_path.exists():
                for ext in extensions:
                    for file_path in search_path.glob(f"*{ext}"):
                        # Check if filename matches any of our target words
                        file_stem = file_path.stem.lower()
                        
                        for instruction in self.conversion_instructions:
                            word_variants = [
                                instruction["original_word"].lower(),
                                instruction["filename"].replace('.mp3', '').lower(),
                                self._simplify_yoruba(instruction["original_word"]).lower()
                            ]
                            
                            if file_stem in word_variants:
                                found_files.append({
                                    'source_path': file_path,
                                    'target_filename': instruction["filename"],
                                    'original_word': instruction["original_word"],
                                    'file_size': file_path.stat().st_size if file_path.exists() else 0
                                })
                                break
        
        return found_files
    
    def _simplify_yoruba(self, text):
        """Simplify Yoruba text by removing diacritics"""
        import unicodedata
        return ''.join(c for c in unicodedata.normalize('NFKD', text) 
                      if not unicodedata.combining(c))
    
    def convert_to_mp3(self, input_file, output_file, quality="128k"):
        """Convert audio file to MP3 using ffmpeg"""
        try:
            cmd = [
                "ffmpeg", "-i", str(input_file),
                "-codec:a", "libmp3lame",
                "-b:a", quality,
                "-ar", "22050",  # Sample rate suitable for speech
                "-ac", "1",      # Mono channel
                "-y",            # Overwrite output file
                str(output_file)
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                return True, f"Successfully converted {input_file.name}"
            else:
                return False, f"FFmpeg error: {result.stderr}"
                
        except FileNotFoundError:
            return False, "FFmpeg not found. Install with: apt-get install ffmpeg"
        except Exception as e:
            return False, f"Conversion error: {str(e)}"
    
    def batch_convert(self):
        """Convert all found audio files to MP3 format"""
        self.setup_directories()
        
        found_files = self.find_audio_files()
        
        if not found_files:
            print("No audio files found for conversion")
            return []
        
        results = []
        
        for file_info in found_files:
            source_path = file_info['source_path']
            target_filename = file_info['target_filename']
            target_path = self.output_dir / target_filename
            
            print(f"Converting: {source_path.name} -> {target_filename}")
            
            if source_path.suffix.lower() == '.mp3':
                # Already MP3, just copy
                try:
                    shutil.copy2(source_path, target_path)
                    success = True
                    message = f"Copied MP3 file: {source_path.name}"
                except Exception as e:
                    success = False
                    message = f"Copy failed: {str(e)}"
            else:
                # Convert to MP3
                success, message = self.convert_to_mp3(source_path, target_path)
            
            results.append({
                'source': str(source_path),
                'target': str(target_path),
                'original_word': file_info['original_word'],
                'success': success,
                'message': message,
                'target_size': target_path.stat().st_size if target_path.exists() else 0
            })
            
            if success:
                print(f"  ✓ {message}")
            else:
                print(f"  ✗ {message}")
        
        return results
    
    def update_pronunciation_mapping(self, conversion_results):
        """Update the pronunciation mapping with conversion results"""
        map_file = self.output_dir / "map.json"
        
        # Load existing mapping
        if map_file.exists():
            with open(map_file, 'r', encoding='utf-8') as f:
                mapping_data = json.load(f)
        else:
            mapping_data = []
        
        # Update has_authentic status for converted files
        for result in conversion_results:
            if result['success']:
                for entry in mapping_data:
                    if entry['original_word'] == result['original_word']:
                        entry['has_authentic'] = True
                        entry['file_size'] = result['target_size']
                        break
        
        # Save updated mapping
        with open(map_file, 'w', encoding='utf-8') as f:
            json.dump(mapping_data, f, indent=2, ensure_ascii=False)
        
        print(f"Updated pronunciation mapping: {map_file}")
    
    def create_conversion_package(self):
        """Create a complete conversion package"""
        import zipfile
        
        # Save conversion list
        conversion_file = self.save_conversion_list()
        
        # Create instructions
        instructions = """# Yoruba Audio Conversion Instructions

## Overview
This package contains everything needed to convert Yoruba audio files to the proper MP3 format for the Ifá app.

## Files Included
- yoruba_audio_conversion_list.json: Complete mapping of Yoruba words to target filenames
- conversion_template.sh: Shell script template for batch conversion
- README.txt: This file

## Conversion Process
1. Place your WAV/audio files in the 'input' directory
2. Run the conversion script: python yoruba_audio_converter.py
3. Converted MP3 files will be saved to static/audio/pronunciation/
4. The pronunciation mapping will be automatically updated

## Supported Input Formats
- WAV (recommended for high quality)
- MP3 (will be copied if already correct format)
- M4A, FLAC, OGG, AAC (will be converted)

## Audio Requirements
- Sample Rate: 22050 Hz (optimized for speech)
- Channels: Mono
- Bitrate: 128k (good quality for voice)
- Format: MP3

## Target Filenames
The system automatically maps Yoruba words with diacritics to ASCII-safe filenames:
- ṣàngó -> sango.mp3
- òrìṣà -> orisa.mp3
- àṣẹ -> ase.mp3
- etc.

## Usage Example
```bash
# Place your files
cp my_yoruba_audio.wav input/sango.wav

# Run converter
python yoruba_audio_converter.py

# Files will be available at
# static/audio/pronunciation/sango.mp3
```
"""
        
        # Create shell script template
        shell_script = """#!/bin/bash
# Yoruba Audio Batch Converter
# Usage: ./convert_yoruba_audio.sh

echo "Starting Yoruba audio conversion..."

# Create directories
mkdir -p input
mkdir -p static/audio/pronunciation

# Convert using Python script
python3 yoruba_audio_converter.py

echo "Conversion complete!"
echo "Check static/audio/pronunciation/ for output files"
"""
        
        # Save files
        with open("README.txt", "w", encoding="utf-8") as f:
            f.write(instructions)
        
        with open("convert_yoruba_audio.sh", "w", encoding="utf-8") as f:
            f.write(shell_script)
        
        # Make shell script executable
        os.chmod("convert_yoruba_audio.sh", 0o755)
        
        # Create ZIP package
        package_path = "yoruba_audio_conversion_package.zip"
        with zipfile.ZipFile(package_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            zipf.write(conversion_file)
            zipf.write("README.txt")
            zipf.write("convert_yoruba_audio.sh")
            zipf.write(__file__)  # Include the Python script itself
        
        print(f"Created conversion package: {package_path}")
        return package_path

def main():
    """Main execution function"""
    converter = YorubaAudioConverter()
    
    print("🎵 Yoruba Audio Converter")
    print("=" * 40)
    
    # Create conversion package
    package_path = converter.create_conversion_package()
    
    # Run batch conversion
    results = converter.batch_convert()
    
    if results:
        # Update pronunciation mapping
        converter.update_pronunciation_mapping(results)
        
        # Print summary
        successful = sum(1 for r in results if r['success'])
        total = len(results)
        
        print(f"\n📊 Conversion Summary:")
        print(f"   • Files processed: {total}")
        print(f"   • Successful conversions: {successful}")
        print(f"   • Failed conversions: {total - successful}")
        print(f"   • Output directory: {converter.output_dir}")
        print(f"   • Conversion package: {package_path}")
        
        # List successful conversions
        if successful > 0:
            print(f"\n✅ Successfully converted:")
            for result in results:
                if result['success']:
                    size_kb = result['target_size'] / 1024 if result['target_size'] > 0 else 0
                    print(f"   • {result['original_word']} -> {Path(result['target']).name} ({size_kb:.1f} KB)")
    else:
        print(f"\n📦 Conversion package created: {package_path}")
        print("   • No audio files found for immediate conversion")
        print("   • Place audio files in 'audio_sources' directory and run again")

if __name__ == "__main__":
    main()