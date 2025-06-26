#!/usr/bin/env python3
"""
Batch converter for existing Yoruba audio files in the project
"""

import os
import shutil
from pathlib import Path

def convert_existing_files():
    """Convert existing audio files to proper naming convention"""
    
    audio_dir = Path("static/audio/pronunciation")
    
    # Mapping of existing files to proper names
    file_mappings = {
        # Existing files with diacritics
        "ṣàngó.mp3": "sango.mp3",
        "òrìṣà.mp3": "orisa.mp3", 
        "àṣẹ.mp3": "ase.mp3",
        "ọ̀ṣun.mp3": "osun.mp3",
        "ọ̀rúnmìlà.mp3": "orunmila.mp3",
        "yemọja.mp3": "yemoja.mp3",
        "ifá.mp3": "ifa.mp3"
    }
    
    converted = []
    
    for original_name, target_name in file_mappings.items():
        original_path = audio_dir / original_name
        target_path = audio_dir / target_name
        
        if original_path.exists():
            if not target_path.exists():
                # Copy to new name
                shutil.copy2(original_path, target_path)
                print(f"✓ Copied: {original_name} -> {target_name}")
                converted.append(target_name)
            else:
                print(f"→ Already exists: {target_name}")
                converted.append(target_name)
        else:
            print(f"✗ Not found: {original_name}")
    
    return converted

def verify_audio_files():
    """Verify all audio files are accessible"""
    audio_dir = Path("static/audio/pronunciation")
    
    if not audio_dir.exists():
        print("❌ Audio directory not found")
        return False
    
    # Expected files based on mapping
    expected_files = [
        "sango.mp3", "orisa.mp3", "ase.mp3", "osun.mp3", 
        "orunmila.mp3", "yemoja.mp3", "ifa.mp3"
    ]
    
    verified = []
    missing = []
    
    for filename in expected_files:
        file_path = audio_dir / filename
        if file_path.exists() and file_path.stat().st_size > 0:
            size_kb = file_path.stat().st_size / 1024
            print(f"✅ {filename} ({size_kb:.1f} KB)")
            verified.append(filename)
        else:
            print(f"❌ Missing: {filename}")
            missing.append(filename)
    
    print(f"\n📊 Verification Summary:")
    print(f"   • Verified files: {len(verified)}")
    print(f"   • Missing files: {len(missing)}")
    
    return len(missing) == 0

def main():
    print("🔄 Converting Existing Yoruba Audio Files")
    print("=" * 50)
    
    # Convert existing files
    converted_files = convert_existing_files()
    
    print(f"\n✨ Converted {len(converted_files)} files")
    
    # Verify all files
    print(f"\n🔍 Verifying Audio Files:")
    all_verified = verify_audio_files()
    
    if all_verified:
        print(f"\n🎉 All audio files are ready!")
    else:
        print(f"\n⚠️  Some audio files are missing")
        print("   Run the full audio generator to create missing files")

if __name__ == "__main__":
    main()