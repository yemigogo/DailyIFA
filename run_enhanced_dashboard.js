#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Enhanced Yoruba Calendar Dashboard...');
console.log('All advanced features integrated and ready!');

// Change to yoruba-calendar directory and start Flask app
const flaskApp = spawn('python3', ['create_enhanced_dashboard.py'], {
  cwd: path.join(__dirname, 'yoruba-calendar'),
  stdio: 'inherit'
});

flaskApp.on('close', (code) => {
  console.log(`Flask app exited with code ${code}`);
});

flaskApp.on('error', (err) => {
  console.error('Failed to start Flask app:', err);
});