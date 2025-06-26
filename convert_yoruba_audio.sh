#!/bin/bash
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
