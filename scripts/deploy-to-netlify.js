#!/usr/bin/env node

/**
 * Deploy Author Sites to Netlify
 *
 * This script deploys built sites to Netlify using the Netlify CLI
 * Much easier than S3 for non-technical users!
 *
 * Usage:
 *   node scripts/deploy-to-netlify.js              # Deploy all sites
 *   node scripts/deploy-to-netlify.js "Rebecca Ryals"  # Deploy specific pen name
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

function logWarning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

// Check if Netlify CLI is installed
function checkNetlifyCli() {
  try {
    execSync('netlify --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Load deployment configuration
function loadDeployConfig() {
  const configPath = path.join(__dirname, '../netlify-config.json');

  if (!fs.existsSync(configPath)) {
    logWarning('netlify-config.json not found. Creating template...');

    const templateConfig = {
      "Rebecca Ryals": {
        "siteName": "rebeccaryals",
        "siteId": "",
        "customDomain": "rebeccaryals.com"
      },
      "Jane Doe": {
        "siteName": "janedoe-author",
        "siteId": "",
        "customDomain": "janedoe.com"
      },
      "John Smith": {
        "siteName": "johnsmith-author",
        "siteId": "",
        "customDomain": "johnsmith.com"
      }
    };

    fs.writeFileSync(configPath, JSON.stringify(templateConfig, null, 2), 'utf8');
    logInfo('Created netlify-config.json template. Sites will be created on first deploy.');
    return templateConfig;
  }

  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

// Deploy a single site to Netlify
function deploySite(penName, profile, deployConfig) {
  logHeader(`Deploying: ${penName}`);

  const config = deployConfig[penName];

  if (!config) {
    logError(`No deployment configuration found for "${penName}"`);
    logInfo('Please add configuration to netlify-config.json');
    return false;
  }

  const outputFolder = path.join(__dirname, '..', profile.outputFolder);

  if (!fs.existsSync(outputFolder)) {
    logError(`Output folder not found: ${outputFolder}`);
    logInfo('Please run "npm run build:all" first');
    return false;
  }

  logInfo(`Site name: ${config.siteName}`);
  logInfo(`Source: ${profile.outputFolder}`);

  try {
    let deployCommand;

    if (config.siteId) {
      // Deploy to existing site
      logInfo('Deploying to existing Netlify site...');
      deployCommand = `netlify deploy --prod --dir="${outputFolder}" --site=${config.siteId}`;
    } else {
      // Create new site on first deploy
      logInfo('Creating new Netlify site (first deploy)...');
      deployCommand = `netlify deploy --prod --dir="${outputFolder}"`;
    }

    const output = execSync(deployCommand, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });

    logSuccess(`Successfully deployed to Netlify`);

    if (config.customDomain) {
      logInfo(`Remember to configure custom domain: ${config.customDomain}`);
      logInfo('Visit: https://app.netlify.com/ → Site settings → Domain management');
    }

    return true;

  } catch (error) {
    logError(`Deployment failed: ${error.message}`);
    return false;
  }
}

// Main execution
function main() {
  logHeader('Netlify Deployment Tool');

  // Check for Netlify CLI
  if (!checkNetlifyCli()) {
    logError('Netlify CLI is not installed');
    logInfo('Install with: npm install -g netlify-cli');
    logInfo('Then login with: netlify login');
    process.exit(1);
  }

  logSuccess('Netlify CLI is installed');

  // Load configurations
  const deployConfig = loadDeployConfig();
  const profilesPath = path.join(__dirname, '../src/_data/profiles.js');

  let profiles;
  try {
    delete require.cache[require.resolve(profilesPath)];
    const profilesData = require(profilesPath);
    profiles = profilesData.profiles;
  } catch (error) {
    logError(`Failed to load profiles: ${error.message}`);
    process.exit(1);
  }

  // Check if specific pen name was provided
  const targetPenName = process.argv[2];
  const results = [];

  if (targetPenName) {
    // Deploy single pen name
    if (!profiles[targetPenName]) {
      logError(`Pen name "${targetPenName}" not found in profiles`);
      logInfo(`Available pen names: ${Object.keys(profiles).join(', ')}`);
      process.exit(1);
    }

    const success = deploySite(targetPenName, profiles[targetPenName], deployConfig);
    results.push({ penName: targetPenName, success });

  } else {
    // Deploy all pen names
    logInfo(`Deploying ${Object.keys(profiles).length} site(s)...\n`);

    for (const [penName, profile] of Object.entries(profiles)) {
      const success = deploySite(penName, profile, deployConfig);
      results.push({ penName, success });
    }
  }

  // Print summary
  logHeader('Deployment Summary');

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`Total deployments: ${results.length}`);
  logSuccess(`Successful: ${successful.length}`);
  if (failed.length > 0) {
    logError(`Failed: ${failed.length}`);
  }

  console.log('\nDetails:');
  results.forEach(result => {
    if (result.success) {
      logSuccess(result.penName);
    } else {
      logError(result.penName);
    }
  });

  console.log('\n');
  logInfo('View your sites at: https://app.netlify.com/');

  // Exit with error code if any deployments failed
  if (failed.length > 0) {
    process.exit(1);
  }
}

main();
