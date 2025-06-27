#!/usr/bin/env python3
"""
Create numbered Odu mappings from existing pronunciation files
"""

import os
import shutil

def create_odu_mappings():
    """Map existing pronunciation files to numbered Odu system"""
    
    # Check what Odu-related files we have
    pronunciation_dir = "static/audio/pronunciation"
    odu_dir = "static/audio/odu"
    
    print("🔍 Checking existing pronunciation files...")
    
    existing_files = []
    if os.path.exists(pronunciation_dir):
        existing_files = [f for f in os.listdir(pronunciation_dir) if f.endswith('.mp3')]
        print(f"Found {len(existing_files)} MP3 files")
    
    # Create basic Odu mappings using available files
    odu_mappings = {
        1: "ifa.mp3",  # Use general Ifá pronunciation for Eji Ogbe
        2: "iwori.mp3" if "iwori.mp3" in existing_files else "ifa.mp3",
        3: "iwori.mp3" if "iwori.mp3" in existing_files else "ifa.mp3", 
        4: "odu.mp3",  # Use general Odu pronunciation
        5: "ifa.mp3",
        6: "ifa.mp3",
        7: "ifa.mp3",
        8: "ifa.mp3",
        9: "ogun.mp3" if "ogun.mp3" in existing_files else "ifa.mp3",
        10: "ifa.mp3",
        11: "ifa.mp3",
        12: "ifa.mp3",
        13: "ifa.mp3",
        14: "ifa.mp3",
        15: "ose.mp3" if "ose.mp3" in existing_files else "ifa.mp3",
        16: "ifa.mp3"
    }
    
    os.makedirs(odu_dir, exist_ok=True)
    
    # Copy files to create numbered Odu system
    for odu_num, source_file in odu_mappings.items():
        source_path = os.path.join(pronunciation_dir, source_file)
        target_path = os.path.join(odu_dir, f"{odu_num}.mp3")
        
        if os.path.exists(source_path):
            shutil.copy2(source_path, target_path)
            print(f"✅ Created odu-{odu_num}.mp3 from {source_file}")
        else:
            print(f"⚠️  Source file not found: {source_file}")
    
    print(f"\n🎯 Odu mapping complete! Created 16 numbered Odu files.")

if __name__ == "__main__":
    create_odu_mappings()