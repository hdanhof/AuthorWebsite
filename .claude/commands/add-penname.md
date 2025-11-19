---
description: Scaffold a new pen name with all required files
---

Create a new pen name identity with all required files and configuration.

**Usage**: /add-penname [Pen Name]

**Steps**:

1. **Gather information** (if not provided, ask user):
   - Pen name (e.g., "Sarah Williams")
   - Website URL (e.g., "https://sarahwilliams.com")
   - Email address
   - Bio/description
   - Genre(s)
   - Social media handles (Twitter, Facebook, etc.)

2. **Generate configuration**:
   - Create a new profile entry in src/_data/profiles.js
   - Use kebab-case for folder/file names (e.g., "Sarah Williams" → "sarahwilliams")
   - Set outputFolder to "_site_[kebabname]"
   - Set styles to "[kebabname].css"
   - Set blogFolder to "blogs/[kebabname]"
   - Set bookList to "[kebabname]_books.json"

3. **Create required files**:
   - Create CSS file: src/css/[kebabname].css (copy from existing as template)
   - Create blog folder: src/blogs/[kebabname]/
   - Create books data file: src/_data/[kebabname]_books.json (empty array)
   - Create initial about/bio page if needed

4. **Update Decap CMS config**:
   - Add the new pen name to src/admin/config.yml collections
   - Ensure blog posts and books can be managed for this pen name

5. **Validation**:
   - Verify all files were created successfully
   - Run a test build: temporarily set currentPenName and run npm run build
   - Check that _site_[kebabname] folder is generated

6. **Report**:
   - Display summary of created files
   - Provide next steps (add content, customize CSS, etc.)
   - Remind user to update currentPenName in profiles.js to work on this pen name

If the pen name already exists, warn the user and ask for confirmation before overwriting.
