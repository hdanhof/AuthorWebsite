# Multi-Site Author Website System

A powerful static site generator for fiction authors managing multiple pen names. Built with [Eleventy (11ty)](https://www.11ty.dev/) and [Decap CMS](https://decapcms.org/), this system lets you create and manage separate websites for each of your author identities.

## ✨ Features

- 📝 **Web-based Admin Interface** - No coding required! Manage all content through an easy-to-use dashboard
- 👤 **Multiple Pen Names** - Create unlimited author identities, each with their own website
- 📚 **Blog Management** - Write and publish blog posts for each pen name
- 📖 **Book Catalogs** - Showcase your books with covers, descriptions, and buy links
- 📧 **Newsletter Signup Forms** - Collect reader emails with integrated Web3Forms
- 🎨 **Custom Styling** - Each pen name can have unique designs
- 🚀 **AWS S3 Deployment** - One-command deployment to static hosting
- ⚡ **Fast Static Sites** - Lightning-fast websites with no server required

## 🚀 Quick Start

### For Authors (Non-Technical Users)

**See the [Author Guide](AUTHOR_GUIDE.md)** for detailed, non-technical instructions on:
- Managing your pen names
- Writing blog posts
- Adding books
- Publishing your websites

### For Developers

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd AuthorWebsite
   npm install
   ```

2. **Start the Admin Interface**
   ```bash
   npm start
   ```
   - Admin: http://localhost:8080/admin/
   - Preview: http://localhost:8080/

3. **Build All Sites**
   ```bash
   npm run build:all
   ```

4. **Deploy to S3**
   ```bash
   npm run deploy:all
   ```

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start development server with admin interface |
| `npm run build` | Build the currently active pen name's site |
| `npm run build:all` | Build websites for all pen names |
| `npm run deploy:netlify` | Deploy all sites to Netlify (recommended) |
| `npm run deploy:netlify "Pen Name"` | Deploy specific pen name to Netlify |
| `npm run deploy:all:netlify` | Build and deploy all sites to Netlify |
| `npm run deploy:s3` | Deploy sites to AWS S3 |
| `npm run deploy:all` | Build and deploy all sites to S3 |
| `npm run admin` | Start Decap CMS local backend server |

## 🏗️ Architecture

### Multi-Author System

This system supports multiple pen names from a single codebase. Each pen name has:

- **Separate output folder** (`_site_penname/`)
- **Independent blog posts** (`src/blogs/penname/`)
- **Unique styling** (`src/css/penname.css`)
- **Individual book catalog** (`src/_data/penname_books.json`)
- **Isolated build process**

### How It Works

1. **Profiles** are defined in `src/_data/profiles.js`
2. **Admin interface** allows editing content through Decap CMS
3. **Build process** generates static HTML for each pen name
4. **Deployment script** uploads sites to separate S3 buckets

### Directory Structure

```
AuthorWebsite/
├── src/
│   ├── _data/               # Data files
│   │   ├── profiles.js      # Pen name configurations
│   │   └── *_books.json     # Book catalogs per author
│   ├── _includes/layouts/   # Page templates
│   ├── blogs/               # Blog posts by pen name
│   │   ├── rebeccaryals/
│   │   ├── janedoe/
│   │   └── johnsmith/
│   ├── images/              # Media files
│   ├── css/                 # Stylesheets
│   └── admin/               # Decap CMS admin interface
├── scripts/
│   ├── build-all-sites.js   # Multi-site build automation
│   └── deploy-to-s3.js      # S3 deployment automation
├── _site_*/                 # Generated sites (gitignored)
└── .eleventy.js             # 11ty configuration
```

## 🎨 Managing Pen Names

### Using the Admin Interface (Recommended)

1. Go to http://localhost:8080/admin/
2. Click **Pen Names** → **All Pen Names**
3. Add or edit pen name profiles through the visual interface

### Programmatically

Edit `src/_data/profiles.js`:

```javascript
module.exports = {
  currentPenName: "Rebecca Ryals",  // Active pen name for npm start

  profiles: {
    "Rebecca Ryals": {
      penName: "Rebecca Ryals",
      website: "https://rebeccaryals.com",
      email: "hello@rebeccaryals.com",
      bio: "Author of urban fantasy detective novels...",
      genre: "Urban Fantasy Detective",
      social: {
        twitter: "@rebeccaryals",
        facebook: "https://facebook.com/rebeccaryals"
      },
      outputFolder: "_site_rebeccaryals",
      styles: "ryals.css",
      background: "/images/website_background.jpg",
      blogFolder: "blogs/rebeccaryals",
      bookList: "ryals_books.json"
    }
  }
};
```

## 📝 Content Management

### Blog Posts

**Via Admin (Easy):**
1. Go to admin interface
2. Select your pen name's blog collection
3. Click "New Blog Post"
4. Write using the markdown editor
5. Publish when ready

**Via Files:**
Create `.md` files in `src/blogs/penname/`:

```markdown
---
layout: layouts/post.njk
author: "Rebecca Ryals"
title: "My First Blog Post"
description: "A brief description"
date: 2024-08-24
tags: post
---

Your blog post content here...
```

### Books

**Via Admin:**
1. Go to your pen name's Books collection
2. Add books with cover images, titles, buy links

**Via Files:**
Edit `src/_data/penname_books.json`:

```json
[
  {
    "name": "Book Title",
    "series": "Series Name",
    "image": "/images/penname/books/cover.png",
    "link": "https://amazon.com/...",
    "description": "Book description",
    "isbn": "978-1234567890"
  }
]
```

## 🚀 Deployment

**📖 See the [Complete Deployment Guide](DEPLOYMENT_GUIDE.md)** for step-by-step instructions!

### Recommended: Netlify (Easiest for Authors)

Netlify is **free** and **perfect for fiction authors** - no technical knowledge required!

**Option 1: Drag & Drop (No Commands!)**
1. Build sites: `npm run build:all`
2. Go to https://app.netlify.com/drop
3. Drag your `_site_penname` folder
4. Done! Your site is live!

**Option 2: CLI Deployment (One Command)**
1. One-time setup:
   ```bash
   npm install -g netlify-cli
   netlify login
   ```

2. Deploy all sites:
   ```bash
   npm run deploy:all:netlify
   ```

3. Deploy one site:
   ```bash
   npm run deploy:netlify "Rebecca Ryals"
   ```

**Benefits:**
- ✅ Free forever (unlimited sites!)
- ✅ Automatic HTTPS/SSL
- ✅ Custom domains included
- ✅ No credit card required
- ✅ 30-second deployments

### Alternative: AWS S3 (Advanced Users)

For authors with existing AWS accounts or advanced needs.

1. **Setup**
   ```bash
   # Install AWS CLI and configure
   aws configure

   # Create config from template
   cp deploy-config.json.example deploy-config.json
   ```

2. **Deploy**
   ```bash
   npm run deploy:all        # Deploy all to S3
   npm run deploy:s3 "Pen Name"  # Deploy one to S3
   ```

See [Deployment Guide](DEPLOYMENT_GUIDE.md) for detailed S3 setup instructions.

## 🔧 Customization

### Adding Custom Styles

1. Create `src/css/penname.css`
2. Reference in pen name profile: `styles: "penname.css"`
3. Customize as needed

### Modifying Templates

Edit templates in `src/_includes/layouts/`:
- `base.njk` - Main layout
- `post.njk` - Blog post layout
- `home.njk` - Homepage layout

### Adding New Pages

Create `.md` or `.njk` files in `src/`:

```markdown
---
layout: layouts/base.njk
title: "New Page"
eleventyNavigation:
  key: "New Page"
  order: 5
---

Page content here...
```

## 🛠️ Development

### Tech Stack

- **Static Site Generator**: [Eleventy](https://www.11ty.dev/) 3.0
- **CMS**: [Decap CMS](https://decapcms.org/) 3.0
- **Template Engine**: Nunjucks
- **Styling**: Vanilla CSS
- **Image Processing**: @11ty/eleventy-img
- **Date Handling**: Luxon
- **Deployment**: AWS CLI

### Build Process

The build system:
1. Reads active pen name from `profiles.js`
2. Filters blog posts for that pen name
3. Loads pen name-specific data (books, styles)
4. Generates static HTML
5. Outputs to pen name's folder

### Multi-Site Build

`scripts/build-all-sites.js`:
- Iterates through all pen names
- Updates `currentPenName` for each
- Runs Eleventy build
- Reports build status

## 📚 Documentation

- **[Author Guide](AUTHOR_GUIDE.md)** - For content creators (non-technical)
- **[Decap CMS Docs](https://decapcms.org/docs/)** - CMS documentation
- **[Eleventy Docs](https://www.11ty.dev/docs/)** - Static site generator docs
- **[AWS S3 Static Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)** - Deployment guide

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

[Your License Here]

## ✨ Credits

Built with:
- [Eleventy](https://www.11ty.dev/) by Zach Leatherman
- [Decap CMS](https://decapcms.org/) by Netlify & community
- [Web3Forms](https://web3forms.com/) for newsletter signups

---

**Need Help?** Check the [Author Guide](AUTHOR_GUIDE.md) or open an issue!