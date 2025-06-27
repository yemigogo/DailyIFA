#!/usr/bin/env python3
"""
Quick test script to verify recording setup and activation readiness
"""

import os

def check_audio_setup():
    """Check if audio directories and files are properly set up"""
    print("🎵 Audio Setup Verification")
    print("=" * 40)
    
    # Check directories
    directories = [
        "static/audio/pronunciation",
        "static/audio/odu", 
        "static/audio/oriki"
    ]
    
    for directory in directories:
        if os.path.exists(directory):
            print(f"✅ Directory exists: {directory}")
        else:
            print(f"❌ Directory missing: {directory}")
            os.makedirs(directory, exist_ok=True)
            print(f"   → Created: {directory}")
    
    # Check for sample recordings
    pronunciation_dir = "static/audio/pronunciation"
    if os.path.exists(pronunciation_dir):
        files = [f for f in os.listdir(pronunciation_dir) if f.endswith('.mp3')]
        print(f"\n📁 Found {len(files)} MP3 files in pronunciation directory:")
        for file in files:
            print(f"   🎵 {file}")
        
        if len(files) == 0:
            print("   📝 No audio files found yet - ready for your recordings!")
    
    # Check activation scripts
    scripts = [
        "scripts/audio_activation_system.py",
        "scripts/reactivate_audio_components.py"
    ]
    
    print(f"\n🔧 Activation Scripts:")
    for script in scripts:
        if os.path.exists(script):
            print(f"✅ Ready: {script}")
        else:
            print(f"❌ Missing: {script}")
    
    print(f"\n📋 Next Steps:")
    print("1. Record MP3 files and place in static/audio/pronunciation/")
    print("2. Run: python scripts/audio_activation_system.py")
    print("3. Run: python scripts/reactivate_audio_components.py")
    print("4. Test audio features in the app")

if __name__ == "__main__":
    check_audio_setup()