#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Running pre-build checks...\n');

let hasErrors = false;

// Check 1: Verify package.json exists and has correct scripts
console.log('1. Checking package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (!packageJson.scripts || !packageJson.scripts.build) {
    console.log('❌ package.json missing build script');
    hasErrors = true;
  } else {
    console.log('✅ package.json looks good');
  }
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
  hasErrors = true;
}

// Check 2: Verify public directory exists
console.log('\n2. Checking public directory...');
if (!fs.existsSync('public')) {
  console.log('❌ public directory missing - creating it');
  fs.mkdirSync('public', { recursive: true });
  console.log('✅ Created public directory');
} else {
  console.log('✅ public directory exists');
}

// Check 3: Check for TypeScript errors
console.log('\n3. Checking for TypeScript errors...');
try {
  const { execSync } = require('child_process');
  execSync('npx tsc --noEmit', { stdio: 'pipe' });
  console.log('✅ No TypeScript errors found');
} catch (error) {
  console.log('❌ TypeScript errors found:');
  console.log(error.stdout?.toString() || error.message);
  hasErrors = true;
}

// Check 4: Verify next.config.mjs has standalone output
console.log('\n4. Checking Next.js config...');
try {
  const configContent = fs.readFileSync('next.config.mjs', 'utf8');
  if (!configContent.includes('output:') || !configContent.includes('standalone')) {
    console.log('❌ next.config.mjs missing standalone output configuration');
    hasErrors = true;
  } else {
    console.log('✅ Next.js config has standalone output');
  }
} catch (error) {
  console.log('❌ Error reading next.config.mjs:', error.message);
  hasErrors = true;
}

// Check 5: Verify Dockerfile exists
console.log('\n5. Checking Dockerfile...');
if (!fs.existsSync('Dockerfile')) {
  console.log('❌ Dockerfile missing');
  hasErrors = true;
} else {
  console.log('✅ Dockerfile exists');
}

// Check 6: Verify docker-compose.yml exists
console.log('\n6. Checking docker-compose.yml...');
if (!fs.existsSync('docker-compose.yml')) {
  console.log('❌ docker-compose.yml missing');
  hasErrors = true;
} else {
  console.log('✅ docker-compose.yml exists');
}

// Final result
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Pre-build checks failed! Please fix the issues above before building.');
  process.exit(1);
} else {
  console.log('✅ All pre-build checks passed! Ready to build.');
  console.log('\n💡 You can now run: docker-compose up --build');
} 