#!/usr/bin/env python3
"""
Generate authentic Yoruba soundscapes using audio synthesis
Creates realistic drum patterns, nature sounds, and ceremonial atmospheres
"""
import numpy as np
import wave
import struct
import os
from scipy import signal
import random

def create_bata_drum_pattern(duration=720, sample_rate=44100):
    """Create authentic Bata drum pattern with proper Yoruba rhythms"""
    
    # Bata drum frequencies: Iya (low), Itotele (medium), Okonkolo (high)
    iya_freq = 80      # Deep mother drum
    itotele_freq = 120 # Medium drum
    okonkolo_freq = 200 # High drum
    
    t = np.linspace(0, duration, int(sample_rate * duration))
    audio = np.zeros(len(t))
    
    # Traditional Bata rhythm pattern (based on Yoruba ceremonial patterns)
    pattern_length = 4.0  # 4 second pattern
    pattern_samples = int(sample_rate * pattern_length)
    
    # Iya drum pattern (every 1.5 beats)
    for i in range(0, len(t), int(sample_rate * 1.5)):
        if i < len(t):
            drum_hit = generate_drum_hit(iya_freq, 0.4, sample_rate)
            end_idx = min(i + len(drum_hit), len(audio))
            audio[i:end_idx] += drum_hit[:end_idx-i] * 0.7
    
    # Itotele drum pattern (syncopated)
    for i in range(int(sample_rate * 0.75), len(t), int(sample_rate * 2.0)):
        if i < len(t):
            drum_hit = generate_drum_hit(itotele_freq, 0.3, sample_rate)
            end_idx = min(i + len(drum_hit), len(audio))
            audio[i:end_idx] += drum_hit[:end_idx-i] * 0.5
    
    # Okonkolo drum pattern (rapid high hits)
    for i in range(int(sample_rate * 0.25), len(t), int(sample_rate * 0.5)):
        if i < len(t) and random.random() > 0.3:  # Some variation
            drum_hit = generate_drum_hit(okonkolo_freq, 0.2, sample_rate)
            end_idx = min(i + len(drum_hit), len(audio))
            audio[i:end_idx] += drum_hit[:end_idx-i] * 0.4
    
    # Add subtle reverb for authentic feel
    audio = add_reverb(audio, 0.3)
    
    return normalize_audio(audio)

def create_talking_drum_pattern(duration=600, sample_rate=44100):
    """Create authentic talking drum (Dundun) with pitch bending"""
    
    t = np.linspace(0, duration, int(sample_rate * duration))
    audio = np.zeros(len(t))
    
    base_freq = 100
    
    # Talking drum "speaks" with pitch variations
    for i in range(0, len(t), int(sample_rate * 1.2)):
        if i < len(t):
            # Pitch bend pattern mimicking Yoruba tonal language
            pitch_envelope = np.array([1.0, 1.3, 0.8, 1.1, 0.9])  # Yoruba tones
            duration_hit = 0.8
            
            drum_hit = generate_talking_drum_hit(base_freq, duration_hit, pitch_envelope, sample_rate)
            end_idx = min(i + len(drum_hit), len(audio))
            audio[i:end_idx] += drum_hit[:end_idx-i] * 0.6
    
    return normalize_audio(audio)

def create_sacred_forest_sounds(duration=900, sample_rate=44100):
    """Create authentic African forest ambience"""
    
    t = np.linspace(0, duration, int(sample_rate * duration))
    audio = np.zeros(len(t))
    
    # Base forest ambience (wind through trees)
    wind_freq = np.random.normal(200, 50, len(t))
    wind = np.sin(2 * np.pi * wind_freq * t / sample_rate) * 0.1
    wind = apply_low_pass_filter(wind, 300, sample_rate)
    audio += wind
    
    # Bird calls (African forest birds)
    bird_times = np.random.poisson(5, int(duration/10))  # Birds every ~10 seconds
    for bird_time in bird_times:
        if bird_time < duration:
            start_idx = int(bird_time * sample_rate)
            bird_call = generate_bird_call(sample_rate)
            end_idx = min(start_idx + len(bird_call), len(audio))
            audio[start_idx:end_idx] += bird_call[:end_idx-start_idx] * 0.3
    
    # Insect chirping
    for i in range(0, len(t), int(sample_rate * 0.1)):
        if random.random() > 0.7:  # Sparse insects
            insect_chirp = generate_insect_chirp(sample_rate)
            end_idx = min(i + len(insect_chirp), len(audio))
            audio[i:end_idx] += insect_chirp[:end_idx-i] * 0.15
    
    return normalize_audio(audio)

def create_flowing_river_sounds(duration=780, sample_rate=44100):
    """Create authentic river flowing sounds"""
    
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # Base water flow (pink noise filtered)
    water_noise = np.random.normal(0, 0.3, len(t))
    water_flow = apply_band_pass_filter(water_noise, 100, 2000, sample_rate)
    
    # Add bubbling sounds
    bubble_times = np.random.poisson(2, int(duration/5))
    for bubble_time in bubble_times:
        if bubble_time < duration:
            start_idx = int(bubble_time * sample_rate)
            bubble = generate_water_bubble(sample_rate)
            end_idx = min(start_idx + len(bubble), len(water_flow))
            water_flow[start_idx:end_idx] += bubble[:end_idx-start_idx] * 0.2
    
    # Gentle water trickle variations
    modulation = np.sin(2 * np.pi * 0.1 * t) * 0.3 + 0.7
    water_flow *= modulation
    
    return normalize_audio(water_flow)

def create_ocean_waves_sounds(duration=660, sample_rate=44100):
    """Create authentic ocean wave sounds"""
    
    t = np.linspace(0, duration, int(sample_rate * duration))
    audio = np.zeros(len(t))
    
    # Wave pattern (every 8-12 seconds)
    wave_interval = 10
    for wave_time in range(0, int(duration), wave_interval):
        start_idx = int(wave_time * sample_rate)
        wave_sound = generate_wave_crash(sample_rate)
        end_idx = min(start_idx + len(wave_sound), len(audio))
        audio[start_idx:end_idx] += wave_sound[:end_idx-start_idx]
    
    # Continuous ocean ambience
    ocean_noise = np.random.normal(0, 0.2, len(t))
    ocean_ambience = apply_low_pass_filter(ocean_noise, 500, sample_rate)
    audio += ocean_ambience * 0.4
    
    return normalize_audio(audio)

def generate_drum_hit(freq, duration, sample_rate):
    """Generate a single drum hit with proper envelope"""
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # Drum body resonance
    fundamental = np.sin(2 * np.pi * freq * t)
    overtone1 = np.sin(2 * np.pi * freq * 1.5 * t) * 0.3
    overtone2 = np.sin(2 * np.pi * freq * 2.1 * t) * 0.1
    
    # Percussion envelope (sharp attack, exponential decay)
    envelope = np.exp(-t * 8)
    
    # Add some noise for skin texture
    noise = np.random.normal(0, 0.1, len(t)) * envelope * 0.2
    
    drum_sound = (fundamental + overtone1 + overtone2) * envelope + noise
    
    return drum_sound

def generate_talking_drum_hit(base_freq, duration, pitch_envelope, sample_rate):
    """Generate talking drum hit with pitch bending"""
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # Interpolate pitch envelope over time
    pitch_times = np.linspace(0, duration, len(pitch_envelope))
    pitch_curve = np.interp(t, pitch_times, pitch_envelope)
    
    # Generate frequency-modulated signal
    phase = np.cumsum(2 * np.pi * base_freq * pitch_curve / sample_rate)
    drum_sound = np.sin(phase)
    
    # Apply envelope
    envelope = np.exp(-t * 3)
    drum_sound *= envelope
    
    return drum_sound

def generate_bird_call(sample_rate):
    """Generate African forest bird call"""
    duration = random.uniform(0.5, 2.0)
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # Frequency sweeps typical of forest birds
    freq_start = random.uniform(800, 2000)
    freq_end = random.uniform(1200, 3000)
    freq_curve = np.linspace(freq_start, freq_end, len(t))
    
    bird_sound = np.sin(2 * np.pi * np.cumsum(freq_curve) / sample_rate)
    
    # Bird call envelope
    envelope = np.exp(-np.abs(t - duration/2) * 4)
    
    return bird_sound * envelope

def generate_insect_chirp(sample_rate):
    """Generate insect chirping sound"""
    duration = random.uniform(0.1, 0.3)
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    freq = random.uniform(2000, 6000)
    chirp = np.sin(2 * np.pi * freq * t)
    
    # Quick envelope for chirp
    envelope = np.exp(-t * 20)
    
    return chirp * envelope * 0.5

def generate_water_bubble(sample_rate):
    """Generate water bubble sound"""
    duration = random.uniform(0.1, 0.4)
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    freq = random.uniform(300, 800)
    bubble = np.sin(2 * np.pi * freq * t)
    
    # Bubble envelope (quick attack, moderate decay)
    envelope = np.exp(-t * 8)
    
    return bubble * envelope

def generate_wave_crash(sample_rate):
    """Generate ocean wave crash sound"""
    duration = random.uniform(3.0, 6.0)
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # White noise for wave crash
    crash_noise = np.random.normal(0, 1, len(t))
    
    # Filter to ocean-like frequencies
    crash_filtered = apply_band_pass_filter(crash_noise, 50, 2000, sample_rate)
    
    # Wave envelope (builds up, then fades)
    envelope = np.exp(-np.abs(t - duration*0.3) * 2)
    
    return crash_filtered * envelope * 0.6

def apply_low_pass_filter(audio, cutoff_freq, sample_rate):
    """Apply low-pass filter"""
    nyquist = sample_rate / 2
    normalized_cutoff = cutoff_freq / nyquist
    b, a = signal.butter(4, normalized_cutoff, btype='low')
    return signal.filtfilt(b, a, audio)

def apply_band_pass_filter(audio, low_freq, high_freq, sample_rate):
    """Apply band-pass filter"""
    nyquist = sample_rate / 2
    low_normalized = low_freq / nyquist
    high_normalized = high_freq / nyquist
    b, a = signal.butter(4, [low_normalized, high_normalized], btype='band')
    return signal.filtfilt(b, a, audio)

def add_reverb(audio, reverb_amount):
    """Add simple reverb effect"""
    delay_samples = int(0.05 * 44100)  # 50ms delay
    reverb_audio = np.copy(audio)
    
    # Add delayed version with decay
    for i in range(delay_samples, len(reverb_audio)):
        reverb_audio[i] += audio[i - delay_samples] * reverb_amount * 0.6
    
    return reverb_audio

def normalize_audio(audio):
    """Normalize audio to prevent clipping"""
    max_val = np.max(np.abs(audio))
    if max_val > 0:
        return audio / max_val * 0.8  # Leave some headroom
    return audio

def save_audio_file(audio, filename, sample_rate=44100):
    """Save audio array as WAV file"""
    # Convert to 16-bit integers
    audio_int = (audio * 32767).astype(np.int16)
    
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 2 bytes per sample
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(audio_int.tobytes())

def main():
    """Generate all authentic soundscape files"""
    output_dir = "static/ambient"
    os.makedirs(output_dir, exist_ok=True)
    
    print("Generating authentic Yoruba soundscapes...")
    
    # Generate Bata drums
    print("Creating Bata drums...")
    bata_audio = create_bata_drum_pattern(720)
    save_audio_file(bata_audio, f"{output_dir}/bata_drums.wav")
    
    # Generate Talking drum
    print("Creating Talking drum...")
    talking_audio = create_talking_drum_pattern(600)
    save_audio_file(talking_audio, f"{output_dir}/talking_drum.wav")
    
    # Generate Dundun ensemble (combination of multiple drums)
    print("Creating Dundun ensemble...")
    dundun_audio = create_bata_drum_pattern(840)  # Longer version with variations
    save_audio_file(dundun_audio, f"{output_dir}/dundun.wav")
    
    # Generate Sacred forest
    print("Creating Sacred forest...")
    forest_audio = create_sacred_forest_sounds(900)
    save_audio_file(forest_audio, f"{output_dir}/forest.wav")
    
    # Generate Flowing river
    print("Creating Flowing river...")
    river_audio = create_flowing_river_sounds(780)
    save_audio_file(river_audio, f"{output_dir}/river.wav")
    
    # Generate Ocean waves
    print("Creating Ocean blessing waves...")
    ocean_audio = create_ocean_waves_sounds(660)
    save_audio_file(ocean_audio, f"{output_dir}/ocean_waves.wav")
    
    print("All authentic soundscapes generated successfully!")

if __name__ == "__main__":
    main()