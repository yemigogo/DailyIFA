#!/usr/bin/env python3
"""
Authentic Nigerian Yoruba Audio Integration System
Handles verification, integration, and activation of authentic recordings
"""

import os
import json
import shutil
from pathlib import Path
from typing import Dict, List, Optional

class AuthenticAudioIntegrationSystem:
    def __init__(self, base_path: str = "."):
        self.base_path = Path(base_path)
        self.audio_dir = self.base_path / "static" / "audio" / "pronunciation"
        self.mapping_file = self.base_path / "yoruba_bilingual_pronunciation_mapping.json"
        self.verification_log = self.base_path / "authentic_audio_verification.log"
        
    def verify_speaker_authenticity(self, speaker_info: Dict) -> bool:
        """Verify speaker meets Nigerian authenticity requirements"""
        required_fields = [
            "name", "origin_state", "cultural_background", 
            "yoruba_proficiency", "spiritual_knowledge"
        ]
        
        if not all(field in speaker_info for field in required_fields):
            return False
            
        # Check Nigerian origin
        nigerian_states = [
            "Lagos", "Oyo", "Ogun", "Osun", "Ondo", "Ekiti", "Kwara"
        ]
        
        if speaker_info["origin_state"] not in nigerian_states:
            self.log_verification(f"Speaker from {speaker_info['origin_state']} - not traditional Yorubaland")
            return False
            
        # Check spiritual/cultural knowledge
        if speaker_info["spiritual_knowledge"] != "authentic_ifa_tradition":
            self.log_verification("Speaker lacks authentic Ifá tradition knowledge")
            return False
            
        self.log_verification(f"Speaker {speaker_info['name']} verified as authentic Nigerian Yoruba")
        return True
    
    def validate_audio_quality(self, audio_files: List[str]) -> Dict[str, bool]:
        """Validate audio files meet technical standards"""
        validation_results = {}
        
        for audio_file in audio_files:
            if not os.path.exists(audio_file):
                validation_results[audio_file] = False
                continue
                
            # Check file size (should be reasonable for pronunciation)
            file_size = os.path.getsize(audio_file)
            if file_size < 10000 or file_size > 500000:  # 10KB - 500KB range
                validation_results[audio_file] = False
                self.log_verification(f"Audio file {audio_file} size out of range: {file_size}")
                continue
                
            # Check file extension
            if not audio_file.lower().endswith('.mp3'):
                validation_results[audio_file] = False
                self.log_verification(f"Audio file {audio_file} not MP3 format")
                continue
                
            validation_results[audio_file] = True
            
        return validation_results
    
    def create_backup_of_current_system(self):
        """Create backup before enabling authentic audio"""
        backup_dir = self.base_path / "audio_system_backup"
        backup_dir.mkdir(exist_ok=True)
        
        # Backup current mapping files
        if self.mapping_file.exists():
            shutil.copy2(self.mapping_file, backup_dir / "mapping_backup.json")
            
        # Backup current audio directory structure
        if self.audio_dir.exists():
            shutil.copytree(self.audio_dir, backup_dir / "audio_backup", dirs_exist_ok=True)
            
        self.log_verification("Created backup of current audio system")
    
    def integrate_authentic_recordings(self, recordings_dir: str, speaker_info: Dict) -> bool:
        """Integrate verified authentic recordings into the system"""
        
        # Step 1: Verify speaker authenticity
        if not self.verify_speaker_authenticity(speaker_info):
            self.log_verification("Speaker verification failed - integration aborted")
            return False
            
        # Step 2: Load vocabulary mapping
        with open(self.mapping_file, 'r', encoding='utf-8') as f:
            vocabulary = json.load(f)
            
        # Step 3: Validate all required audio files exist
        recordings_path = Path(recordings_dir)
        required_files = [recordings_path / item["filename"] for item in vocabulary]
        missing_files = [f for f in required_files if not f.exists()]
        
        if missing_files:
            self.log_verification(f"Missing audio files: {[str(f) for f in missing_files]}")
            return False
            
        # Step 4: Validate audio quality
        validation_results = self.validate_audio_quality([str(f) for f in required_files])
        failed_validations = [f for f, valid in validation_results.items() if not valid]
        
        if failed_validations:
            self.log_verification(f"Audio validation failed for: {failed_validations}")
            return False
            
        # Step 5: Create backup
        self.create_backup_of_current_system()
        
        # Step 6: Copy authentic recordings
        self.audio_dir.mkdir(parents=True, exist_ok=True)
        for audio_file in required_files:
            shutil.copy2(audio_file, self.audio_dir / audio_file.name)
            
        # Step 7: Update mapping with speaker attribution
        for item in vocabulary:
            item["speaker_info"] = {
                "name": speaker_info["name"],
                "origin": speaker_info["origin_state"],
                "verification_date": "2025-06-26",
                "authenticity_verified": True
            }
            
        # Step 8: Save updated mapping
        with open(self.mapping_file, 'w', encoding='utf-8') as f:
            json.dump(vocabulary, f, indent=2, ensure_ascii=False)
            
        # Step 9: Create activation flag
        activation_flag = self.base_path / "AUTHENTIC_AUDIO_ENABLED.flag"
        with open(activation_flag, 'w') as f:
            f.write(f"Authentic Nigerian Yoruba audio enabled on 2025-06-26\n")
            f.write(f"Speaker: {speaker_info['name']}\n")
            f.write(f"Origin: {speaker_info['origin_state']}\n")
            f.write("All 17 vocabulary terms available with authentic pronunciation\n")
            
        self.log_verification("Authentic audio integration completed successfully")
        return True
    
    def log_verification(self, message: str):
        """Log verification and integration steps"""
        with open(self.verification_log, 'a', encoding='utf-8') as f:
            f.write(f"[2025-06-26] {message}\n")
    
    def generate_activation_instructions(self) -> str:
        """Generate instructions for activating authentic audio in the app"""
        instructions = """
# Authentic Audio Activation Instructions

## Backend Changes Required
1. Update `server/routes.ts`:
   - Change audio endpoint to serve from `static/audio/pronunciation/`
   - Remove disabled audio checks
   - Add speaker attribution to responses

2. Update `server/storage.ts`:
   - Enable audio-related database fields
   - Add speaker information to audio responses

## Frontend Changes Required
1. Update pronunciation components:
   - Remove disabled state styling
   - Enable audio controls
   - Add speaker attribution display
   - Remove 🔇 muted icons

2. Update UI components:
   - `interactive-yoruba-text.tsx` - enable audio playback
   - `yoruba-pronunciation-demo.tsx` - activate all features
   - `daily-reading.tsx` - enable pronunciation features

## Verification Steps
1. Test all 17 vocabulary terms play correctly
2. Verify speaker attribution displays properly
3. Confirm audio quality meets standards
4. Test across all app components

## Rollback Process
If issues occur:
1. Delete `AUTHENTIC_AUDIO_ENABLED.flag`
2. Restore from `audio_system_backup/`
3. Revert component changes
4. Re-enable disabled state messaging
"""
        return instructions

def main():
    """Main function for testing the integration system"""
    integration_system = AuthenticAudioIntegrationSystem()
    
    # Example speaker verification
    sample_speaker = {
        "name": "Adebayo Ogundimu",
        "origin_state": "Oyo",
        "cultural_background": "Traditional Yoruba family",
        "yoruba_proficiency": "native_speaker",
        "spiritual_knowledge": "authentic_ifa_tradition"
    }
    
    print("Testing speaker verification...")
    is_authentic = integration_system.verify_speaker_authenticity(sample_speaker)
    print(f"Speaker verification result: {is_authentic}")
    
    print("\nGenerating activation instructions...")
    instructions = integration_system.generate_activation_instructions()
    
    instructions_file = "AUTHENTIC_AUDIO_ACTIVATION_INSTRUCTIONS.md"
    with open(instructions_file, 'w') as f:
        f.write(instructions)
    
    print(f"Created: {instructions_file}")
    print("Integration system ready for authentic Nigerian recordings")

if __name__ == "__main__":
    main()