#!/usr/bin/env node

/**
 * Deploy Author Sites to AWS S3
 *
 * This script deploys built sites to their respective S3 buckets
 * Requires AWS CLI to be installed and configured
 *
 * Usage:
 *   node scripts/deploy-to-s3.js              # Deploy all sites
 *   node scripts/deploy-to-s3.js "Rebecca Ryals"  # Deploy specific pen name
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

// Check if AWS CLI is installed
function checkAwsCli() {
  try {
    execSync('aws --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Load deployment configuration
function loadDeployConfig() {
  const configPath = path.join(__dirname, '../deploy-config.json');

  if (!fs.existsSync(configPath)) {
    logWarning('deploy-config.json not found. Creating template...');

    const templateConfig = {
      "Rebecca Ryals": {
        "bucket": "rebeccaryals.com",
        "region": "us-east-1",
        "cloudfront": ""
      },
      "Jane Doe": {
        "bucket": "janedoe.com",
        "region": "us-east-1",
        "cloudfront": ""
      },
      "John Smith": {
        "bucket": "johnsmith.com",
        "region": "us-east-1",
        "cloudfront": ""
      }
    };

    fs.writeFileSync(configPath, JSON.stringify(templateConfig, null, 2), 'utf8');
    logInfo('Created deploy-config.json template. Please update with your S3 bucket details.');
    return templateConfig;
  }

  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

// Deploy a single site to S3
function deploySite(penName, profile, deployConfig) {
  logHeader(`Deploying: ${penName}`);

  const config = deployConfig[penName];

  if (!config) {
    logError(`No deployment configuration found for "${penName}"`);
    logInfo('Please add configuration to deploy-config.json');
    return false;
  }

  if (!config.bucket) {
    logError(`No S3 bucket configured for "${penName}"`);
    return false;
  }

  const outputFolder = path.join(__dirname, '..', profile.outputFolder);

  if (!fs.existsSync(outputFolder)) {
    logError(`Output folder not found: ${outputFolder}`);
    logInfo('Please run "npm run build:all" first');
    return false;
  }

  logInfo(`Bucket: ${config.bucket}`);
  logInfo(`Region: ${config.region}`);
  logInfo(`Source: ${profile.outputFolder}`);

  try {
    // Sync files to S3
    const syncCommand = `aws s3 sync "${outputFolder}" s3://${config.bucket}/ --region ${config.region} --delete`;

    logInfo('Uploading files to S3...');
    execSync(syncCommand, { stdio: 'inherit' });

    // Invalidate CloudFront cache if distribution ID is provided
    if (config.cloudfront) {
      logInfo(`Invalidating CloudFront cache: ${config.cloudfront}`);
      const invalidateCommand = `aws cloudfront create-invalidation --distribution-id ${config.cloudfront} --paths "/*"`;
      execSync(invalidateCommand, { stdio: 'inherit' });
    }

    logSuccess(`Successfully deployed to ${config.bucket}`);
    return true;

  } catch (error) {
    logError(`Deployment failed: ${error.message}`);
    return false;
  }
}

// Main execution
function main() {
  logHeader('S3 Deployment Tool');

  // Check for AWS CLI
  if (!checkAwsCli()) {
    logError('AWS CLI is not installed or not in PATH');
    logInfo('Install AWS CLI from: https://aws.amazon.com/cli/');
    logInfo('After installation, configure it with: aws configure');
    process.exit(1);
  }

  logSuccess('AWS CLI is installed');

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

  // Exit with error code if any deployments failed
  if (failed.length > 0) {
    process.exit(1);
  }
}

main();
