#!/bin/bash

# Yoruba Pronunciation Demo App Launcher
echo "Starting Yoruba Pronunciation Demo App..."

# Create required directories
mkdir -p static/audio/pronunciation
mkdir -p templates

# Copy our demo template
cp templates/pronunciation_demo.html templates/pronunciation_demo.html

# Create some sample audio files (placeholders)
touch static/audio/pronunciation/ifa.mp3
touch static/audio/pronunciation/orisa.mp3
touch static/audio/pronunciation/ase.mp3

echo "Directories and files prepared."
echo "Starting Flask app on port 5001..."
echo "Visit: http://localhost:5001"
echo ""

# Run the Flask app
python pronunciation_demo_app.py