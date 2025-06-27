# Quick Recording Setup Guide

## Simple 3-Step Process

### Step 1: Setup (2 minutes)
```bash
# Create audio directories
mkdir -p static/audio/pronunciation
mkdir -p static/audio/odu
```

### Step 2: Record Audio (45 minutes)
Use any recording device (phone, computer, etc.)

**Priority Order:**
1. **Core Terms First** (most important)
   - `ifa.mp3` - Ifá
   - `ase.mp3` - Àṣẹ  
   - `orisa.mp3` - Òrìṣà
   - `odu.mp3` - Odù
   - `orunmila.mp3` - Ọ̀rúnmìlà

2. **Essential Odu Names**
   - `odu-1.mp3` - Ẹjì Ogbè
   - `odu-2.mp3` - Ọ̀yẹ̀kú Méjì
   - `odu-3.mp3` - Ìwòrì Méjì
   - `odu-4.mp3` - Òdí Méjì
   - (Continue through odu-16.mp3)

### Step 3: Activate System (2 minutes)
```bash
# Check recordings and activate
python scripts/audio_activation_system.py

# Convert disabled components to active
python scripts/reactivate_audio_components.py
```

## Recording Tips

**Equipment:** Any smartphone or computer microphone
**Format:** Save as MP3 files
**Quality:** Natural speaking pace, clear pronunciation
**Environment:** Quiet space without background noise

## File Naming Examples
- Save "Ifá" pronunciation as `ifa.mp3`
- Save "Ẹjì Ogbè" pronunciation as `odu-1.mp3`
- Save "Àṣẹ" pronunciation as `ase.mp3`

## Quick Test
After activation, visit the app and:
- Click any Yoruba word to hear your pronunciation
- Check daily reading page for Odu audio
- Verify pronunciation demo works with input field

## Minimum Viable Setup
Start with just 5 core terms to see the system working:
- ifa.mp3, ase.mp3, orisa.mp3, odu.mp3, orunmila.mp3

Add Odu names (odu-1.mp3 through odu-16.mp3) when ready for full functionality.

The activation scripts will automatically organize files and convert all disabled components to active state once recordings are detected.