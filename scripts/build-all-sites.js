#!/usr/bin/env node

/**
 * Build All Author Sites
 *
 * This script builds static sites for all pen names defined in profiles.js
 * Each site is built into its own output folder
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logHeader(message) {
  console.log('\n' + '='.repeat(60));
  log(message, colors.bright + colors.cyan);
  console.log('='.repeat(60) + '\n');
}

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
}

function logInfo(message) {
  log(`ℹ ${message}`, colors.blue);
}

// Read profiles
const profilesPath = path.join(__dirname, '../src/_data/profiles.js');
let profiles;

try {
  // Read the profiles.js file
  delete require.cache[require.resolve(profilesPath)];
  const profilesData = require(profilesPath);
  profiles = profilesData.profiles;

  logHeader('Multi-Site Build Started');
  logInfo(`Found ${Object.keys(profiles).length} pen name(s) to build`);
} catch (error) {
  logError(`Failed to load profiles from ${profilesPath}`);
  logError(error.message);
  process.exit(1);
}

// Track build results
const buildResults = [];

// Build each pen name
for (const [penName, profile] of Object.entries(profiles)) {
  logHeader(`Building: ${penName}`);

  const startTime = Date.now();

  try {
    // Update the currentPenName in profiles.js temporarily
    const profilesContent = fs.readFileSync(profilesPath, 'utf8');
    const updatedContent = profilesContent.replace(
      /currentPenName:\s*["'].*["']/,
      `currentPenName: "${penName}"`
    );
    fs.writeFileSync(profilesPath, updatedContent, 'utf8');

    logInfo(`Output folder: ${profile.outputFolder}`);
    logInfo(`Blog folder: ${profile.blogFolder}`);
    logInfo('Running Eleventy build...');

    // Run the build
    execSync('npx @11ty/eleventy', {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logSuccess(`Build completed in ${duration}s`);

    buildResults.push({
      penName,
      success: true,
      duration,
      outputFolder: profile.outputFolder
    });

  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logError(`Build failed after ${duration}s`);
    logError(error.message);

    buildResults.push({
      penName,
      success: false,
      duration,
      error: error.message
    });
  }
}

// Print summary
logHeader('Build Summary');

const successful = buildResults.filter(r => r.success);
const failed = buildResults.filter(r => !r.success);

console.log(`Total pen names: ${buildResults.length}`);
logSuccess(`Successful: ${successful.length}`);
if (failed.length > 0) {
  logError(`Failed: ${failed.length}`);
}

console.log('\nDetails:');
buildResults.forEach(result => {
  if (result.success) {
    logSuccess(`${result.penName} → ${result.outputFolder} (${result.duration}s)`);
  } else {
    logError(`${result.penName} - ${result.error}`);
  }
});

console.log('\n');

// Exit with error code if any builds failed
if (failed.length > 0) {
  process.exit(1);
}
