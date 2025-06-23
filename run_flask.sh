#!/bin/bash

# Stop the Node.js server if running
pkill -f "npm run dev" 2>/dev/null || true
pkill -f "tsx server" 2>/dev/null || true

# Start the Python Flask server
echo "🎵 Starting Ifá Daily Reading App - Python Flask Version"
echo "✨ With ambient Yoruba soundscapes and bilingual support"

python3 app.py