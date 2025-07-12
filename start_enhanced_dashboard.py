#!/usr/bin/env python3
"""
Start Enhanced Yoruba Calendar Dashboard
Replaces the React frontend with Flask application containing all enhanced features
"""
import subprocess
import sys
import os

# Change to yoruba-calendar directory
os.chdir('yoruba-calendar')

# Start the enhanced dashboard
print("🚀 Starting Enhanced Yoruba Calendar Dashboard...")
print("All advanced features integrated and visible")

# Execute the Flask app
subprocess.run([sys.executable, 'create_enhanced_dashboard.py'])