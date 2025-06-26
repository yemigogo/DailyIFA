# Yoruba Audio Conversion Instructions

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
