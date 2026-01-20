# Setting Up TayKay.xxx Domain on Vercel

## Step 1: Add Domain in Vercel Dashboard

1. Go to your Vercel project: https://vercel.com/taykays-projects-fc9ab105/taykay-website
2. Click on **Settings** → **Domains**
3. Add these two domains:
   - `taykay.xxx`
   - `www.taykay.xxx`
4. Click **Add** for each one
5. Vercel will show you DNS records to configure

## Step 2: Configure DNS at Your Domain Registrar

### For Namecheap (or similar registrars):

1. **Log in** to your domain registrar (where you bought TayKay.xxx)
2. Go to **Domain List** → **TayKay.xxx** → **Manage**
3. Click on **Advanced DNS** (or DNS Settings)
4. **Delete** any existing A or CNAME records for `@` and `www`
5. **Add these new records:**

| Type  | Host | Value                  | TTL       |
|-------|------|------------------------|-----------|
| A     | @    | 76.76.21.21           | Automatic |
| CNAME | www  | cname.vercel-dns.com  | Automatic |

**Important Notes:**
- `@` means the root domain (taykay.xxx)
- `www` is for www.taykay.xxx
- Use the EXACT values Vercel shows you (they may differ slightly)

6. **Save** the changes

## Step 3: Verify Domain in Vercel

1. Go back to Vercel → Settings → Domains
2. Wait 5-30 minutes for DNS propagation (can take up to 48 hours)
3. Click **Refresh** or **Verify** next to your domain
4. Once verified, Vercel will automatically provision SSL certificates

## Step 4: Set Primary Domain (Optional)

In Vercel → Settings → Domains:
- You can set `taykay.xxx` as the primary domain
- This will redirect `www.taykay.xxx` → `taykay.xxx` (or vice versa)

## Checking DNS Propagation

Use these tools to check if DNS has updated:
- https://dnschecker.org/#A/taykay.xxx
- Command line: `dig taykay.xxx` or `nslookup taykay.xxx`

## Troubleshooting

**Domain not working?**
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Wait longer - DNS can take up to 48 hours
- Double-check DNS records match exactly
- Make sure there are no conflicting DNS records

**SSL Certificate not working?**
- Vercel automatically provisions SSL once domain is verified
- This can take a few minutes after verification
- HTTPS will be enabled automatically

---

🎉 Once setup is complete, your site will be live at:
- https://taykay.xxx
- https://www.taykay.xxx
