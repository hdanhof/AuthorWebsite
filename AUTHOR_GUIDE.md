# Author Website Management Guide

Welcome! This guide will help you manage your author websites without needing to know how to code. Everything is done through a user-friendly web interface.

## 📚 Table of Contents

1. [Quick Start](#quick-start)
2. [Using the Admin Interface](#using-the-admin-interface)
3. [Managing Your Pen Names](#managing-your-pen-names)
4. [Writing Blog Posts](#writing-blog-posts)
5. [Managing Your Books](#managing-your-books)
6. [Building Your Websites](#building-your-websites)
7. [Publishing to the Web](#publishing-to-the-web)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

### First Time Setup

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/
   - Choose the LTS (Long Term Support) version
   - Follow the installer instructions

2. **Open Terminal/Command Prompt**
   - **Windows**: Press `Win + R`, type `cmd`, press Enter
   - **Mac**: Press `Cmd + Space`, type `Terminal`, press Enter

3. **Navigate to your project folder**
   ```bash
   cd path/to/AuthorWebsite
   ```

4. **Install dependencies** (one-time only)
   ```bash
   npm install
   ```

### Starting the Admin Interface

Every time you want to edit your content:

```bash
npm start
```

Then open your web browser and go to:
- **Admin Interface**: http://localhost:8080/admin/
- **Preview Your Site**: http://localhost:8080/

---

## Using the Admin Interface

### Accessing the Admin

1. Run `npm start` in your terminal
2. Open http://localhost:8080/admin/ in your browser
3. You'll see the Decap CMS dashboard

### Understanding the Sidebar

The sidebar shows different content types you can manage:

- **Pen Names** - Your author profiles
- **[Pen Name] - Blog Posts** - Blog posts for each pen name
- **[Pen Name] - Books** - Book catalogs for each pen name
- **Site Pages** - Main pages like Newsletter

---

## Managing Your Pen Names

### Viewing All Pen Names

1. Click **"Pen Names"** in the sidebar
2. Click **"All Pen Names"**
3. You'll see a list of all your author identities

### Adding a New Pen Name

1. Click **"Pen Names"** → **"All Pen Names"**
2. Scroll down to **"Pen Name Profiles"**
3. Click **"Add Pen Name Profiles"**
4. Fill in the form:
   - **Pen Name**: Your author name (e.g., "Rebecca Ryals")
   - **Real Name**: Optional - your actual name
   - **Website URL**: Your author website address
   - **Page Title**: How your name appears in browser tabs
   - **Email**: Your contact email
   - **Biography**: Your full author bio for the About page
   - **Genre**: Your writing genre (e.g., "Urban Fantasy")
   - **Social Media**: Twitter, Facebook, Instagram handles
   - **Output Folder**: Where the site builds (e.g., "_site_rebeccaryals")
   - **CSS File**: Your style file (e.g., "rebeccaryals.css")
   - **Background Image**: Path to your background image
   - **Blog Folder**: Where your blog posts are stored
   - **Book List File**: Your books data file (e.g., "rebeccaryals_books.json")

5. Click **"Save"** at the top

### Editing an Existing Pen Name

1. Click **"Pen Names"** → **"All Pen Names"**
2. Find the pen name in the list
3. Make your changes
4. Click **"Save"** at the top

### Setting the Active Pen Name

The **"Current Active Pen Name"** field determines which site builds when you run `npm start`.

1. Click **"Pen Names"** → **"All Pen Names"**
2. Change **"Current Active Pen Name"** to the pen name you want to preview
3. Click **"Save"**
4. Restart `npm start` to see that pen name's site

---

## Writing Blog Posts

### Creating a New Blog Post

1. Click your pen name's blog collection (e.g., **"Rebecca Ryals - Blog Posts"**)
2. Click **"New Blog Post"** button
3. Fill in the post details:
   - **Title**: Your blog post title
   - **Description**: A brief summary (for SEO and social media)
   - **Publish Date**: When the post should be published
   - **Body**: Write your post using Markdown (see formatting tips below)

4. Click **"Save"** to save as a draft
5. Click **"Publish"** → **"Publish now"** when ready to make it live

### Formatting Your Posts with Markdown

Markdown is a simple way to format text. Here are the basics:

```markdown
# Large Heading
## Medium Heading
### Small Heading

**Bold text**
*Italic text*

[Link text](https://example.com)

![Image description](/images/photo.jpg)

- Bullet point
- Another bullet point

1. Numbered list
2. Second item
```

### Editing an Existing Post

1. Click your pen name's blog collection
2. Click on the post you want to edit
3. Make your changes
4. Click **"Save"**

### Deleting a Post

1. Click your pen name's blog collection
2. Click on the post you want to delete
3. Click **"Delete entry"** at the top
4. Confirm the deletion

---

## Managing Your Books

### Adding a New Book

1. Click your pen name's book collection (e.g., **"Rebecca Ryals - Books"**)
2. Click on the file to open it
3. Click **"Add Books"** button
4. Fill in the book details:
   - **Book Title**: The title of your book
   - **Series Name**: If it's part of a series
   - **Cover Image**: Upload your book cover (click to upload)
   - **Buy Link**: Link to where readers can buy (Amazon, BookShop.org, etc.)
   - **Description**: Book description (optional)
   - **ISBN**: Your book's ISBN (optional)

5. Click **"Save"**

### Editing Book Information

1. Click your pen name's book collection
2. Find the book in the list
3. Make your changes
4. Click **"Save"**

### Reordering Books

Books appear on your website in the order they're listed. To reorder:

1. Click the **⋮⋮** (drag handle) on the left of each book
2. Drag the book up or down
3. Click **"Save"**

### Uploading Book Covers

1. When editing a book, click on the **"Cover Image"** field
2. Click **"Choose an image"**
3. You can either:
   - **Upload**: Choose a file from your computer
   - **Choose existing**: Select an image you've already uploaded

4. Click **"Choose selected"**

---

## Building Your Websites

### Building One Site (Current Pen Name)

To build just the currently active pen name's site:

```bash
npm start
```

This builds the site and lets you preview it at http://localhost:8080/

Press `Ctrl+C` to stop the preview.

### Building All Sites at Once

To build websites for ALL your pen names:

```bash
npm run build:all
```

This creates a separate website folder for each pen name:
- `_site_rebeccaryals/`
- `_site_janedoe/`
- `_site_johnsmith/`

Each folder contains a complete, ready-to-publish website.

---

## Publishing to the Web

### Setting Up AWS S3 (One-time Setup)

1. **Install AWS CLI**
   - Download from: https://aws.amazon.com/cli/
   - Follow installation instructions for your operating system

2. **Configure AWS Credentials**
   ```bash
   aws configure
   ```
   Enter your:
   - AWS Access Key ID
   - AWS Secret Access Key
   - Default region (e.g., `us-east-1`)
   - Output format: `json`

3. **Create Deployment Configuration**
   - Copy `deploy-config.json.example` to `deploy-config.json`
   - Edit `deploy-config.json` with your S3 bucket names:

   ```json
   {
     "Rebecca Ryals": {
       "bucket": "rebeccaryals.com",
       "region": "us-east-1",
       "cloudfront": "E1234567890ABC"
     }
   }
   ```

   Replace:
   - `bucket`: Your S3 bucket name
   - `region`: Your AWS region
   - `cloudfront`: Your CloudFront distribution ID (optional, leave empty if not using CloudFront)

### Deploying One Site

To deploy a specific pen name's website:

```bash
npm run deploy "Rebecca Ryals"
```

(Use the exact pen name as it appears in your profiles)

### Deploying All Sites

To build and deploy all pen name websites at once:

```bash
npm run deploy:all
```

This will:
1. Build all sites
2. Upload each site to its S3 bucket
3. Invalidate CloudFront caches (if configured)

### What Happens During Deployment

When you deploy, the script:
- ✅ Uploads all website files to S3
- ✅ Removes old files that no longer exist
- ✅ Clears CloudFront cache so changes appear immediately
- ✅ Shows progress for each pen name

---

## Troubleshooting

### "npm: command not found"

**Problem**: Node.js is not installed or not in your PATH

**Solution**: Install Node.js from https://nodejs.org/

### Admin interface shows blank page

**Problem**: The site hasn't been built yet

**Solution**: Run `npm start` and wait for the build to complete

### "Cannot find module" errors

**Problem**: Dependencies aren't installed

**Solution**: Run `npm install` in your project folder

### Blog posts not showing up

**Problem**: Wrong pen name is set as active, or posts aren't in the right folder

**Solution**:
1. Check that "Current Active Pen Name" matches your pen name exactly
2. Verify your blog posts are in the correct collection
3. Restart `npm start`

### Images not uploading

**Problem**: Image is too large or wrong format

**Solution**:
- Resize images to under 2MB
- Use JPG or PNG format
- Optimize images before uploading (use TinyPNG.com)

### Deployment fails with "Access Denied"

**Problem**: AWS credentials are incorrect or don't have S3 permissions

**Solution**:
1. Verify your AWS credentials with `aws configure`
2. Check that your AWS user has S3 write permissions
3. Verify the bucket name in `deploy-config.json` is correct

### Changes not appearing on live site

**Problem**: CloudFront cache hasn't been cleared

**Solution**:
1. Add your CloudFront distribution ID to `deploy-config.json`
2. Redeploy with `npm run deploy`
3. Or manually invalidate cache in AWS CloudFront console

### Build fails with "activeProfile is undefined"

**Problem**: Pen name doesn't exist or is misspelled

**Solution**:
1. Check the "Current Active Pen Name" field in Pen Names
2. Make sure it matches a pen name exactly (case-sensitive)
3. Save changes and rebuild

---

## Tips for Success

### Content Best Practices

- **Blog Posts**: Aim for 500-1500 words for best SEO
- **Book Descriptions**: Keep them concise and compelling (150-300 words)
- **Images**: Optimize before uploading (use TinyPNG or similar tools)
- **Links**: Always test your buy links before deploying

### Workflow Recommendations

1. **Draft First**: Save blog posts as drafts and review before publishing
2. **Preview Locally**: Always run `npm start` to preview changes before deploying
3. **Test Links**: Click all links in your preview to make sure they work
4. **Backup Regularly**: Commit your changes to Git frequently

### Git Workflow (Optional but Recommended)

To track your changes with Git:

```bash
# Check what files changed
git status

# Add all changes
git add .

# Save your changes with a message
git commit -m "Added new blog post about writing process"

# Push to GitHub
git push
```

---

## Getting Help

### Common Commands Reference

| Task | Command |
|------|---------|
| Start admin & preview | `npm start` |
| Build all sites | `npm run build:all` |
| Deploy one site | `npm run deploy "Pen Name"` |
| Deploy all sites | `npm run deploy:all` |
| Install dependencies | `npm install` |

### Additional Resources

- **Markdown Guide**: https://www.markdownguide.org/basic-syntax/
- **Decap CMS Docs**: https://decapcms.org/docs/
- **AWS S3 Static Hosting**: https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html
- **Node.js Help**: https://nodejs.org/en/docs/

### Support

If you encounter issues not covered in this guide:
1. Check the error message carefully
2. Search for the error online
3. Review the Troubleshooting section above
4. Check the GitHub repository issues

---

## Appendix: File Structure

Understanding where your content lives:

```
AuthorWebsite/
├── src/
│   ├── _data/
│   │   ├── profiles.js              # Your pen names
│   │   ├── rebeccaryals_books.json  # Books data
│   │   └── ...
│   ├── blogs/
│   │   ├── rebeccaryals/            # Rebecca's blog posts
│   │   ├── janedoe/                 # Jane's blog posts
│   │   └── johnsmith/               # John's blog posts
│   ├── images/                      # All images
│   └── admin/                       # Admin interface
├── _site_rebeccaryals/              # Built Rebecca site
├── _site_janedoe/                   # Built Jane site
├── _site_johnsmith/                 # Built John site
├── scripts/
│   ├── build-all-sites.js           # Build script
│   └── deploy-to-s3.js              # Deployment script
└── package.json                     # Project configuration
```

**Don't edit files in `_site_*` folders** - they're automatically generated and will be overwritten on the next build!

---

Happy writing! 📚✨
