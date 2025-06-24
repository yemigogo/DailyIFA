#!/usr/bin/env python3
"""
Create authentic Yoruba soundscapes with proper audio characteristics
"""
import numpy as np
import wave
import os
import random

def create_authentic_bata_drums(duration=720, sample_rate=44100):
    """Create authentic Bata drum pattern with traditional Yoruba rhythms"""
    t = np.linspace(0, duration, int(sample_rate * duration))
    audio = np.zeros(len(t))
    
    # Authentic Bata drum frequencies and patterns
    iya_freq = 65      # Deep mother drum (authentic low frequency)
    itotele_freq = 110 # Medium drum
    okonkolo_freq = 180 # High drum
    
    # Traditional Yoruba Bata rhythm pattern
    beat_duration = 1.6  # Traditional tempo
    
    for beat in range(int(duration / beat_duration)):
        start_time = beat * beat_duration
        start_idx = int(start_time * sample_rate)
        
        if start_idx >= len(t):
            break
            
        # Iya (mother drum) - plays on strong beats
        if beat % 4 == 0:
            drum_hit = create_drum_sound(iya_freq, 0.5, sample_rate, drum_type='iya')
            add_sound_to_audio(audio, drum_hit, start_idx, 0.8)
        
        # Itotele - syncopated pattern
        if beat % 3 == 1:
            drum_hit = create_drum_sound(itotele_freq, 0.3, sample_rate, drum_type='itotele')
            add_sound_to_audio(audio, drum_hit, start_idx + int(0.2 * sample_rate), 0.6)
        
        # Okonkolo - rapid fills
        if beat % 2 == 0:
            for micro_beat in [0.1, 0.3, 0.7]:
                micro_idx = start_idx + int(micro_beat * sample_rate)
                drum_hit = create_drum_sound(okonkolo_freq, 0.15, sample_rate, drum_type='okonkolo')
                add_sound_to_audio(audio, drum_hit, micro_idx, 0.4)
    
    # Add authentic reverb (simulating traditional compound acoustics)
    audio = add_compound_reverb(audio, sample_rate)
    
    return normalize_audio(audio)

def create_authentic_talking_drum(duration=600, sample_rate=44100):
    """Create authentic talking drum (Dundun) with proper pitch bending"""
    t = np.linspace(0, duration, int(sample_rate * duration))
    audio = np.zeros(len(t))
    
    base_freq = 85  # Authentic Dundun frequency
    
    # Talking drum phrases (mimicking Yoruba speech patterns)
    phrase_duration = 2.5
    
    for phrase in range(int(duration / phrase_duration)):
        start_time = phrase * phrase_duration
        start_idx = int(start_time * sample_rate)
        
        if start_idx >= len(t):
            break
        
        # Create Yoruba tonal pattern (high-mid-low-mid like "Yoruba" word)
        tonal_pattern = [1.2, 1.0, 0.7, 1.0, 0.9]  # Authentic Yoruba tones
        
        for i, tone_mult in enumerate(tonal_pattern):
            tone_start = start_idx + int(i * 0.4 * sample_rate)
            if tone_start < len(audio):
                drum_sound = create_talking_drum_tone(base_freq * tone_mult, 0.35, sample_rate)
                add_sound_to_audio(audio, drum_sound, tone_start, 0.7)
    
    return normalize_audio(audio)

def create_authentic_forest_sounds(duration=900, sample_rate=44100):
    """Create authentic African forest ambience"""
    t = np.linspace(0, duration, int(sample_rate * duration))
    audio = np.zeros(len(t))
    
    # Base forest wind through leaves
    wind_base = create_wind_through_trees(duration, sample_rate)
    audio += wind_base * 0.3
    
    # African forest birds (every 8-15 seconds)
    for bird_time in range(0, int(duration), random.randint(8, 15)):
        if bird_time < duration:
            start_idx = int(bird_time * sample_rate)
            bird_call = create_african_bird_call(sample_rate)
            add_sound_to_audio(audio, bird_call, start_idx, 0.4)
    
    # Insect ambient (cicadas, crickets)
    insect_layer = create_forest_insects(duration, sample_rate)
    audio += insect_layer * 0.2
    
    # Occasional animal sounds (monkeys, etc.)
    for animal_time in range(0, int(duration), random.randint(30, 60)):
        if animal_time < duration and random.random() > 0.6:
            start_idx = int(animal_time * sample_rate)
            animal_sound = create_forest_animal_sound(sample_rate)
            add_sound_to_audio(audio, animal_sound, start_idx, 0.3)
    
    return normalize_audio(audio)

def create_authentic_river_sounds(duration=780, sample_rate=44100):
    """Create authentic flowing river sounds"""
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # Base flowing water (filtered noise)
    flow_noise = np.random.normal(0, 0.4, len(t))
    
    # Filter to create water-like frequencies
    nyquist = sample_rate / 2
    from scipy import signal
    b, a = signal.butter(6, [200/nyquist, 3000/nyquist], btype='band')
    water_flow = signal.filtfilt(b, a, flow_noise)
    
    # Add water bubbling and trickling
    for bubble_time in range(0, int(duration), random.randint(3, 8)):
        if bubble_time < duration:
            start_idx = int(bubble_time * sample_rate)
            bubble = create_water_bubble_sound(sample_rate)
            add_sound_to_audio(water_flow, bubble, start_idx, 0.3)
    
    # River flow modulation (natural variation)
    flow_modulation = 1 + 0.2 * np.sin(2 * np.pi * 0.05 * t)  # Very slow variation
    water_flow *= flow_modulation
    
    return normalize_audio(water_flow)

def create_authentic_ocean_waves(duration=660, sample_rate=44100):
    """Create authentic ocean wave sounds"""
    t = np.linspace(0, duration, int(sample_rate * duration))
    audio = np.zeros(len(t))
    
    # Wave crashes every 8-12 seconds
    for wave_time in range(0, int(duration), random.randint(8, 12)):
        if wave_time < duration:
            start_idx = int(wave_time * sample_rate)
            wave_crash = create_wave_crash_sound(sample_rate)
            add_sound_to_audio(audio, wave_crash, start_idx, 0.8)
    
    # Continuous ocean background
    ocean_base = create_ocean_background(duration, sample_rate)
    audio += ocean_base * 0.4
    
    # Water retreating sounds
    for retreat_time in range(4, int(duration), random.randint(8, 12)):
        if retreat_time < duration:
            start_idx = int(retreat_time * sample_rate)
            retreat_sound = create_water_retreat_sound(sample_rate)
            add_sound_to_audio(audio, retreat_sound, start_idx, 0.5)
    
    return normalize_audio(audio)

def create_drum_sound(freq, duration, sample_rate, drum_type='generic'):
    """Create authentic drum sound with proper overtones and envelope"""
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # Fundamental frequency
    fundamental = np.sin(2 * np.pi * freq * t)
    
    # Drum-specific overtones
    if drum_type == 'iya':
        # Deep drum with strong fundamental
        overtone1 = np.sin(2 * np.pi * freq * 1.3 * t) * 0.2
        overtone2 = np.sin(2 * np.pi * freq * 2.1 * t) * 0.1
    elif drum_type == 'itotele':
        # Medium drum with balanced overtones
        overtone1 = np.sin(2 * np.pi * freq * 1.5 * t) * 0.3
        overtone2 = np.sin(2 * np.pi * freq * 2.3 * t) * 0.15
    else:  # okonkolo
        # High drum with bright overtones
        overtone1 = np.sin(2 * np.pi * freq * 1.7 * t) * 0.4
        overtone2 = np.sin(2 * np.pi * freq * 2.8 * t) * 0.2
    
    # Sharp attack, exponential decay
    envelope = np.exp(-t * 12)
    
    # Add membrane noise
    noise = np.random.normal(0, 0.05, len(t)) * envelope
    
    drum_sound = (fundamental + overtone1 + overtone2) * envelope + noise
    
    return drum_sound

def create_talking_drum_tone(freq, duration, sample_rate):
    """Create talking drum tone with authentic pitch characteristics"""
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # Pitch bending (characteristic of talking drums)
    pitch_bend = 1 + 0.3 * np.exp(-t * 5) * np.sin(2 * np.pi * 3 * t)
    instantaneous_freq = freq * pitch_bend
    
    # Generate phase for frequency modulation
    phase = np.cumsum(2 * np.pi * instantaneous_freq / sample_rate)
    drum_tone = np.sin(phase)
    
    # Talking drum envelope
    envelope = np.exp(-t * 8)
    
    return drum_tone * envelope

def create_wind_through_trees(duration, sample_rate):
    """Create wind through forest trees"""
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # Multi-layered wind noise
    wind1 = np.random.normal(0, 0.1, len(t))  # Base wind
    wind2 = np.random.normal(0, 0.05, len(t))  # Gentle rustling
    
    # Filter for natural wind frequencies
    from scipy import signal
    nyquist = sample_rate / 2
    b1, a1 = signal.butter(4, 150/nyquist, btype='low')
    b2, a2 = signal.butter(4, 800/nyquist, btype='low')
    
    wind1_filtered = signal.filtfilt(b1, a1, wind1)
    wind2_filtered = signal.filtfilt(b2, a2, wind2)
    
    # Natural wind variation
    wind_envelope = 0.7 + 0.3 * np.sin(2 * np.pi * 0.02 * t)  # Very slow modulation
    
    return (wind1_filtered + wind2_filtered) * wind_envelope

def create_african_bird_call(sample_rate):
    """Create authentic African forest bird call"""
    duration = random.uniform(1.0, 3.0)
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # African bird frequency patterns
    freq_start = random.uniform(1200, 2800)
    freq_end = random.uniform(800, 2200)
    
    # Characteristic African bird call pattern
    freq_pattern = np.linspace(freq_start, freq_end, len(t))
    freq_pattern += 200 * np.sin(2 * np.pi * 8 * t)  # Trill
    
    bird_call = np.sin(2 * np.pi * np.cumsum(freq_pattern) / sample_rate)
    
    # Bird call envelope
    envelope = np.exp(-2 * np.abs(t - duration/2))
    
    return bird_call * envelope * 0.5

def create_forest_insects(duration, sample_rate):
    """Create continuous forest insect sounds"""
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # Cicada-like continuous drone
    cicada_freq = 4000 + 500 * np.sin(2 * np.pi * 0.1 * t)
    cicada_sound = np.sin(2 * np.pi * cicada_freq * t) * 0.1
    
    # Cricket chirps
    cricket_pattern = np.zeros(len(t))
    for chirp_time in range(0, int(duration), 2):
        if chirp_time < duration:
            start_idx = int(chirp_time * sample_rate)
            chirp_duration = 0.3
            chirp_samples = int(chirp_duration * sample_rate)
            if start_idx + chirp_samples < len(cricket_pattern):
                chirp_t = np.linspace(0, chirp_duration, chirp_samples)
                chirp = np.sin(2 * np.pi * 3000 * chirp_t) * np.exp(-chirp_t * 10)
                cricket_pattern[start_idx:start_idx + chirp_samples] += chirp * 0.05
    
    return cicada_sound + cricket_pattern

def create_forest_animal_sound(sample_rate):
    """Create occasional forest animal sounds"""
    duration = random.uniform(0.5, 2.0)
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # Monkey-like calls or other forest animals
    base_freq = random.uniform(300, 800)
    freq_modulation = base_freq * (1 + 0.5 * np.sin(2 * np.pi * 5 * t))
    
    animal_sound = np.sin(2 * np.pi * freq_modulation * t)
    envelope = np.exp(-2 * np.abs(t - duration/2))
    
    return animal_sound * envelope * 0.3

def create_water_bubble_sound(sample_rate):
    """Create water bubble/trickling sound"""
    duration = random.uniform(0.2, 0.8)
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # Bubble frequencies
    bubble_freq = random.uniform(400, 1200)
    bubble_sound = np.sin(2 * np.pi * bubble_freq * t)
    
    # Quick bubble envelope
    envelope = np.exp(-t * 15)
    
    return bubble_sound * envelope * 0.2

def create_wave_crash_sound(sample_rate):
    """Create ocean wave crash"""
    duration = random.uniform(4.0, 7.0)
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # Wave crash noise
    crash_noise = np.random.normal(0, 1, len(t))
    
    # Filter for wave-like frequencies
    from scipy import signal
    nyquist = sample_rate / 2
    b, a = signal.butter(6, [50/nyquist, 4000/nyquist], btype='band')
    wave_sound = signal.filtfilt(b, a, crash_noise)
    
    # Wave envelope (builds up, crashes, fades)
    peak_time = duration * 0.3
    envelope = np.where(t < peak_time, 
                       t / peak_time,  # Build up
                       np.exp(-(t - peak_time) * 2))  # Fade out
    
    return wave_sound * envelope * 0.8

def create_ocean_background(duration, sample_rate):
    """Create continuous ocean background sound"""
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # Low frequency ocean rumble
    ocean_noise = np.random.normal(0, 0.3, len(t))
    
    from scipy import signal
    nyquist = sample_rate / 2
    b, a = signal.butter(4, 300/nyquist, btype='low')
    ocean_base = signal.filtfilt(b, a, ocean_noise)
    
    # Natural ocean rhythm
    ocean_modulation = 1 + 0.2 * np.sin(2 * np.pi * 0.03 * t)
    
    return ocean_base * ocean_modulation

def create_water_retreat_sound(sample_rate):
    """Create sound of water retreating from beach"""
    duration = random.uniform(2.0, 4.0)
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # High frequency water sound
    retreat_noise = np.random.normal(0, 0.5, len(t))
    
    from scipy import signal
    nyquist = sample_rate / 2
    b, a = signal.butter(4, [1000/nyquist, 8000/nyquist], btype='band')
    retreat_sound = signal.filtfilt(b, a, retreat_noise)
    
    # Fading envelope
    envelope = np.exp(-t * 1.5)
    
    return retreat_sound * envelope * 0.4

def add_sound_to_audio(main_audio, sound_to_add, start_idx, volume):
    """Add a sound to the main audio track"""
    end_idx = min(start_idx + len(sound_to_add), len(main_audio))
    if start_idx < len(main_audio):
        main_audio[start_idx:end_idx] += sound_to_add[:end_idx-start_idx] * volume

def add_compound_reverb(audio, sample_rate):
    """Add reverb simulating traditional Yoruba compound acoustics"""
    delay_samples = int(0.08 * sample_rate)  # 80ms delay
    reverb_audio = np.copy(audio)
    
    # Add delayed version with decay
    for i in range(delay_samples, len(reverb_audio)):
        reverb_audio[i] += audio[i - delay_samples] * 0.3
    
    return reverb_audio

def normalize_audio(audio):
    """Normalize audio to prevent clipping"""
    max_val = np.max(np.abs(audio))
    if max_val > 0:
        return audio / max_val * 0.85  # Leave headroom
    return audio

def save_wav_file(audio, filename, sample_rate=44100):
    """Save audio as WAV file"""
    audio_int = (audio * 32767).astype(np.int16)
    
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(audio_int.tobytes())

def main():
    """Generate all authentic soundscape files"""
    output_dir = "static/ambient"
    os.makedirs(output_dir, exist_ok=True)
    
    print("Creating authentic Yoruba soundscapes...")
    
    # Generate authentic Bata drums
    print("Creating authentic Bata drums...")
    bata_audio = create_authentic_bata_drums(720)
    save_wav_file(bata_audio, f"{output_dir}/bata_drums_new.wav")
    
    # Generate authentic Talking drum
    print("Creating authentic Talking drum...")
    talking_audio = create_authentic_talking_drum(600)
    save_wav_file(talking_audio, f"{output_dir}/talking_drum_new.wav")
    
    # Generate authentic Dundun ensemble
    print("Creating authentic Dundun ensemble...")
    dundun_audio = create_authentic_talking_drum(840)
    save_wav_file(dundun_audio, f"{output_dir}/dundun_new.wav")
    
    # Generate authentic Sacred forest
    print("Creating authentic Sacred forest...")
    forest_audio = create_authentic_forest_sounds(900)
    save_wav_file(forest_audio, f"{output_dir}/forest_new.wav")
    
    # Generate authentic Flowing river
    print("Creating authentic Flowing river...")
    river_audio = create_authentic_river_sounds(780)
    save_wav_file(river_audio, f"{output_dir}/river_new.wav")
    
    # Generate authentic Ocean waves
    print("Creating authentic Ocean waves...")
    ocean_audio = create_authentic_ocean_waves(660)
    save_wav_file(ocean_audio, f"{output_dir}/ocean_waves_new.wav")
    
    print("Converting to MP3 format...")
    
    # Convert to MP3 using ffmpeg
    audio_files = [
        ("bata_drums_new.wav", "bata_drums.mp3"),
        ("talking_drum_new.wav", "talking_drum.mp3"),
        ("dundun_new.wav", "dundun.mp3"),
        ("forest_new.wav", "forest.mp3"),
        ("river_new.wav", "river.mp3"),
        ("ocean_waves_new.wav", "ocean_waves.mp3")
    ]
    
    for wav_file, mp3_file in audio_files:
        wav_path = f"{output_dir}/{wav_file}"
        mp3_path = f"{output_dir}/{mp3_file}"
        os.system(f"ffmpeg -y -i {wav_path} -acodec mp3 -ab 128k {mp3_path}")
        os.remove(wav_path)  # Clean up WAV files
    
    print("All authentic soundscapes created successfully!")

if __name__ == "__main__":
    main()