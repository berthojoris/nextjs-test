# VPS Deployment Guide

This guide helps you deploy your Next.js application to a VPS and resolve common issues like favicon 404 errors.

## Why Favicon Works on Vercel but Not VPS?

**Vercel automatically:**
- Optimizes static file serving
- Handles CDN distribution
- Configures proper headers
- Manages caching strategies

**VPS requires manual:**
- Web server configuration (Nginx/Apache)
- Static file serving setup
- SSL/HTTPS configuration
- Cache header management

## Quick Fix for Favicon 404

### Option 1: Route Handler (Recommended)
We've created `src/app/favicon.ico/route.ts` that serves as a fallback. This ensures favicon works regardless of server configuration.

### Option 2: Server Configuration

#### Nginx Configuration
```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    # SSL Configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    
    # Root directory (adjust path as needed)
    root /var/www/your-app;
    
    # Serve static files directly from public directory
    location ~* \.(ico|css|js|gif|jpe?g|png|svg|woff2?|ttf|eot)$ {
        root /var/www/your-app/public;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Access-Control-Allow-Origin "*";
        try_files $uri @nextjs;
    }
    
    # Specific favicon handling
    location = /favicon.ico {
        root /var/www/your-app/public;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri @nextjs;
        access_log off;
    }
    
    # Next.js application
    location / {
        try_files $uri @nextjs;
    }
    
    location @nextjs {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

#### Apache Configuration
```apache
<VirtualHost *:443>
    ServerName yourdomain.com
    DocumentRoot /var/www/your-app
    
    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /path/to/your/certificate.crt
    SSLCertificateKeyFile /path/to/your/private.key
    
    # Serve static files directly
    Alias /favicon.ico /var/www/your-app/public/favicon.ico
    
    <Directory "/var/www/your-app/public">
        Options -Indexes
        AllowOverride None
        Require all granted
        
        # Cache static files
        <FilesMatch "\.(ico|css|js|gif|jpe?g|png|svg|woff2?)$">
            ExpiresActive On
            ExpiresDefault "access plus 1 year"
            Header set Cache-Control "public, immutable"
        </FilesMatch>
    </Directory>
    
    # Proxy to Next.js
    ProxyPreserveHost On
    ProxyPass /favicon.ico !
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/
    
    # Security headers
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
</VirtualHost>
```

## Deployment Steps

### 1. Build the Application
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test the build locally
npm start
```

### 2. Upload to VPS
```bash
# Using rsync (recommended)
rsync -avz --exclude node_modules --exclude .git . user@your-vps:/var/www/your-app/

# Or using scp
scp -r . user@your-vps:/var/www/your-app/
```

### 3. Install Dependencies on VPS
```bash
ssh user@your-vps
cd /var/www/your-app
npm install --production
npm run build
```

### 4. Set Proper Permissions
```bash
# Set ownership
sudo chown -R www-data:www-data /var/www/your-app

# Set permissions
sudo chmod -R 755 /var/www/your-app
sudo chmod 644 /var/www/your-app/public/favicon.ico
```

### 5. Start the Application

#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'nextjs-app',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/your-app',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Start the application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Using Systemd
```bash
# Create service file
sudo tee /etc/systemd/system/nextjs-app.service > /dev/null << EOF
[Unit]
Description=Next.js App
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/your-app
ExecStart=/usr/bin/npm start
Restart=on-failure
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
EOF

# Enable and start service
sudo systemctl enable nextjs-app
sudo systemctl start nextjs-app
sudo systemctl status nextjs-app
```

## Troubleshooting

### Check if Favicon Exists
```bash
# On your VPS
ls -la /var/www/your-app/public/favicon.ico
curl -I https://yourdomain.com/favicon.ico
```

### Test Static File Serving
```bash
# Test direct access
curl -v https://yourdomain.com/favicon.ico

# Check response headers
curl -I https://yourdomain.com/favicon.ico
```

### Check Logs
```bash
# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Next.js logs (PM2)
pm2 logs nextjs-app

# Next.js logs (Systemd)
sudo journalctl -u nextjs-app -f
```

### Common Issues and Solutions

1. **File not found**: Check file permissions and path
2. **CORS errors**: Add proper CORS headers in server config
3. **Cache issues**: Clear browser cache and CDN cache
4. **SSL issues**: Verify certificate installation
5. **Proxy issues**: Check proxy configuration and headers

## Performance Optimization

### Enable Gzip Compression
```nginx
# Add to nginx.conf
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### Enable HTTP/2
```nginx
# Add http2 to listen directive
listen 443 ssl http2;
```

### Set up CDN (Optional)
Consider using a CDN like Cloudflare for better performance and automatic optimization.

## Security Considerations

1. **Keep server updated**: Regular security updates
2. **Use strong SSL**: TLS 1.2+ with strong ciphers
3. **Set security headers**: CSP, HSTS, etc.
4. **Firewall configuration**: Only open necessary ports
5. **Regular backups**: Automated backup strategy

## Monitoring

### Basic Monitoring
```bash
# Check application status
pm2 status
sudo systemctl status nextjs-app

# Monitor resources
htop
df -h
```

### Advanced Monitoring
Consider tools like:
- Prometheus + Grafana
- New Relic
- DataDog
- Uptime Robot

This guide should resolve your favicon issues and provide a solid foundation for VPS deployment.