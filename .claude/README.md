# Claude Agent Configuration

This directory contains configuration, hooks, and commands to improve the onboarding experience for Claude agents working on the AuthorWebsite project.

## Structure

```
.claude/
├── hooks/              # Automated scripts that run on events
│   └── SessionStart.sh # Runs when an agent starts a new session
├── commands/           # Custom slash commands for common tasks
│   ├── add-penname.md
│   ├── build-all.md
│   ├── build-dev.md
│   ├── list-profiles.md
│   └── validate-config.md
├── settings.json       # Project configuration and agent guidelines
└── README.md           # This file
```

## Hooks

### SessionStart.sh
Automatically runs when an agent starts a new session. It:
- Validates Node.js installation
- Installs npm dependencies if needed
- Validates profiles.js configuration
- Checks all required data files for each pen name
- Displays the active pen name and available profiles
- Shows useful commands and architecture notes

## Slash Commands

### /list-profiles
Shows all configured pen names and their status, including:
- Currently active pen name
- All available profiles
- Status of required files (CSS, blog folder, books JSON)

### /validate-config
Performs comprehensive validation of:
- profiles.js syntax and structure
- Eleventy configuration
- Decap CMS configuration
- File existence for all pen names
- Dependencies and build artifacts

### /build-dev
Builds the currently active pen name site with validation:
- Pre-build validation checks
- Monitors build process
- Post-build verification
- Detailed reporting of results

### /build-all
Builds all pen name sites with progress tracking:
- Validates all profiles before building
- Executes multi-site build
- Verifies all output folders
- Reports build status for each site

### /add-penname [Name]
Scaffolds a new pen name with all required files:
- Creates profile configuration
- Generates CSS file
- Creates blog folder
- Creates books JSON file
- Updates Decap CMS config
- Validates the new setup

## Settings.json

Contains:
- **projectContext**: Overview of architecture and critical files
- **development**: Common commands and development info
- **codeStyle**: ESLint rules and formatting preferences
- **fileIgnorePatterns**: Files to ignore in searches
- **agentGuidelines**: Best practices for working on this project
- **testing**: Pre-deployment checklist

## Usage

When an agent starts a new session, the SessionStart hook will automatically run and provide environment validation and helpful context.

Agents can use slash commands by typing them in the chat:
```
/list-profiles
/validate-config
/build-dev
/build-all
/add-penname "Sarah Williams"
```

## Customization

You can modify these files to:
- Add new slash commands in `.claude/commands/`
- Update agent guidelines in `settings.json`
- Enhance the SessionStart hook with additional checks
- Add new hooks for other events (e.g., pre-commit validation)

## Architecture Notes

This is a **multi-tenant static site generator** that allows managing unlimited pen names from a single codebase:
- Each pen name builds to a separate `_site_*` folder
- The active pen name is controlled by `src/_data/profiles.js` (currentPenName)
- The `build-all-sites.js` script temporarily modifies profiles.js during builds
- Each pen name requires: CSS file, blog folder, and optional books JSON

For more details, see the main README.md and AUTHOR_GUIDE.md.
