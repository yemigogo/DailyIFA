from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    """Main soundscape experience page"""
    return render_template('index.html')

@app.route('/audio-demo')
def audio_demo():
    """Advanced 3-layer audio mixing demo"""
    return render_template('audio_demo.html')

@app.route('/static/audio/soundscapes/<filename>')
def serve_audio(filename):
    """Serve audio files from soundscapes directory"""
    return send_from_directory('static/audio/soundscapes', filename)

@app.route('/static/images/backgrounds/<filename>')
def serve_images(filename):
    """Serve background images"""
    return send_from_directory('static/images/backgrounds', filename)

# Audio file verification endpoint
@app.route('/api/audio/verify')
def verify_audio():
    """Check which audio files are available"""
    audio_dir = 'static/audio/soundscapes'
    if os.path.exists(audio_dir):
        files = [f for f in os.listdir(audio_dir) if f.endswith('.mp3')]
        return {'available_files': files, 'count': len(files)}
    return {'available_files': [], 'count': 0}

# Audio metadata endpoint
@app.route('/api/audio/metadata')
def audio_metadata():
    """Return metadata about available soundscapes"""
    return {
        'soundscapes': {
            'ifa_wisdom_chant': {
                'name': 'Ifá Wisdom Chant',
                'name_yoruba': 'Orin Ọgbọ́n Ifá',
                'category': 'chant',
                'purpose': 'Spiritual invocation for wisdom and clarity',
                'duration_approx': 120
            },
            'ifa_prosperity_chant': {
                'name': 'Ifá Prosperity Chant',
                'name_yoruba': 'Orin Ọrọ̀ Ifá',
                'category': 'chant',
                'purpose': 'Abundance and wealth attraction',
                'duration_approx': 150
            },
            'bata_egungun_abida': {
                'name': 'Batá Egungun Ceremony',
                'name_yoruba': 'Bàtá Egúngún Àbídà',
                'category': 'ceremonial_drums',
                'purpose': 'Ancestral spirit communication',
                'duration_approx': 180
            },
            'talking_drum_loop': {
                'name': 'Talking Drum',
                'name_yoruba': 'Ìlù Dùndún',
                'category': 'drums',
                'purpose': 'Traditional communication and storytelling',
                'duration_approx': 30
            },
            'ocean_blessing_waves': {
                'name': 'Ocean Blessing Waves',
                'name_yoruba': 'Ìgbì Ìbùkún Òkun',
                'category': 'nature',
                'purpose': 'Yemoja healing and emotional cleansing',
                'duration_approx': 240
            },
            'sacred_forest': {
                'name': 'Sacred Forest',
                'name_yoruba': 'Igbó Mímọ́',
                'category': 'nature',
                'purpose': 'Earth connection and grounding',
                'duration_approx': 300
            }
        },
        'combinations': {
            'ancestral_communion': {
                'name': 'Ancestral Communion',
                'layers': ['bata_egungun_abida', 'sacred_forest'],
                'purpose': 'Deep connection with ancestral wisdom'
            },
            'divine_healing': {
                'name': 'Divine Healing',
                'layers': ['ifa_wisdom_chant', 'ocean_blessing_waves'],
                'purpose': 'Emotional and spiritual healing'
            },
            'prosperity_ritual': {
                'name': 'Prosperity Ritual',
                'layers': ['ifa_prosperity_chant', 'flowing_river'],
                'purpose': 'Abundance and material blessings'
            }
        }
    }

if __name__ == '__main__':
    # Create necessary directories
    os.makedirs('static/audio/soundscapes', exist_ok=True)
    os.makedirs('static/images/backgrounds', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    
    app.run(debug=True, host='0.0.0.0', port=5000)