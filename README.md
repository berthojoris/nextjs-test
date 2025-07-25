This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## VPS Deployment - Favicon Fix

If you're experiencing favicon 404 errors on VPS but not on Vercel, follow these steps:

### 1. Verify Static File Serving
Ensure your web server (Nginx/Apache) serves static files from the `public` directory:

**Nginx Configuration:**
```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Serve static files directly
    location ~* \.(ico|css|js|gif|jpe?g|png|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri @proxy;
    }
    
    location @proxy {
        proxy_pass http://localhost:3000;
    }
    
    # Specific favicon handling
    location = /favicon.ico {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri @proxy;
    }
}
```

**Apache Configuration (.htaccess):**
```apache
# Enable static file serving
<FilesMatch "\.(ico|css|js|gif|jpe?g|png|svg|woff2?)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header set Cache-Control "public, immutable"
</FilesMatch>

# Specific favicon handling
<Files "favicon.ico">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header set Cache-Control "public, immutable"
</Files>
```

### 2. Build and Deploy Checklist

1. **Verify build output:**
   ```bash
   npm run build
   # Check that favicon.ico exists in .next/static/ or public/
   ```

2. **Ensure proper file permissions:**
   ```bash
   chmod 644 public/favicon.ico
   chmod 755 public/
   ```

3. **Test static file serving:**
   ```bash
   curl -I https://yourdomain.com/favicon.ico
   # Should return 200, not 404
   ```

### 3. Common VPS Issues

- **Missing public directory mapping**: Ensure your process manager (PM2, systemd) serves from correct directory
- **Incorrect base path**: Check if your app is deployed in a subdirectory
- **File permissions**: Ensure web server can read the favicon file
- **CDN/Proxy issues**: Clear CDN cache or check proxy configuration
- **HTTPS redirect loops**: Ensure proper SSL termination

### 4. Debug Commands

```bash
# Check if file exists
ls -la public/favicon.ico

# Test direct file access
curl -v https://yourdomain.com/favicon.ico

# Check Next.js logs
npm run start
# Look for static file serving errors

# Verify build output
find .next -name "favicon.ico" -o -name "*favicon*"
```

### 5. Alternative Solutions

If issues persist, try these alternatives:

1. **Use absolute URLs in metadata:**
   ```typescript
   // In layout.tsx
   export const metadata = {
     icons: {
       icon: 'https://yourdomain.com/favicon.ico',
     },
   }
   ```

2. **Add explicit route handler:**
   ```typescript
   // app/favicon.ico/route.ts
   import { NextRequest } from 'next/server'
   import fs from 'fs'
   import path from 'path'
   
   export async function GET(request: NextRequest) {
     const filePath = path.join(process.cwd(), 'public', 'favicon.ico')
     const fileBuffer = fs.readFileSync(filePath)
     
     return new Response(fileBuffer, {
       headers: {
         'Content-Type': 'image/x-icon',
         'Cache-Control': 'public, max-age=31536000, immutable',
       },
     })
   }
   ```

The key difference between Vercel and VPS is that Vercel automatically handles static file serving optimally, while VPS requires manual server configuration.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
