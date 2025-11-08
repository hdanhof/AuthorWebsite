# Deployment Guide for Authors

This guide explains the **easiest ways** to publish your author websites. No technical knowledge required!

## 🎯 Which Platform Should I Use?

| Platform | Best For | Cost | Difficulty |
|----------|----------|------|------------|
| **Netlify Drop** | Absolute beginners, one-time deployments | FREE | ⭐ Easiest |
| **Netlify CLI** | Regular updates, multiple sites | FREE | ⭐⭐ Very Easy |
| **Cloudflare Pages** | Maximum performance, tech-savvy authors | FREE | ⭐⭐ Very Easy |
| **AWS S3** | Advanced users with existing AWS accounts | $1-5/month | ⭐⭐⭐⭐ Advanced |

**Our Recommendation: Start with Netlify!** It's free, easy, and perfect for fiction authors.

---

## 🚀 Method 1: Netlify Drop (EASIEST - No Setup Required!)

**Perfect for:** First-time deployment, testing, or if you only update your site occasionally.

### Step-by-Step:

1. **Build your websites**
   - Open terminal/command prompt
   - Navigate to your project folder
   - Run: `npm run build:all`
   - This creates folders like `_site_rebeccaryals`, `_site_janedoe`, etc.

2. **Go to Netlify Drop**
   - Open your browser
   - Visit: https://app.netlify.com/drop
   - Sign up for a free account (if you haven't already)

3. **Drag and Drop**
   - Find your built folder (e.g., `_site_rebeccaryals`)
   - Drag the **entire folder** onto the Netlify Drop page
   - Wait a few seconds...
   - **Done!** Your site is live!

4. **Get Your URL**
   - Netlify gives you a URL like: `random-name-123456.netlify.app`
   - Click "Site settings" → "Change site name" to customize it
   - Example: `rebeccaryals.netlify.app`

5. **Add Custom Domain (Optional)**
   - In site settings, click "Domain management"
   - Click "Add custom domain"
   - Enter your domain (e.g., `rebeccaryals.com`)
   - Follow the DNS instructions (usually just copying two nameservers)

6. **Repeat for Each Pen Name**
   - Each pen name gets its own separate site on Netlify
   - Drag `_site_janedoe` to create a second site
   - Drag `_site_johnsmith` to create a third site
   - They're completely independent - no cross-linking!

### Updating Your Site Later:

When you make changes:
1. Run `npm run build:all` again
2. Drag the folder to the **same site** on Netlify
3. It automatically replaces the old version

**Pros:**
- ✅ Zero command line skills needed
- ✅ Literally 30 seconds to deploy
- ✅ Free HTTPS/SSL automatically
- ✅ No credit card required

**Cons:**
- ⚠️ Manual process (have to drag each time)
- ⚠️ Can't automate updates

---

## 🎯 Method 2: Netlify CLI (RECOMMENDED for Regular Updates)

**Perfect for:** Authors who will be updating their sites regularly (blog posts, new books, etc.)

### One-Time Setup (5 minutes):

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```
   - Your browser will open
   - Click "Authorize" to give the CLI access
   - Close the browser tab when done

3. **Create Config File**
   - Copy `netlify-config.json.example` to `netlify-config.json`
   - Edit it with your site names:

   ```json
   {
     "Rebecca Ryals": {
       "siteName": "rebeccaryals",
       "siteId": "",
       "customDomain": "rebeccaryals.com"
     }
   }
   ```

   - `siteName`: What you want your Netlify subdomain to be
   - `siteId`: Leave blank for first deploy (auto-filled later)
   - `customDomain`: Your custom domain (optional)

### Deploying (Every Time):

**Deploy all sites:**
```bash
npm run build:all
npm run deploy:netlify
```

**Deploy one site:**
```bash
npm run build
npm run deploy:netlify "Rebecca Ryals"
```

**That's it!** Your site is live in seconds.

### First Deploy Process:

On your first deployment:
1. Netlify creates a new site for you
2. You'll get a URL like: `rebeccaryals.netlify.app`
3. The `siteId` is automatically saved for next time
4. Future deploys update the same site

### Adding Custom Domains:

1. Go to https://app.netlify.com/
2. Click on your site
3. Click "Domain management" → "Add custom domain"
4. Enter your domain name
5. Follow DNS instructions to point your domain to Netlify

**Pros:**
- ✅ Fast deployment (one command)
- ✅ Can deploy all sites at once
- ✅ Automatic HTTPS/SSL
- ✅ Free forever
- ✅ Unlimited sites

**Cons:**
- ⚠️ Requires one-time CLI setup
- ⚠️ Need to use terminal commands

---

## ☁️ Method 3: Cloudflare Pages (Great Free Alternative)

**Perfect for:** Tech-savvy authors who want maximum speed and unlimited bandwidth

### Setup:

1. **Build your sites**
   ```bash
   npm run build:all
   ```

2. **Create Cloudflare Account**
   - Go to: https://pages.cloudflare.com/
   - Sign up for free (no credit card needed)

3. **Deploy via Web Interface**
   - Click "Create a project"
   - Choose "Upload assets"
   - Drag your `_site_rebeccaryals` folder
   - Choose a project name
   - Click "Deploy"

4. **Repeat for Each Pen Name**
   - Each pen name = separate project
   - Each gets its own URL

### Custom Domains:

1. In Cloudflare Pages project settings
2. Click "Custom domains"
3. Add your domain
4. Update nameservers (Cloudflare provides these)

**Pros:**
- ✅ Unlimited bandwidth (truly unlimited!)
- ✅ Excellent performance (one of the fastest CDNs)
- ✅ Free HTTPS
- ✅ Great DDoS protection

**Cons:**
- ⚠️ Slightly more complex interface than Netlify
- ⚠️ Manual upload process (no CLI deployment yet in our scripts)

---

## 💰 Method 4: AWS S3 (Advanced Users Only)

**Only use if:** You already have AWS experience or need advanced features.

See the [technical README](README.md#deployment) for S3 setup instructions.

**Pros:**
- ✅ Very cheap ($1-5/month typically)
- ✅ Integrates with AWS ecosystem
- ✅ Maximum control

**Cons:**
- ⚠️ Complex setup
- ⚠️ Requires AWS CLI
- ⚠️ Need to manage buckets, policies, etc.
- ⚠️ Not recommended for beginners

---

## 📊 Comparison: What's Best for You?

### If you're **just starting out**:
→ Use **Netlify Drop**

### If you'll **update your site weekly** (blog posts):
→ Use **Netlify CLI**

### If you **want the fastest possible sites**:
→ Use **Cloudflare Pages**

### If you **already use AWS** for other things:
→ Use **AWS S3**

---

## 🔄 Complete Workflow for Fiction Authors

Here's a typical workflow for an author managing 2 pen names:

### Initial Setup (One Time):
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Login: `netlify login`
3. Done! ✅

### Writing a New Blog Post:
1. Open http://localhost:8080/admin/
2. Click your pen name's blog collection
3. Write your post
4. Click "Publish"
5. The post is saved to your Git repository

### Publishing to the Web:
1. Open terminal
2. Run: `npm run deploy:netlify "Rebecca Ryals"`
3. Wait 10-30 seconds
4. Your site is updated! ✨

### Adding a New Book:
1. Go to admin → Books
2. Add new book with cover image
3. Save
4. Run: `npm run deploy:netlify "Rebecca Ryals"`
5. Your readers see the new book!

---

## 🎨 Managing Multiple Pen Names

**Important:** Each pen name is a completely separate website. They don't link to each other.

### Keeping Them Separate:

1. **Different domains:**
   - Rebecca Ryals → `rebeccaryals.com`
   - Jane Doe → `janedoe.com`
   - No links between them

2. **Different Netlify sites:**
   - Each pen name = separate Netlify project
   - Different deployment URLs
   - Totally isolated

3. **Different content:**
   - Each has its own blog posts
   - Each has its own books
   - Each has its own style

### Deploying Multiple Pen Names:

**All at once:**
```bash
npm run build:all
npm run deploy:netlify
```

**One at a time:**
```bash
npm run build
npm run deploy:netlify "Rebecca Ryals"
```

Then change the active pen name in the admin and repeat for the next one.

---

## 🆘 Troubleshooting

### "netlify: command not found"

**Solution:** Install the CLI:
```bash
npm install -g netlify-cli
```

### "Please login to Netlify first"

**Solution:**
```bash
netlify login
```

### "Build folder not found"

**Solution:** Build your sites first:
```bash
npm run build:all
```

### "How do I know which pen name is active?"

Check the Decap CMS admin or look at `src/_data/profiles.js` → `currentPenName`

### "Can I use the same custom domain for multiple pen names?"

**No!** Each pen name must have its own domain. This keeps them completely separate.

Examples:
- ✅ `rebeccaryals.com` for Rebecca
- ✅ `janedoe.com` for Jane
- ❌ `rebeccaryals.com/janedoe` - Don't do this!

---

## 💡 Pro Tips

### Tip 1: Test Before Deploying
Always run `npm start` and preview your site at http://localhost:8080/ before deploying.

### Tip 2: Deploy After Every Major Change
- Added a blog post? Deploy!
- Added a new book? Deploy!
- Updated your bio? Deploy!

### Tip 3: Use Descriptive Site Names
Instead of random names, use:
- `rebeccaryals-author.netlify.app`
- `janedoe-fantasy.netlify.app`

### Tip 4: Keep Track of Your URLs
Create a spreadsheet:

| Pen Name | Netlify URL | Custom Domain | Genre |
|----------|-------------|---------------|-------|
| Rebecca Ryals | rebeccaryals.netlify.app | rebeccaryals.com | Urban Fantasy |
| Jane Doe | janedoe-author.netlify.app | janedoe.com | Romance |

### Tip 5: Set Up Email Notifications
In Netlify settings:
- Enable "Deploy notifications"
- Get emailed when your site goes live
- Know immediately if something breaks

---

## 📚 Additional Resources

- **Netlify Docs**: https://docs.netlify.com/
- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages/
- **Custom Domain Setup**: See platform-specific docs above
- **Need Help?** Check the [Author Guide](AUTHOR_GUIDE.md)

---

## ✅ Quick Reference Commands

```bash
# Build all sites
npm run build:all

# Deploy all sites to Netlify
npm run deploy:netlify

# Deploy one site to Netlify
npm run deploy:netlify "Pen Name"

# Deploy all sites to S3 (if configured)
npm run deploy:all

# Start local preview
npm start
```

---

**Remember:** Your first deployment is always the hardest. After that, it's just one command! 🚀
