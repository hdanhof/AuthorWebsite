#!/bin/bash

# SessionStart Hook for AuthorWebsite
# This hook runs when an agent starts a new session
# It validates the environment and provides helpful context

echo "🚀 AuthorWebsite - Agent Onboarding"
echo "=================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Track if there are any errors
HAS_ERRORS=0

# 1. Check Node.js installation
echo "📦 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js ${NODE_VERSION} installed"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js 18 or higher."
    HAS_ERRORS=1
fi
echo ""

# 2. Check and install dependencies
echo "📚 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠${NC} Dependencies not installed. Running npm install..."
    npm install --quiet
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} Dependencies installed successfully"
    else
        echo -e "${RED}✗${NC} Failed to install dependencies"
        HAS_ERRORS=1
    fi
else
    echo -e "${GREEN}✓${NC} Dependencies already installed"
fi
echo ""

# 3. Validate profiles.js configuration
echo "👥 Validating pen name profiles..."
if [ -f "src/_data/profiles.js" ]; then
    # Extract current pen name using node
    CURRENT_PEN_NAME=$(node -e "const p = require('./src/_data/profiles.js'); console.log(p.currentPenName)")

    if [ -n "$CURRENT_PEN_NAME" ]; then
        echo -e "${GREEN}✓${NC} profiles.js found"
        echo -e "${BLUE}  Active Pen Name:${NC} ${CURRENT_PEN_NAME}"

        # List all available profiles
        echo -e "${BLUE}  Available Profiles:${NC}"
        node -e "const p = require('./src/_data/profiles.js'); Object.keys(p.profiles).forEach(name => console.log('    - ' + name))"
    else
        echo -e "${RED}✗${NC} Could not read currentPenName from profiles.js"
        HAS_ERRORS=1
    fi
else
    echo -e "${RED}✗${NC} profiles.js not found at src/_data/profiles.js"
    HAS_ERRORS=1
fi
echo ""

# 4. Validate required data files for each pen name
echo "📂 Validating pen name data files..."
if [ -f "src/_data/profiles.js" ]; then
    node -e "
    const profiles = require('./src/_data/profiles.js');
    const fs = require('fs');
    let hasErrors = false;

    Object.entries(profiles.profiles).forEach(([name, profile]) => {
        console.log('  Checking: ' + name);

        // Check CSS file
        const cssPath = 'src/css/' + profile.styles;
        if (fs.existsSync(cssPath)) {
            console.log('    ✓ CSS: ' + profile.styles);
        } else {
            console.log('    ✗ Missing CSS: ' + profile.styles);
            hasErrors = true;
        }

        // Check blog folder
        const blogPath = 'src/' + profile.blogFolder;
        if (fs.existsSync(blogPath)) {
            console.log('    ✓ Blog folder: ' + profile.blogFolder);
        } else {
            console.log('    ⚠ Blog folder missing (will be created): ' + profile.blogFolder);
        }

        // Check book list JSON (optional)
        if (profile.bookList) {
            const bookPath = 'src/_data/' + profile.bookList;
            if (fs.existsSync(bookPath)) {
                console.log('    ✓ Books: ' + profile.bookList);
            } else {
                console.log('    ⚠ Books file missing: ' + profile.bookList);
            }
        }
    });

    if (hasErrors) process.exit(1);
    " 2>&1

    if [ $? -ne 0 ]; then
        HAS_ERRORS=1
    fi
else
    echo -e "${YELLOW}⚠${NC} Skipping data file validation (profiles.js not found)"
fi
echo ""

# 5. Check for deployment configuration files
echo "🚀 Checking deployment configuration..."
if [ -f "netlify-config.json" ]; then
    echo -e "${GREEN}✓${NC} netlify-config.json found"
elif [ -f "netlify-config.json.example" ]; then
    echo -e "${YELLOW}⚠${NC} netlify-config.json.example found (copy to netlify-config.json for deployment)"
else
    echo -e "${YELLOW}⚠${NC} No Netlify configuration found"
fi

if [ -f "deploy-config.json" ]; then
    echo -e "${GREEN}✓${NC} deploy-config.json found"
elif [ -f "deploy-config.json.example" ]; then
    echo -e "${YELLOW}⚠${NC} deploy-config.json.example found (copy to deploy-config.json for S3 deployment)"
else
    echo -e "${YELLOW}⚠${NC} No S3 deployment configuration found"
fi
echo ""

# 6. Display useful commands
echo "💡 Useful Commands:"
echo "  npm start           - Start dev server (http://localhost:8080)"
echo "  npm run build       - Build current pen name site"
echo "  npm run build:all   - Build all pen name sites"
echo "  npm run admin       - Start Decap CMS admin server"
echo ""
echo "📝 Custom Slash Commands:"
echo "  /list-profiles      - Show all configured pen names"
echo "  /validate-config    - Validate configuration files"
echo "  /build-all          - Build all sites with progress tracking"
echo ""

# 7. Architecture reminder
echo "🏗️  Architecture Notes:"
echo "  • Multi-site setup: Each pen name builds to separate _site_* folder"
echo "  • Active pen name controlled by: src/_data/profiles.js (currentPenName)"
echo "  • build-all-sites.js modifies profiles.js temporarily during builds"
echo "  • Each pen name requires: CSS file, blog folder, and optional books JSON"
echo ""

# Final status
if [ $HAS_ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ Environment validated successfully!${NC}"
    echo "Ready to start development."
else
    echo -e "${RED}✗ Some validation checks failed.${NC}"
    echo "Please review the errors above before proceeding."
fi

echo "=================================="
