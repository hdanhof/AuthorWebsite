---
description: Build all pen name sites with progress tracking and validation
---

Build all pen name sites using the multi-site build system:

1. **Pre-build validation**:
   - Read src/_data/profiles.js and list all pen names to be built
   - Validate each profile has required configuration
   - Check that required files exist for each pen name
   - Estimate total build time based on number of sites

2. **Execute build**:
   - Run `npm run build:all` to build all sites
   - Monitor the output for errors or warnings
   - Track which sites build successfully

3. **Post-build verification**:
   - Verify each expected _site_* folder was created
   - Check the size of each generated site
   - List the number of pages built for each site
   - Verify profiles.js was restored to original state (currentPenName unchanged)

4. **Report results**:
   - Display a summary table showing:
     - Pen name
     - Build status (✓ Success or ✗ Failed)
     - Output folder
     - Number of files generated
     - Build warnings (if any)
   - Provide recommendations for next steps (e.g., test locally, deploy)

If any builds fail, provide detailed error information and suggested fixes.
