from flask import Flask, render_template, jsonify, request
import os
import json

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/words')
def get_words():
    """API endpoint to get available pronunciation words"""
    audio_dir = 'static/audio/pronunciation'
    words = []
    
    if os.path.exists(audio_dir):
        for file in os.listdir(audio_dir):
            if file.endswith('.mp3'):
                word = file.replace('.mp3', '')
                words.append({
                    'word': word,
                    'file': file,
                    'has_audio': True
                })
    
    return jsonify(words)

@app.route('/api/test/<word>')
def test_word(word):
    """Test if a specific word has pronunciation available"""
    audio_file = f'static/audio/pronunciation/{word.lower()}.mp3'
    exists = os.path.exists(audio_file)
    
    return jsonify({
        'word': word,
        'has_local_audio': exists,
        'fallback_available': True,
        'file_path': audio_file if exists else None
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
