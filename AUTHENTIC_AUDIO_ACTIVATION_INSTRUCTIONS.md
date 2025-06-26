
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
