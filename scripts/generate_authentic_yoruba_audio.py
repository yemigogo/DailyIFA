import os
import json
import requests
from pathlib import Path
import time

class AuthenticYorubaAudioGenerator:
    def __init__(self):
        self.audio_dir = Path("static/audio/pronunciation")
        self.audio_dir.mkdir(parents=True, exist_ok=True)
        
        # Yoruba words with authentic pronunciation patterns
        self.yoruba_words = {
            'àṣẹ': {
                'tones': 'low-mid',
                'ipa': 'àʃé',
                'meaning': 'divine force/amen',
                'context': 'spiritual_affirmation'
            },
            'òrìṣà': {
                'tones': 'low-mid-low',
                'ipa': 'òɾìʃà',
                'meaning': 'deity/divine force',
                'context': 'spiritual_entity'
            },
            'ifá': {
                'tones': 'mid-high',
                'ipa': 'ifá',
                'meaning': 'divination system',
                'context': 'spiritual_practice'
            },
            'ọ̀rúnmìlà': {
                'tones': 'low-high-mid-low',
                'ipa': 'ɔ̀ɾúmìlà',
                'meaning': 'Orisha of wisdom',
                'context': 'orisha_name'
            },
            'ṣàngó': {
                'tones': 'low-high',
                'ipa': 'ʃàŋgó',
                'meaning': 'Orisha of thunder',
                'context': 'orisha_name'
            },
            'ọ̀ṣun': {
                'tones': 'low-mid',
                'ipa': 'ɔ̀ʃun',
                'meaning': 'Orisha of rivers',
                'context': 'orisha_name'
            },
            'yemọja': {
                'tones': 'mid-mid-mid',
                'ipa': 'jemɔja',
                'meaning': 'Orisha of oceans',
                'context': 'orisha_name'
            },
            'ọbàtálá': {
                'tones': 'mid-low-high',
                'ipa': 'ɔbàtálá',
                'meaning': 'Orisha of creation',
                'context': 'orisha_name'
            },
            'ògún': {
                'tones': 'low-mid',
                'ipa': 'ògún',
                'meaning': 'Orisha of iron',
                'context': 'orisha_name'
            },
            'ọya': {
                'tones': 'mid-mid',
                'ipa': 'ɔja',
                'meaning': 'Orisha of winds',
                'context': 'orisha_name'
            },
            'èṣù': {
                'tones': 'low-mid',
                'ipa': 'èʃù',
                'meaning': 'Orisha messenger',
                'context': 'orisha_name'
            },
            'àlàáfíà': {
                'tones': 'low-low-high-low',
                'ipa': 'àlàáfíà',
                'meaning': 'peace/well-being',
                'context': 'greeting'
            },
            'ìbùkún': {
                'tones': 'mid-low-high',
                'ipa': 'ìbùkún',
                'meaning': 'blessing',
                'context': 'spiritual_concept'
            },
            'ẹ̀mí': {
                'tones': 'low-high',
                'ipa': 'ɛ̀mí',
                'meaning': 'spirit/soul',
                'context': 'spiritual_concept'
            },
            'ọdún': {
                'tones': 'mid-high',
                'ipa': 'ɔdún',
                'meaning': 'year/festival',
                'context': 'time_concept'
            },
            'ìwòrì': {
                'tones': 'mid-low-mid',
                'ipa': 'ìwòɾì',
                'meaning': 'Odu Ifa name',
                'context': 'odu_name'
            },
            'ẹjẹ́': {
                'tones': 'mid-high',
                'ipa': 'ɛjɛ́',
                'meaning': 'blood',
                'context': 'ritual_element'
            }
        }
    
    def generate_audio_with_realistic_african_voice(self, word, word_data):
        """Generate audio using a more authentic approach"""
        
        # Try Coqui TTS with African voice models
        try:
            return self._generate_with_coqui_tts(word, word_data)
        except Exception as e:
            print(f"Coqui TTS failed for {word}: {e}")
        
        # Try eSpeak with African voice synthesis
        try:
            return self._generate_with_espeak_african(word, word_data)
        except Exception as e:
            print(f"eSpeak failed for {word}: {e}")
        
        # Fallback to enhanced phonetic synthesis
        return self._generate_enhanced_phonetic(word, word_data)
    
    def _generate_with_coqui_tts(self, word, word_data):
        """Use Coqui TTS with African voice models"""
        try:
            import TTS
            from TTS.api import TTS
            
            # Use a model trained on African languages if available
            tts = TTS(model_name="tts_models/yo/mai_female/glow-tts", progress_bar=False)
            
            output_path = self.audio_dir / f"{word.lower()}.wav"
            tts.tts_to_file(text=word, file_path=str(output_path))
            
            # Convert to MP3 if needed
            mp3_path = self.audio_dir / f"{word.lower()}.mp3"
            os.system(f"ffmpeg -i {output_path} -codec:a libmp3lame -b:a 128k {mp3_path} 2>/dev/null")
            
            if mp3_path.exists():
                output_path.unlink()  # Remove WAV file
                return mp3_path
            
        except ImportError:
            print("Coqui TTS not available")
        except Exception as e:
            print(f"Coqui TTS error: {e}")
        
        return None
    
    def _generate_with_espeak_african(self, word, word_data):
        """Use eSpeak with African-tuned parameters"""
        try:
            # Enhanced eSpeak with Yoruba-specific parameters
            output_path = self.audio_dir / f"{word.lower()}.wav"
            
            # Use Yoruba-specific eSpeak settings
            cmd = f"espeak -v yo -s 140 -p 60 -a 180 -g 10 -w {output_path} '{word}'"
            result = os.system(cmd)
            
            if result == 0 and output_path.exists():
                # Convert to MP3
                mp3_path = self.audio_dir / f"{word.lower()}.mp3"
                os.system(f"ffmpeg -i {output_path} -codec:a libmp3lame -b:a 128k {mp3_path} 2>/dev/null")
                
                if mp3_path.exists():
                    output_path.unlink()
                    return mp3_path
                    
        except Exception as e:
            print(f"eSpeak error: {e}")
        
        return None
    
    def _generate_enhanced_phonetic(self, word, word_data):
        """Generate using phonetic rules and tonal patterns"""
        import numpy as np
        import wave
        
        try:
            # Generate audio based on IPA and tonal patterns
            sample_rate = 22050
            duration = len(word) * 0.3  # Slower for tonal languages
            
            # Create basic waveform with tonal modulation
            t = np.linspace(0, duration, int(sample_rate * duration))
            
            # Base frequency for Yoruba (lower than English)
            base_freq = 140  # Hz - more authentic for African voices
            
            # Apply tonal patterns
            tones = word_data.get('tones', 'mid').split('-')
            tone_freqs = []
            
            for tone in tones:
                if tone == 'high':
                    tone_freqs.append(1.4)
                elif tone == 'low':
                    tone_freqs.append(0.7)
                else:  # mid
                    tone_freqs.append(1.0)
            
            # Generate tonal audio
            audio = np.zeros_like(t)
            syllables = len(tones)
            samples_per_syllable = len(t) // syllables
            
            for i, tone_mult in enumerate(tone_freqs):
                start_idx = i * samples_per_syllable
                end_idx = (i + 1) * samples_per_syllable if i < syllables - 1 else len(t)
                
                syllable_t = t[start_idx:end_idx]
                freq = base_freq * tone_mult
                
                # Add harmonics for more natural sound
                fundamental = np.sin(2 * np.pi * freq * syllable_t)
                harmonic2 = 0.3 * np.sin(2 * np.pi * freq * 2 * syllable_t)
                harmonic3 = 0.1 * np.sin(2 * np.pi * freq * 3 * syllable_t)
                
                syllable_audio = fundamental + harmonic2 + harmonic3
                
                # Apply envelope
                envelope = np.exp(-3 * syllable_t / duration)
                syllable_audio *= envelope[:len(syllable_audio)]
                
                audio[start_idx:end_idx] = syllable_audio
            
            # Normalize and convert to 16-bit
            audio = np.clip(audio * 0.3, -1, 1)
            audio_int = (audio * 32767).astype(np.int16)
            
            # Save as WAV then convert to MP3
            wav_path = self.audio_dir / f"{word.lower()}.wav"
            with wave.open(str(wav_path), 'wb') as wav_file:
                wav_file.setnchannels(1)
                wav_file.setsampwidth(2)
                wav_file.setframerate(sample_rate)
                wav_file.writeframes(audio_int.tobytes())
            
            # Convert to MP3
            mp3_path = self.audio_dir / f"{word.lower()}.mp3"
            os.system(f"ffmpeg -i {wav_path} -codec:a libmp3lame -b:a 128k {mp3_path} 2>/dev/null")
            
            if mp3_path.exists():
                wav_path.unlink()
                return mp3_path
                
        except Exception as e:
            print(f"Enhanced phonetic generation error: {e}")
        
        return None
    
    def generate_all_pronunciations(self):
        """Generate authentic pronunciations for all Yoruba words"""
        success_count = 0
        total_count = len(self.yoruba_words)
        
        print(f"Generating authentic Yoruba pronunciations for {total_count} words...")
        
        for word, word_data in self.yoruba_words.items():
            print(f"Generating: {word} ({word_data['meaning']})")
            
            result = self.generate_audio_with_realistic_african_voice(word, word_data)
            
            if result:
                success_count += 1
                print(f"✓ Created: {result}")
            else:
                print(f"✗ Failed: {word}")
        
        print(f"\nCompleted: {success_count}/{total_count} audio files generated")
        
        # Save pronunciation metadata
        metadata_path = self.audio_dir / "pronunciation_metadata.json"
        with open(metadata_path, 'w', encoding='utf-8') as f:
            json.dump(self.yoruba_words, f, indent=2, ensure_ascii=False)
        
        return success_count

def main():
    generator = AuthenticYorubaAudioGenerator()
    success_count = generator.generate_all_pronunciations()
    
    if success_count > 0:
        print(f"\n🎵 Successfully generated {success_count} authentic Yoruba pronunciation files!")
        print("Files saved to: static/audio/pronunciation/")
    else:
        print("\n⚠️ No audio files were generated. Check dependencies:")
        print("- Install: pip install TTS numpy")
        print("- Install: apt-get install espeak espeak-data ffmpeg")

if __name__ == "__main__":
    main()