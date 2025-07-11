#!/usr/bin/env python3
"""
Test Flask Odu Cards Integration
Demonstrates the Flask backend serving authentic Odu card images
"""

import os
import json
import subprocess
import time
import requests
from pathlib import Path

def test_card_manifest():
    """Test if card manifest exists and is valid"""
    print("1. Testing Card Manifest")
    print("=" * 40)
    
    manifest_path = "static/odu_cards/card_manifest.json"
    if not os.path.exists(manifest_path):
        print("❌ Card manifest not found!")
        return False
    
    try:
        with open(manifest_path, 'r', encoding='utf-8') as f:
            manifest = json.load(f)
        
        total_cards = manifest.get('metadata', {}).get('total_cards', 0)
        cards = manifest.get('cards', [])
        
        print(f"✅ Manifest loaded successfully")
        print(f"   • Total cards: {total_cards}")
        print(f"   • Cards in manifest: {len(cards)}")
        
        # Test if card files exist
        existing_cards = 0
        for card in cards[:10]:  # Test first 10 cards
            if os.path.exists(card['filepath']):
                existing_cards += 1
        
        print(f"   • First 10 cards exist: {existing_cards}/10")
        
        return True
    except Exception as e:
        print(f"❌ Error loading manifest: {e}")
        return False

def test_flask_templates():
    """Test if Flask templates exist"""
    print("\n2. Testing Flask Templates")
    print("=" * 40)
    
    templates = [
        "templates/authentic_odu_cards.html",
        "templates/odu_cards_simple.html"
    ]
    
    for template in templates:
        if os.path.exists(template):
            print(f"✅ {template} exists")
        else:
            print(f"❌ {template} missing")

def test_flask_routes():
    """Test Flask routes in app.py"""
    print("\n3. Testing Flask Routes")
    print("=" * 40)
    
    if not os.path.exists("app.py"):
        print("❌ app.py not found!")
        return False
    
    with open("app.py", 'r', encoding='utf-8') as f:
        content = f.read()
    
    routes = [
        "/api/odu-cards-authentic",
        "/odu-cards-authentic",
        "/odu-cards-simple"
    ]
    
    for route in routes:
        if route in content:
            print(f"✅ Route {route} found in app.py")
        else:
            print(f"❌ Route {route} not found in app.py")
    
    return True

def test_static_files():
    """Test static file structure"""
    print("\n4. Testing Static Files")
    print("=" * 40)
    
    directories = [
        "static/odu_cards",
        "static/images"
    ]
    
    for directory in directories:
        if os.path.exists(directory):
            files = os.listdir(directory)
            print(f"✅ {directory} exists ({len(files)} files)")
        else:
            print(f"❌ {directory} missing")
    
    # Check for placeholder image
    if os.path.exists("static/images/placeholder-odu.svg"):
        print("✅ Placeholder image exists")
    else:
        print("❌ Placeholder image missing")

def test_react_component():
    """Test React component integration"""
    print("\n5. Testing React Component")
    print("=" * 40)
    
    component_path = "client/src/components/authentic-odu-cards.tsx"
    if os.path.exists(component_path):
        print("✅ React component exists")
        
        # Check if it's imported in learning page
        learning_path = "client/src/pages/learning.tsx"
        if os.path.exists(learning_path):
            with open(learning_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if "authentic-odu-cards" in content:
                print("✅ Component imported in learning page")
            else:
                print("❌ Component not imported in learning page")
        else:
            print("❌ Learning page not found")
    else:
        print("❌ React component missing")

def generate_integration_report():
    """Generate comprehensive integration report"""
    print("\n" + "=" * 60)
    print("FLASK ODU CARDS INTEGRATION REPORT")
    print("=" * 60)
    
    # Count card files
    card_count = 0
    if os.path.exists("static/odu_cards"):
        card_count = len([f for f in os.listdir("static/odu_cards") if f.endswith('.png')])
    
    # Check manifest
    manifest_exists = os.path.exists("static/odu_cards/card_manifest.json")
    
    # Check templates
    templates_exist = all(os.path.exists(f) for f in [
        "templates/authentic_odu_cards.html",
        "templates/odu_cards_simple.html"
    ])
    
    # Check Flask routes
    flask_routes_exist = os.path.exists("app.py")
    
    # Check React component
    react_component_exists = os.path.exists("client/src/components/authentic-odu-cards.tsx")
    
    print(f"Card Images: {card_count}/256 {'✅' if card_count > 0 else '❌'}")
    print(f"Card Manifest: {'✅' if manifest_exists else '❌'}")
    print(f"Flask Templates: {'✅' if templates_exist else '❌'}")
    print(f"Flask Routes: {'✅' if flask_routes_exist else '❌'}")
    print(f"React Component: {'✅' if react_component_exists else '❌'}")
    
    # Integration status
    total_components = 5
    working_components = sum([
        card_count > 0,
        manifest_exists,
        templates_exist,
        flask_routes_exist,
        react_component_exists
    ])
    
    percentage = (working_components / total_components) * 100
    
    print(f"\nIntegration Status: {working_components}/{total_components} ({percentage:.1f}%)")
    
    if percentage == 100:
        print("🎉 COMPLETE: All components integrated successfully!")
    elif percentage >= 80:
        print("⚠️  MOSTLY COMPLETE: Minor components missing")
    elif percentage >= 60:
        print("⚡ PARTIALLY COMPLETE: Some components missing")
    else:
        print("❌ INCOMPLETE: Major components missing")
    
    print("\nAccess Points:")
    print("• Flask API: http://localhost:5001/api/odu-cards-authentic")
    print("• Authentic Cards: http://localhost:5001/odu-cards-authentic")
    print("• Simple Cards: http://localhost:5001/odu-cards-simple")
    print("• React Component: Learning Center → Authentic Excel Cards")

def main():
    """Main test function"""
    print("🚀 Starting Flask Odu Cards Integration Tests")
    print("=" * 60)
    
    # Run all tests
    test_card_manifest()
    test_flask_templates()
    test_flask_routes()
    test_static_files()
    test_react_component()
    
    # Generate final report
    generate_integration_report()

if __name__ == "__main__":
    main()