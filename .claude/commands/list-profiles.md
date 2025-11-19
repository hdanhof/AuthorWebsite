---
description: Show all configured pen names and their status
---

Read the `src/_data/profiles.js` file and display:

1. The currently active pen name (currentPenName value)
2. A table of all configured pen names with:
   - Pen name
   - Output folder
   - CSS file (check if exists)
   - Blog folder (check if exists)
   - Books JSON file (check if exists, mark as optional)
   - Status (✓ Complete or ⚠ Missing files)

Format the output as a readable markdown table with status indicators.

Also check if each profile has all required fields:
- penName
- website
- outputFolder
- styles
- blogFolder

If any profiles are incomplete or missing required files, highlight them with warnings.
