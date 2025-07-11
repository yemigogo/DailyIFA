#!/usr/bin/env python3
"""
Create Complete Flask App to Display All 256 Odu Cards
Based on user specifications with proper folder structure
"""

import os
import zipfile
import shutil
from datetime import datetime

def create_flask_256_app():
    """Create complete Flask app with all 256 Odu cards"""
    
    # Source directory with valid cards
    source_dir = "/tmp/odu_ifa_corrected_256"
    
    # Get all card files and filter for valid integers 1-256
    all_odu_cards = []
    if os.path.exists(source_dir):
        for filename in os.listdir(source_dir):
            if filename.startswith("odu_card_") and filename.endswith(".png"):
                all_odu_cards.append(os.path.join(source_dir, filename))
    
    # Filter the filenames with valid integer card numbers only (1 to 256)
    valid_cards = []
    for card in all_odu_cards:
        filename = os.path.basename(card)
        number_part = filename.replace("odu_card_", "").replace(".png", "")
        if number_part.isdigit():
            card_number = int(number_part)
            if 1 <= card_number <= 256:
                valid_cards.append(card)
    
    print(f"Found {len(valid_cards)} valid cards for Flask app")
    
    # Prepare a basic Flask app to display all 256 Odu cards
    flask_folder = "/tmp/ifa_flask_app"
    static_folder = os.path.join(flask_folder, "static")
    templates_folder = os.path.join(flask_folder, "templates")
    os.makedirs(static_folder, exist_ok=True)
    os.makedirs(templates_folder, exist_ok=True)
    
    # Copy images to static folder
    for card in valid_cards:
        target = os.path.join(static_folder, os.path.basename(card))
        if not os.path.exists(target):
            shutil.copy2(card, target)
    
    print(f"Copied {len(valid_cards)} cards to static folder")
    
    # Flask app file
    app_code = '''from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route("/")
def index():
    image_files = sorted([f for f in os.listdir("static") if f.endswith(".png")],
                         key=lambda x: int(x.split("_")[-1].split(".")[0]))
    return render_template("index.html", images=image_files)

if __name__ == "__main__":
    app.run(debug=True)
'''
    
    # HTML template
    html_template = '''<!DOCTYPE html>
<html>
<head>
    <title>Odu Ifá Cards</title>
    <style>
        body { background: #000; color: white; text-align: center; font-family: sans-serif; }
        img { max-width: 90%; margin: 20px auto; display: block; border: 4px solid white; }
    </style>
</head>
<body>
    <h1>Odu Ifá – 256 Cards</h1>
    {% for image in images %}
        <img src="{{ url_for('static', filename=image) }}" alt="{{ image }}">
    {% endfor %}
</body>
</html>
'''
    
    # Write Flask app and HTML
    with open(os.path.join(flask_folder, "app.py"), "w") as f:
        f.write(app_code)
    
    with open(os.path.join(templates_folder, "index.html"), "w") as f:
        f.write(html_template)
    
    # Create requirements.txt
    requirements = '''Flask==2.3.3
'''
    with open(os.path.join(flask_folder, "requirements.txt"), "w") as f:
        f.write(requirements)
    
    # Create README for the Flask app
    readme_content = f'''# Odu Ifá Flask App

## Overview
Complete Flask application displaying all 256 Odu Ifá cards with black backgrounds and wooden carving textures.

## Setup
1. Install dependencies: `pip install -r requirements.txt`
2. Run the app: `python app.py`
3. Open browser to: `http://localhost:5000`

## Features
- 256 authentic Odu cards from Excel matrix data
- Black backgrounds with wooden carving textures
- Responsive web display
- Cards sorted numerically (1-256)

## Structure
- `app.py` - Flask application
- `templates/index.html` - HTML template
- `static/` - {len(valid_cards)} Odu card images
- `requirements.txt` - Python dependencies

Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
'''
    
    with open(os.path.join(flask_folder, "README.md"), "w") as f:
        f.write(readme_content)
    
    # Zip the entire Flask app
    flask_zip_path = "/tmp/odu_ifa_flask_app.zip"
    with zipfile.ZipFile(flask_zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        for folder, _, files in os.walk(flask_folder):
            for file in files:
                full_path = os.path.join(folder, file)
                arcname = os.path.relpath(full_path, flask_folder)
                zipf.write(full_path, arcname=os.path.join("ifa_flask_app", arcname))
    
    # Copy to downloadable location
    final_zip_path = "./odu_ifa_flask_app_complete.zip"
    shutil.copy2(flask_zip_path, final_zip_path)
    
    # Show results
    zip_size_mb = os.path.getsize(final_zip_path) / (1024 * 1024)
    
    print(f"""
✅ Complete Flask App Created!

📁 App Structure:
- Flask application (app.py)
- HTML template with black theme
- {len(valid_cards)} Odu card images in static folder
- Requirements.txt for dependencies
- README.md with setup instructions

📦 Package Details:
- File: {final_zip_path}
- Size: {zip_size_mb:.1f} MB
- Ready for deployment

🚀 Usage:
1. Extract ZIP file
2. pip install -r requirements.txt
3. python app.py
4. Open http://localhost:5000

🎯 Complete Flask app ready for 256 Odu cards display!
""")
    
    return final_zip_path

if __name__ == "__main__":
    flask_zip = create_flask_256_app()
    print(f"Flask app created: {flask_zip}")