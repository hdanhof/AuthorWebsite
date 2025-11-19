---
description: Validate all configuration files and dependencies
---

Perform a comprehensive validation of the AuthorWebsite configuration:

1. **profiles.js validation**:
   - Check syntax is valid JavaScript
   - Verify currentPenName exists in profiles object
   - Validate all required fields for each profile
   - Check for duplicate outputFolder or blogFolder paths

2. **File existence checks**:
   - For each pen name, verify:
     - CSS file exists in src/css/
     - Blog folder exists in src/ (create if missing)
     - Books JSON file exists in src/_data/ (if specified)

3. **Eleventy configuration**:
   - Verify .eleventy.js exists and is valid
   - Check that it properly loads profiles.js

4. **Decap CMS configuration**:
   - Check src/admin/config.yml exists
   - Verify collections are properly configured

5. **Dependencies**:
   - Check package.json exists
   - Verify node_modules is installed
   - List any missing peer dependencies

6. **Build artifacts**:
   - Check for presence of _site_* folders
   - Note which sites have been built

7. **Deployment configs** (optional):
   - Check if netlify-config.json or deploy-config.json exist
   - Validate JSON syntax if present

Display results in a clear format with ✓ for passed checks and ✗ for failures.
Provide actionable recommendations for fixing any issues found.
