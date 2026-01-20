# Tay Kay Website - Deployment Guide

## 🚀 Quick Deploy to Vercel (Recommended)

### Step 1: Push to GitHub
1. Create a new repository on GitHub called `taykay-website`
2. Upload all these files to the repository

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your `taykay-website` repository
4. Vercel will auto-detect it's a Vite project
5. Click "Deploy"
6. Your site will be live at `taykay-website.vercel.app`

### Step 3: Connect taykay.xxx Domain

#### In Vercel:
1. Go to your project → Settings → Domains
2. Add `taykay.xxx` and `www.taykay.xxx`
3. Vercel will show you the DNS records needed

#### In Namecheap:
1. Log in to Namecheap → Domain List → taykay.xxx → Manage
2. Go to "Advanced DNS"
3. Delete any existing A or CNAME records for @ and www
4. Add these records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | Automatic |
| CNAME | www | cname.vercel-dns.com | Automatic |

5. Save changes
6. Wait 5-30 minutes for DNS propagation
7. Go back to Vercel and click "Verify" on your domain

### Step 4: Enable HTTPS
Vercel automatically provides free SSL certificates. Once your domain is verified, HTTPS will be enabled automatically.

---

## 🖥️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
taykay-deploy/
├── index.html          # Entry HTML
├── package.json        # Dependencies
├── vite.config.js      # Vite config
├── tailwind.config.js  # Tailwind config
├── postcss.config.js   # PostCSS config
└── src/
    ├── main.jsx        # React entry point
    ├── index.css       # Tailwind imports
    └── TayKayWebsite.jsx  # Main website component
```

---

## 🔧 Troubleshooting

**Domain not working?**
- DNS propagation can take up to 48 hours (usually 5-30 min)
- Check DNS records match exactly
- Clear browser cache

**Build failing?**
- Make sure all dependencies are in package.json
- Check for syntax errors in TayKayWebsite.jsx

---

## 📱 Features

- ✅ Responsive design
- ✅ Authentication (email or phone)
- ✅ Booking system (3-step flow)
- ✅ Shop with cart (Products, Clothing, Services)
- ✅ Podcast advertising calculator
- ✅ Portfolio gallery
- ✅ Wishlist
- ✅ Contact form

---

Made with 💖 for The Notorious Diva
