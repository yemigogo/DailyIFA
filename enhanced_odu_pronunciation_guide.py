#!/usr/bin/env python3
"""
Enhanced Odu Pronunciation Guide Generator
Creates specific pronunciation instructions for each of the 16 major Odu
"""

def create_enhanced_odu_guide():
    """Generate detailed pronunciation guide for all 16 major Odu"""
    
    odu_pronunciations = {
        1: {
            "name": "Ẹjì Ogbè",
            "phonetic": "eh-JEE oh-GBEH",
            "meaning": "The King of all Odu, represents leadership and authority",
            "tones": "mid-high low-mid",
            "recording_tips": "Emphasize the 'JEE' sound, soft 'gb' as in 'rugby'"
        },
        2: {
            "name": "Ọ̀yẹ̀kú Méjì", 
            "phonetic": "oh-YEH-koo MAY-jee",
            "meaning": "Death and transformation, renewal through endings",
            "tones": "low-mid-low mid-high",
            "recording_tips": "Low tone on 'Ọ̀', rising on 'yẹ̀kú', clear 'MAY-jee'"
        },
        3: {
            "name": "Ìwòrì Méjì",
            "phonetic": "ee-WOH-ree MAY-jee", 
            "meaning": "Where character is tested, spiritual challenges",
            "tones": "mid-low-mid mid-high",
            "recording_tips": "Crisp 'ee' start, rolling 'r' in 'wòrì'"
        },
        4: {
            "name": "Òdí Méjì",
            "phonetic": "oh-DEE MAY-jee",
            "meaning": "Blocked paths, need for patience and strategy",
            "tones": "low-high mid-high", 
            "recording_tips": "Low 'Ò', sharp 'DEE', flowing 'MAY-jee'"
        },
        5: {
            "name": "Ìrosùn Méjì",
            "phonetic": "ee-roh-SOON MAY-jee",
            "meaning": "Blood, life force, vitality and health",
            "tones": "mid-mid-high mid-high",
            "recording_tips": "Smooth 'ee-roh', emphasis on 'SOON'"
        },
        6: {
            "name": "Ọ̀wọ́nrín Méjì", 
            "phonetic": "oh-WOHN-reen MAY-jee",
            "meaning": "Revolution, change, turning of circumstances",
            "tones": "low-high-mid mid-high",
            "recording_tips": "Low 'Ọ̀', stress 'WOHN', light 'reen'"
        },
        7: {
            "name": "Ọ̀bàrà Méjì",
            "phonetic": "oh-BAH-rah MAY-jee", 
            "meaning": "The heart, emotions, passion and relationships",
            "tones": "low-low-mid mid-high",
            "recording_tips": "Low tones on 'Ọ̀bàrà', clear 'BAH' sound"
        },
        8: {
            "name": "Ọ̀kànràn Méjì",
            "phonetic": "oh-KAHN-rahn MAY-jee",
            "meaning": "Fire, passion, warrior energy, conflict resolution", 
            "tones": "low-mid-low mid-high",
            "recording_tips": "Distinct 'KAHN', rolling 'rahn'"
        },
        9: {
            "name": "Ògúndá Méjì",
            "phonetic": "oh-GOON-dah MAY-jee",
            "meaning": "War, cutting through obstacles, Ogun's energy",
            "tones": "low-high-low mid-high", 
            "recording_tips": "Strong 'GOON', soft 'dah'"
        },
        10: {
            "name": "Ọ̀sá Méjì",
            "phonetic": "oh-SAH MAY-jee",
            "meaning": "Movement, travel, change of location",
            "tones": "low-mid mid-high",
            "recording_tips": "Short low 'Ọ̀', clear 'SAH'"
        },
        11: {
            "name": "Ìká Méjì", 
            "phonetic": "ee-KAH MAY-jee",
            "meaning": "Wicked, lessons through hardship",
            "tones": "mid-mid mid-high",
            "recording_tips": "Even 'ee-KAH', no harsh emphasis"
        },
        12: {
            "name": "Òtúrúpọ̀n Méjì",
            "phonetic": "oh-TOO-roo-pohn MAY-jee",
            "meaning": "Delayed blessings, patience required",
            "tones": "low-high-mid-low mid-high",
            "recording_tips": "Complex rhythm, practice 'TOO-roo-pohn' flow"
        },
        13: {
            "name": "Òtúrá Méjì",
            "phonetic": "oh-TOO-rah MAY-jee", 
            "meaning": "Deep secrets, hidden knowledge revealed",
            "tones": "low-high-mid mid-high",
            "recording_tips": "Rising 'TOO', flowing 'rah'"
        },
        14: {
            "name": "Ìrẹtẹ̀ Méjì",
            "phonetic": "ee-reh-TEH MAY-jee",
            "meaning": "Stubbornness, need for flexibility", 
            "tones": "mid-mid-low mid-high",
            "recording_tips": "Gentle 'reh', low tone on 'tẹ̀'"
        },
        15: {
            "name": "Ọ̀ṣẹ́ Méjì",
            "phonetic": "oh-SHEH MAY-jee",
            "meaning": "Legs, foundation, what supports us",
            "tones": "low-high mid-high",
            "recording_tips": "Low 'Ọ̀', sharp 'SHEH' with 'sh' sound"
        },
        16: {
            "name": "Òfún Méjì", 
            "phonetic": "oh-FOON MAY-jee",
            "meaning": "White, purity, clarity, Obatala's energy",
            "tones": "low-mid mid-high",
            "recording_tips": "Gentle 'FOON', not harsh 'F'"
        }
    }
    
    print("📖 Enhanced Odu Pronunciation Guide")
    print("=" * 50)
    
    for num, odu in odu_pronunciations.items():
        print(f"\n🔸 ODU {num}: {odu['name']}")
        print(f"   Pronunciation: {odu['phonetic']}")
        print(f"   Tones: {odu['tones']}")
        print(f"   Meaning: {odu['meaning']}")
        print(f"   Recording Tip: {odu['recording_tips']}")
        print(f"   Filename: odu-{num}.mp3")
    
    # Save as detailed guide
    guide_content = "# Enhanced Odu Pronunciation Guide\n\n"
    guide_content += "## Complete Recording Instructions for 16 Major Odu\n\n"
    
    for num, odu in odu_pronunciations.items():
        guide_content += f"### {num}. {odu['name']} (odu-{num}.mp3)\n"
        guide_content += f"**Pronunciation**: {odu['phonetic']}\n\n"
        guide_content += f"**Tonal Pattern**: {odu['tones']}\n\n"
        guide_content += f"**Spiritual Meaning**: {odu['meaning']}\n\n"
        guide_content += f"**Recording Tips**: {odu['recording_tips']}\n\n"
        guide_content += "**Practice Phrase**: Say slowly 3 times, then at natural speed\n\n"
        guide_content += "---\n\n"
    
    guide_content += """## Recording Session Structure

### Warm-up (5 minutes)
1. Practice basic Yoruba sounds: à, ẹ, ì, ọ, ù
2. Practice tonal patterns: high-mid-low
3. Say "Ifá" 10 times with reverence

### Recording Process (45-60 minutes)
1. **Priority Odu** (20 minutes): Record 1, 2, 3, 4, 9, 15
2. **Wisdom Odu** (15 minutes): Record 5, 6, 10, 13, 16  
3. **Challenge Odu** (15 minutes): Record 7, 8, 11, 12, 14
4. **Quality Check** (10 minutes): Listen and re-record if needed

### Technical Standards
- Clear pronunciation with natural rhythm
- Consistent volume levels
- Brief pause before and after each name
- Respectful, spiritual tone throughout

### Cultural Notes
- Each Odu is sacred and deserves reverent pronunciation
- Tonal accuracy is crucial for proper meaning
- Practice with spiritual intention, not just technical precision
- Record in quiet, respectful environment"""

    with open("ENHANCED_ODU_PRONUNCIATION_GUIDE.md", 'w', encoding='utf-8') as f:
        f.write(guide_content)
    
    print(f"\n📋 Complete guide saved: ENHANCED_ODU_PRONUNCIATION_GUIDE.md")
    print("🎯 Ready for authentic Odu pronunciation recording session")

if __name__ == "__main__":
    create_enhanced_odu_guide()