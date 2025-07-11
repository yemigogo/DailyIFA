
# Add to app.py - Complete 256 Odu System Routes

@app.route('/api/odu-256/complete')
def api_get_complete_256_odu():
    """Get complete 256 Odu system with advanced filtering"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    category = request.args.get('category', 'all')
    search = request.args.get('search', '')
    primary_odu = request.args.get('primary_odu', '')
    
    conn = get_db_connection()
    
    # Build query with filters
    query = "SELECT * FROM odu_256_complete WHERE 1=1"
    params = []
    
    if category != 'all':
        query += " AND category = ?"
        params.append(category)
    
    if search:
        query += " AND (name LIKE ? OR meaning LIKE ? OR guidance LIKE ?)"
        params.extend([f'%{search}%', f'%{search}%', f'%{search}%'])
    
    if primary_odu:
        query += " AND primary_odu LIKE ?"
        params.append(f'%{primary_odu}%')
    
    query += " ORDER BY id LIMIT ? OFFSET ?"
    params.extend([per_page, (page - 1) * per_page])
    
    odu_list = conn.execute(query, params).fetchall()
    
    # Get total count
    count_query = "SELECT COUNT(*) as total FROM odu_256_complete WHERE 1=1"
    count_params = []
    
    if category != 'all':
        count_query += " AND category = ?"
        count_params.append(category)
    
    if search:
        count_query += " AND (name LIKE ? OR meaning LIKE ? OR guidance LIKE ?)"
        count_params.extend([f'%{search}%', f'%{search}%', f'%{search}%'])
    
    if primary_odu:
        count_query += " AND primary_odu LIKE ?"
        count_params.append(f'%{primary_odu}%')
    
    total = conn.execute(count_query, count_params).fetchone()['total']
    conn.close()
    
    return jsonify({
        "odu_list": [dict(odu) for odu in odu_list],
        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": total,
            "pages": (total + per_page - 1) // per_page
        },
        "filters": {
            "category": category,
            "search": search,
            "primary_odu": primary_odu
        },
        "statistics": {
            "total_odu": total,
            "major_odu": 16,
            "minor_odu": 240
        }
    })

@app.route('/api/odu-256/search')
def api_search_complete_odu():
    """Search complete Odu system"""
    query = request.args.get('q', '')
    category = request.args.get('category', 'all')
    limit = request.args.get('limit', 10, type=int)
    
    if not query:
        return jsonify({"error": "Search query required"}), 400
    
    conn = get_db_connection()
    
    search_query = """
        SELECT * FROM odu_256_complete 
        WHERE (name LIKE ? OR meaning LIKE ? OR guidance LIKE ? 
               OR spiritual_significance LIKE ? OR traditional_story LIKE ?)
    """
    params = [f'%{query}%'] * 5
    
    if category != 'all':
        search_query += " AND category = ?"
        params.append(category)
    
    search_query += " ORDER BY id LIMIT ?"
    params.append(limit)
    
    results = conn.execute(search_query, params).fetchall()
    conn.close()
    
    return jsonify({
        "results": [dict(odu) for odu in results],
        "query": query,
        "category": category,
        "total_found": len(results)
    })

@app.route('/api/odu-256/categories')
def api_get_odu_categories():
    """Get Odu categories and statistics"""
    conn = get_db_connection()
    
    categories = conn.execute("""
        SELECT category, COUNT(*) as count 
        FROM odu_256_complete 
        GROUP BY category
    """).fetchall()
    
    primary_odu_stats = conn.execute("""
        SELECT primary_odu, COUNT(*) as count 
        FROM odu_256_complete 
        GROUP BY primary_odu
    """).fetchall()
    
    conn.close()
    
    return jsonify({
        "categories": [dict(cat) for cat in categories],
        "primary_odu_distribution": [dict(stat) for stat in primary_odu_stats],
        "total_combinations": 256
    })

@app.route('/odu-256-complete')
def complete_256_odu_page():
    """Complete 256 Odu system page"""
    return render_template('odu_256_complete.html')
