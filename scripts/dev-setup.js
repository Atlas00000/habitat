#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Setting up development environment for optimal Fast Refresh...');

// Check if .next directory exists and clean if needed
const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  console.log('🧹 Cleaning .next directory...');
  execSync('rm -rf .next', { stdio: 'inherit' });
}

// Check if node_modules/.cache exists and clean if needed
const cacheDir = path.join(process.cwd(), 'node_modules', '.cache');
if (fs.existsSync(cacheDir)) {
  console.log('🧹 Cleaning node_modules cache...');
  execSync('rm -rf node_modules/.cache', { stdio: 'inherit' });
}

// Check if .turbo directory exists and clean if needed
const turboDir = path.join(process.cwd(), '.turbo');
if (fs.existsSync(turboDir)) {
  console.log('🧹 Cleaning Turbo cache...');
  execSync('rm -rf .turbo', { stdio: 'inherit' });
}

// Kill any existing process on port 3000
try {
  console.log('🔌 Killing existing process on port 3000...');
  execSync('lsof -ti:3000 | xargs kill -9', { stdio: 'ignore' });
} catch (error) {
  // Port might not be in use, which is fine
}

console.log('✅ Development environment ready!');
console.log('🚀 Starting development server with optimized Fast Refresh...');
console.log('📝 Use Ctrl+C to stop the server');
console.log('🔄 Changes should now be reflected immediately without restart');

// Start the development server
execSync('npm run dev', { stdio: 'inherit' }); 