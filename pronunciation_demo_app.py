from flask import Flask, render_template, jsonify, send_from_directory
import os

app = Flask(__name__, 
    template_folder='templates',
    static_folder='static'
)

@app.route('/')
def home():
    """Main pronunciation demo page"""
    return render_template('pronunciation_demo.html')

@app.route('/api/pronunciation/words')
def get_available_words():
    """Get list of available pronunciation words"""
    audio_dir = 'static/audio/pronunciation'
    words = []
    
    if os.path.exists(audio_dir):
        for file in os.listdir(audio_dir):
            if file.endswith('.mp3'):
                word = file.replace('.mp3', '')
                file_size = os.path.getsize(os.path.join(audio_dir, file))
                words.append({
                    'word': word,
                    'file': file,
                    'size': file_size,
                    'has_audio': True
                })
    
    return jsonify({
        'total_words': len(words),
        'words': words
    })

@app.route('/api/pronunciation/test/<word>')
def test_pronunciation(word):
    """Test if a specific word has local pronunciation available"""
    audio_file = f'static/audio/pronunciation/{word.lower()}.mp3'
    exists = os.path.exists(audio_file)
    
    response = {
        'word': word,
        'has_local_audio': exists,
        'fallback_available': True,
        'file_path': audio_file if exists else None
    }
    
    if exists:
        response['file_size'] = os.path.getsize(audio_file)
    
    return jsonify(response)

@app.route('/static/audio/pronunciation/<filename>')
def serve_pronunciation_audio(filename):
    """Serve pronunciation audio files"""
    return send_from_directory('static/audio/pronunciation', filename)

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'app': 'Yoruba Pronunciation Demo',
        'version': '1.0.0'
    })

if __name__ == '__main__':
    # Ensure directories exist
    os.makedirs('static/audio/pronunciation', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    
    app.run(debug=True, host='0.0.0.0', port=5001)