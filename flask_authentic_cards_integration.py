
# Authentic Odu Cards Routes (Add to app.py)
@app.route('/api/odu-cards-authentic')
def api_odu_cards_authentic():
    """API endpoint for authentic Odu cards generated from user Excel data"""
    try:
        manifest_path = os.path.join('static', 'odu_cards', 'card_manifest.json')
        
        if os.path.exists(manifest_path):
            with open(manifest_path, 'r', encoding='utf-8') as f:
                manifest = json.load(f)
            
            return jsonify({
                'status': 'success',
                'cards': manifest['cards'],
                'metadata': manifest['metadata'],
                'total_cards': manifest['metadata']['total_cards']
            })
        else:
            return jsonify({
                'status': 'error',
                'message': 'Card manifest not found. Please generate cards first.'
            })
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error loading authentic cards: {str(e)}'
        })

@app.route('/odu-cards-authentic')
def authentic_odu_cards():
    """Display authentic Odu cards from user Excel data"""
    return render_template('authentic_odu_cards.html')
