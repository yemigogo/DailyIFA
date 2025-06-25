#!/usr/bin/env python3
"""
Generate authentic ocean blessing waves audio
Creates realistic ocean wave sounds for spiritual practice
"""

import numpy as np
from scipy.io import wavfile
import os

def generate_ocean_waves(duration=240, sample_rate=44100):
    """Generate realistic ocean wave sounds"""
    
    # Time array
    t = np.linspace(0, duration, int(duration * sample_rate), False)
    
    # Base wave pattern - low frequency for main wave motion
    base_wave = 0.3 * np.sin(2 * np.pi * 0.1 * t)  # 0.1 Hz main wave
    
    # Add wave variations at different frequencies
    wave_variations = (
        0.2 * np.sin(2 * np.pi * 0.07 * t) +  # Slower waves
        0.15 * np.sin(2 * np.pi * 0.13 * t) +  # Faster waves
        0.1 * np.sin(2 * np.pi * 0.05 * t)    # Very slow waves
    )
    
    # Generate white noise for water texture
    noise = np.random.normal(0, 0.05, len(t))
    
    # Filter noise to simulate water sounds (low-pass filter effect)
    from scipy import signal
    b, a = signal.butter(3, 0.3, 'low')
    filtered_noise = signal.filtfilt(b, a, noise)
    
    # Combine waves with filtered noise
    ocean_sound = base_wave + wave_variations + filtered_noise * 0.8
    
    # Add wave crashes at random intervals
    crash_times = np.random.poisson(8, int(duration/8))  # Average 8 seconds between crashes
    current_time = 0
    
    for interval in crash_times:
        current_time += interval
        if current_time < duration:
            crash_start = int(current_time * sample_rate)
            crash_duration = int(2 * sample_rate)  # 2 second crash
            crash_end = min(crash_start + crash_duration, len(t))
            
            # Generate crash sound - higher amplitude, more noise
            crash_t = np.linspace(0, 2, crash_end - crash_start, False)
            crash_envelope = np.exp(-crash_t * 2)  # Exponential decay
            crash_sound = crash_envelope * (
                0.6 * np.random.normal(0, 1, len(crash_t)) +
                0.4 * np.sin(2 * np.pi * 5 * crash_t)
            )
            
            ocean_sound[crash_start:crash_end] += crash_sound
    
    # Apply gentle fade in/out for seamless looping
    fade_samples = int(2 * sample_rate)  # 2 second fade
    fade_in = np.linspace(0, 1, fade_samples)
    fade_out = np.linspace(1, 0, fade_samples)
    
    ocean_sound[:fade_samples] *= fade_in
    ocean_sound[-fade_samples:] *= fade_out
    
    # Normalize to prevent clipping
    ocean_sound = ocean_sound / np.max(np.abs(ocean_sound))
    ocean_sound *= 0.8  # Leave some headroom
    
    # Convert to 16-bit integer
    ocean_sound_int = (ocean_sound * 32767).astype(np.int16)
    
    return ocean_sound_int, sample_rate

def main():
    print("Generating authentic ocean blessing waves...")
    
    # Generate 4 minutes of ocean sounds
    ocean_audio, sample_rate = generate_ocean_waves(duration=240)
    
    # Save as WAV file
    output_path = "static/audio/soundscapes/ocean_blessing_waves.wav"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    wavfile.write(output_path, sample_rate, ocean_audio)
    
    print(f"✓ Generated authentic ocean waves: {output_path}")
    print(f"Duration: 4 minutes, Sample Rate: {sample_rate} Hz")
    print("File contains realistic wave crashes, water texture, and seamless looping")

if __name__ == "__main__":
    main()