
# Deployment Guide

## Overview

PricePal can be deployed using various platforms. This guide covers deployment to popular hosting services with Supabase as the backend.

## Prerequisites

- Supabase project set up with database schema
- Environment variables configured
- Build artifacts ready for deployment

## Platform Deployment Options

### Vercel (Recommended)

Vercel provides excellent React/Vite support with zero configuration.

#### Steps:

1. **Connect Repository:**
   ```bash
   # Push your code to GitHub/GitLab
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Configure project settings

3. **Environment Variables:**
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Build Settings:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

#### Domain Configuration:
- Custom domains can be added in Project Settings
- SSL certificates are automatically provisioned
- CDN and edge caching included

### Netlify

Alternative hosting with similar simplicity.

#### Steps:

1. **Build Setup:**
   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Environment Variables:**
   - Set in Netlify dashboard under Site Settings > Environment Variables

3. **Deploy:**
   - Connect Git repository
   - Configure build settings
   - Deploy automatically on git push

### Railway

Full-stack deployment platform.

#### Steps:

1. **Railway CLI:**
   ```bash
   npm install -g @railway/cli
   railway login
   railway init
   ```

2. **Configuration:**
   ```json
   // railway.json
   {
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "npm run preview",
       "healthcheckPath": "/"
     }
   }
   ```

3. **Deploy:**
   ```bash
   railway up
   ```

## Docker Deployment

For containerized deployments.

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name _;
        root /usr/share/nginx/html;
        index index.html;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### Docker Commands

```bash
# Build image
docker build -t pricepal .

# Run container
docker run -p 3000:80 pricepal

# Docker Compose
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:80"
    environment:
      - VITE_SUPABASE_URL=${SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
```

## Environment Configuration

### Production Environment Variables

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Analytics (Optional)
VITE_GA_ID=GA_MEASUREMENT_ID

# Feature Flags (Optional)
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_REALTIME=true
```

### Build Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select'],
          charts: ['recharts']
        }
      }
    },
    sourcemap: false, // Disable in production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
```

## Supabase Production Setup

### Database Configuration

1. **Row Level Security:**
   - Ensure all RLS policies are properly configured
   - Test with different user roles

2. **Performance:**
   ```sql
   -- Add indexes for production
   CREATE INDEX idx_price_entries_user_created 
   ON price_entries(user_id, created_at DESC);
   
   CREATE INDEX idx_latest_prices_product_supplier 
   ON price_entries(product_id, supplier_id, created_at DESC);
   ```

3. **Backup Strategy:**
   - Enable automated backups
   - Set up point-in-time recovery
   - Test backup restoration

### Authentication Configuration

1. **Email Templates:**
   - Customize email confirmation templates
   - Set up password reset templates
   - Configure email provider (SendGrid, etc.)

2. **Security Settings:**
   - Set appropriate session timeout
   - Configure rate limiting
   - Enable captcha for sign-ups

3. **OAuth Providers:**
   ```javascript
   // Configure social logins
   const { data, error } = await supabase.auth.signInWithOAuth({
     provider: 'google',
     options: {
       redirectTo: 'https://yourapp.com/dashboard'
     }
   });
   ```

## Performance Monitoring

### Analytics Setup

```typescript
// Google Analytics 4
import { gtag } from 'ga-gtag';

gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: document.title,
  page_location: window.location.href
});

// Track user events
const trackEvent = (action: string, category: string) => {
  gtag('event', action, {
    event_category: category,
    event_label: window.location.pathname
  });
};
```

### Error Tracking

```typescript
// Sentry integration
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

// Error boundary
const SentryErrorBoundary = Sentry.withErrorBoundary(App, {
  fallback: ErrorFallback,
  beforeCapture: (scope) => {
    scope.setTag("component", "App");
  },
});
```

## Security Considerations

### HTTPS Configuration

- Always use HTTPS in production
- Configure HSTS headers
- Set up proper CSP headers

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;
               connect-src 'self' https://*.supabase.co;">
```

### Environment Security

- Never commit secrets to git
- Use different API keys for staging/production
- Regularly rotate API keys
- Monitor API usage for anomalies

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
    
    - name: Deploy to Vercel
      uses: vercel/action@v24
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Health Checks

### Application Health

```typescript
// Health check endpoint
const healthCheck = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1);
    
    return { status: 'healthy', database: 'connected' };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
};
```

### Monitoring Alerts

Set up alerts for:
- Application errors
- High response times
- Database connection issues
- API rate limit breaches

## Rollback Strategy

### Blue-Green Deployment

1. Deploy to staging environment
2. Run smoke tests
3. Switch traffic to new version
4. Monitor for issues
5. Rollback if necessary

### Database Migrations

```sql
-- Always use reversible migrations
-- Up migration
ALTER TABLE products ADD COLUMN new_field TEXT;

-- Down migration (for rollback)
ALTER TABLE products DROP COLUMN new_field;
```

## Cost Optimization

### Supabase Limits

- Monitor database usage
- Optimize queries for performance
- Set up usage alerts
- Consider read replicas for high traffic

### CDN Configuration

- Use CDN for static assets
- Enable gzip compression
- Configure cache headers
- Optimize image sizes

This deployment guide ensures your PricePal application runs reliably in production with proper monitoring, security, and performance optimization.
