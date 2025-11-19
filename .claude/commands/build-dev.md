---
description: Build current pen name site with validation and error checking
---

Build the currently active pen name site with comprehensive validation:

1. **Pre-build checks**:
   - Read src/_data/profiles.js to identify current pen name
   - Display which pen name will be built
   - Validate the current profile has all required fields
   - Check required files exist (CSS, blog folder, books JSON if specified)
   - Verify no build is currently running

2. **Execute build**:
   - Run `npm run build`
   - Monitor output for errors, warnings, or issues
   - Track build time

3. **Post-build validation**:
   - Verify output folder was created (from profile.outputFolder)
   - Count number of HTML files generated
   - Check for broken internal links (if possible)
   - Verify all referenced images exist
   - Check CSS file was copied correctly

4. **Report results**:
   - Display build summary:
     - Pen name built
     - Output folder location
     - Number of pages generated
     - Number of blog posts included
     - Number of books listed
     - Build time
     - Any warnings or issues
   - Suggest next steps:
     - Test locally by opening _site_*/index.html
     - Or run `npm start` to view with dev server

If build fails, provide detailed error analysis and suggested fixes.
