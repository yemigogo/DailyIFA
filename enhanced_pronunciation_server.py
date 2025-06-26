from flask import Flask, render_template, jsonify, send_from_directory, request
import os
import json
from pathlib import Path

app = Flask(__name__, 
    template_folder='templates',
    static_folder='static'
)

@app.route('/')
def home():
    """Enhanced pronunciation demo homepage"""
    return render_template('enhanced_pronunciation_demo.html')

@app.route('/api/pronunciation/words')
def get_pronunciation_words():
    """Get comprehensive pronunciation word list with mapping"""
    try:
        map_file = Path('static/audio/pronunciation/map.json')
        if map_file.exists():
            with open(map_file, 'r', encoding='utf-8') as f:
                pronunciation_data = json.load(f)
                
            # Add file status check
            for entry in pronunciation_data:
                audio_path = Path(f"static/audio/pronunciation/{entry['file']}")
                entry['file_exists'] = audio_path.exists() and audio_path.stat().st_size > 0
                if entry['file_exists']:
                    entry['file_size'] = audio_path.stat().st_size
                
            return jsonify({
                'success': True,
                'total_words': len(pronunciation_data),
                'authentic_count': sum(1 for entry in pronunciation_data if entry.get('has_authentic', False)),
                'words': pronunciation_data
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Pronunciation mapping not found'
            }), 404
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/pronunciation/test/<word>')
def test_pronunciation(word):
    """Test pronunciation availability for specific word"""
    try:
        map_file = Path('static/audio/pronunciation/map.json')
        if map_file.exists():
            with open(map_file, 'r', encoding='utf-8') as f:
                pronunciation_data = json.load(f)
                
            word_entry = next((entry for entry in pronunciation_data 
                             if entry['word'].lower() == word.lower()), None)
            
            if word_entry:
                audio_path = Path(f"static/audio/pronunciation/{word_entry['file']}")
                file_exists = audio_path.exists() and audio_path.stat().st_size > 0
                
                return jsonify({
                    'word': word,
                    'found': True,
                    'file': word_entry['file'],
                    'meaning': word_entry['meaning'],
                    'has_authentic': word_entry.get('has_authentic', False),
                    'file_exists': file_exists,
                    'file_size': audio_path.stat().st_size if file_exists else 0
                })
            else:
                return jsonify({
                    'word': word,
                    'found': False,
                    'error': 'Word not in pronunciation database'
                }), 404
                
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/pronunciation/upload', methods=['POST'])
def upload_pronunciation():
    """Upload authentic pronunciation audio file"""
    if 'audio' not in request.files:
        return jsonify({'success': False, 'error': 'No audio file provided'}), 400
        
    file = request.files['audio']
    word = request.form.get('word', '').strip()
    
    if not word:
        return jsonify({'success': False, 'error': 'Word parameter required'}), 400
        
    if file.filename == '':
        return jsonify({'success': False, 'error': 'No file selected'}), 400
        
    try:
        # Load pronunciation mapping
        map_file = Path('static/audio/pronunciation/map.json')
        if map_file.exists():
            with open(map_file, 'r', encoding='utf-8') as f:
                pronunciation_data = json.load(f)
        else:
            pronunciation_data = []
            
        # Find word entry
        word_entry = next((entry for entry in pronunciation_data 
                         if entry['word'].lower() == word.lower()), None)
        
        if not word_entry:
            return jsonify({'success': False, 'error': 'Word not found in database'}), 404
            
        # Save file
        audio_dir = Path('static/audio/pronunciation')
        audio_dir.mkdir(parents=True, exist_ok=True)
        
        file_path = audio_dir / word_entry['file']
        file.save(str(file_path))
        
        # Update mapping
        word_entry['has_authentic'] = True
        word_entry['file_size'] = file_path.stat().st_size
        
        with open(map_file, 'w', encoding='utf-8') as f:
            json.dump(pronunciation_data, f, indent=2, ensure_ascii=False)
            
        return jsonify({
            'success': True,
            'message': f'Uploaded authentic pronunciation for {word}',
            'file': word_entry['file'],
            'size': word_entry['file_size']
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/static/audio/pronunciation/<filename>')
def serve_pronunciation_audio(filename):
    """Serve pronunciation audio files with proper headers"""
    return send_from_directory('static/audio/pronunciation', filename)

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'app': 'Enhanced Yoruba Pronunciation Server',
        'version': '2.0.0',
        'features': [
            'JSON pronunciation mapping',
            'Authentic audio detection',
            'File upload support',
            'Status tracking'
        ]
    })

if __name__ == '__main__':
    # Ensure directories exist
    os.makedirs('static/audio/pronunciation', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    
    print("🎵 Enhanced Yoruba Pronunciation Server")
    print("=" * 40)
    print("Features:")
    print("  • JSON pronunciation mapping")
    print("  • Authentic audio detection")
    print("  • File upload API")
    print("  • Health monitoring")
    print("  • Enhanced demo page")
    print("\nStarting server on port 5001...")
    
    app.run(debug=True, host='0.0.0.0', port=5001)