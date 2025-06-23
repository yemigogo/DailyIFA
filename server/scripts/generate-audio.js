const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Enhanced Yoruba pronunciation data for Odu names
const oduPronunciations = {
  1: { name: "Ogbe Meji", yoruba: "Ogbe Meji", phonetic: "OH-gbeh MEH-jee" },
  2: { name: "Oyeku Meji", yoruba: "Oyeku Meji", phonetic: "oh-YEH-koo MEH-jee" },
  3: { name: "Iwori Meji", yoruba: "Iwori Meji", phonetic: "ee-WOH-ree MEH-jee" },
  4: { name: "Odi Meji", yoruba: "Odi Meji", phonetic: "OH-dee MEH-jee" },
  5: { name: "Irosun Meji", yoruba: "Irosun Meji", phonetic: "ee-roh-SOON MEH-jee" },
  6: { name: "Owonrin Meji", yoruba: "Owonrin Meji", phonetic: "oh-WOHN-reen MEH-jee" },
  7: { name: "Obara Meji", yoruba: "Obara Meji", phonetic: "oh-BAH-rah MEH-jee" },
  8: { name: "Okanran Meji", yoruba: "Okanran Meji", phonetic: "oh-KAHN-rahn MEH-jee" },
  9: { name: "Ogunda Meji", yoruba: "Ogunda Meji", phonetic: "oh-GOON-dah MEH-jee" },
  10: { name: "Osa Meji", yoruba: "Osa Meji", phonetic: "OH-sah MEH-jee" },
  11: { name: "Ika Meji", yoruba: "Ika Meji", phonetic: "EE-kah MEH-jee" },
  12: { name: "Oturupon Meji", yoruba: "Oturupon Meji", phonetic: "oh-too-roo-POHN MEH-jee" },
  13: { name: "Otura Meji", yoruba: "Otura Meji", phonetic: "oh-TOO-rah MEH-jee" },
  14: { name: "Irete Meji", yoruba: "Irete Meji", phonetic: "ee-REH-teh MEH-jee" },
  15: { name: "Ose Meji", yoruba: "Ose Meji", phonetic: "OH-sheh MEH-jee" },
  16: { name: "Ofun Meji", yoruba: "Ofun Meji", phonetic: "oh-FOON MEH-jee" }
};

function generateYorubaAudio(text, outputPath, speed = 0.8) {
  try {
    console.log(`Generating audio for: ${text}`);
    
    // Use espeak-ng with Yoruba-like pronunciation
    // Create a temporary wav file first
    const tempWav = outputPath.replace('.mp3', '_temp.wav');
    
    // Generate speech with espeak-ng
    execSync(`espeak-ng -v en+whisper -s 150 -p 50 -a 100 "${text}" -w "${tempWav}"`, { stdio: 'inherit' });
    
    // Convert to MP3 with ffmpeg and apply audio effects for better quality
    execSync(`ffmpeg -i "${tempWav}" -acodec mp3 -ab 128k -ar 44100 -y "${outputPath}"`, { stdio: 'inherit' });
    
    // Clean up temporary file
    if (fs.existsSync(tempWav)) {
      fs.unlinkSync(tempWav);
    }
    
    console.log(`Audio generated: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error generating audio for ${text}:`, error.message);
    return false;
  }
}

function generatePhoneticAudio(phonetic, outputPath) {
  try {
    console.log(`Generating phonetic audio for: ${phonetic}`);
    
    // Create a slower, more deliberate pronunciation guide
    const tempWav = outputPath.replace('.mp3', '_phonetic_temp.wav');
    
    // Use a slower speed and different voice for phonetic guide
    execSync(`espeak-ng -v en+whisper -s 120 -p 40 -a 100 "${phonetic}" -w "${tempWav}"`, { stdio: 'inherit' });
    
    // Convert to MP3
    execSync(`ffmpeg -i "${tempWav}" -acodec mp3 -ab 128k -ar 44100 -y "${outputPath}"`, { stdio: 'inherit' });
    
    // Clean up
    if (fs.existsSync(tempWav)) {
      fs.unlinkSync(tempWav);
    }
    
    console.log(`Phonetic audio generated: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error generating phonetic audio for ${phonetic}:`, error.message);
    return false;
  }
}

function generateAllOduAudio() {
  const audioDir = path.join(__dirname, '../../client/public/audio/odu');
  
  // Ensure directory exists
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }
  
  console.log('Generating Odu audio files...');
  
  let successCount = 0;
  const totalOdus = Object.keys(oduPronunciations).length;
  
  for (const [id, odu] of Object.entries(oduPronunciations)) {
    console.log(`\nProcessing Odu ${id}: ${odu.name}`);
    
    // Generate main pronunciation
    const mainAudioPath = path.join(audioDir, `${id}.mp3`);
    const success1 = generateYorubaAudio(odu.yoruba, mainAudioPath);
    
    // Generate phonetic guide
    const phoneticAudioPath = path.join(audioDir, `${id}_phonetic.mp3`);
    const success2 = generatePhoneticAudio(odu.phonetic, phoneticAudioPath);
    
    if (success1 && success2) {
      successCount++;
    }
  }
  
  console.log(`\nAudio generation complete: ${successCount}/${totalOdus} Odus processed successfully`);
  
  // Generate a sample test audio
  const testAudioPath = path.join(audioDir, 'test.mp3');
  generateYorubaAudio('Welcome to Ifa spiritual guidance', testAudioPath);
  
  return successCount === totalOdus;
}

// Run the generation
if (require.main === module) {
  generateAllOduAudio();
}

module.exports = { generateAllOduAudio, generateYorubaAudio, oduPronunciations };