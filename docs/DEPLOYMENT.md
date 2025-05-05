# Deployment Guide

## Overview

This guide outlines the deployment process for the VanaCheckIn platform, including environment setup, deployment procedures, and monitoring.

## Environments

### Development
- **URL**: dev.vanacheckin.com
- **Branch**: develop
- **Database**: dev-db
- **Purpose**: Feature development and testing

### Staging
- **URL**: staging.vanacheckin.com
- **Branch**: staging
- **Database**: staging-db
- **Purpose**: Pre-production testing

### Production
- **URL**: vanacheckin.com
- **Branch**: main
- **Database**: prod-db
- **Purpose**: Live environment

## Prerequisites

### Required Tools
- Node.js 18.x
- npm 9.x
- Git
- Vercel CLI
- Docker (optional)
- AWS CLI (optional)

### Required Accounts
- Vercel
- GitHub
- AWS
- Stripe
- SendGrid
- Sentry

## Deployment Process

### 1. Pre-deployment Checklist

```bash
# Run tests
npm run test

# Build application
npm run build

# Check for vulnerabilities
npm audit

# Check for outdated dependencies
npm outdated
```

### 2. Environment Configuration

#### Development
```env
NEXT_PUBLIC_API_URL=https://dev-api.vanacheckin.com
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
DATABASE_URL=postgresql://...
```

#### Staging
```env
NEXT_PUBLIC_API_URL=https://staging-api.vanacheckin.com
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
DATABASE_URL=postgresql://...
```

#### Production
```env
NEXT_PUBLIC_API_URL=https://api.vanacheckin.com
NEXT_PUBLIC_STRIPE_KEY=pk_live_...
DATABASE_URL=postgresql://...
```

### 3. Database Migration

```bash
# Create migration
npx prisma migrate dev --name <migration_name>

# Apply migration to staging
npx prisma migrate deploy --preview-feature

# Apply migration to production
npx prisma migrate deploy
```

### 4. Vercel Deployment

#### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to development
vercel

# Deploy to staging
vercel --prod -e staging

# Deploy to production
vercel --prod
```

#### Automated Deployment
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches:
      - main
      - staging
      - develop

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
```

### 5. Post-deployment Verification

#### Health Checks
```bash
# Check API health
curl https://api.vanacheckin.com/health

# Check database connection
npx prisma db pull

# Check environment variables
vercel env ls
```

#### Monitoring Setup
```bash
# Set up Sentry
npx @sentry/cli releases new $VERSION
npx @sentry/cli releases set-commits $VERSION --auto
npx @sentry/cli releases finalize $VERSION
```

## Infrastructure

### Vercel Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
```

### Database Configuration
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

### Cache Configuration
```typescript
// redis.config.ts
export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD
};
```

## Monitoring

### Sentry Setup
```typescript
// sentry.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Logging
```typescript
// logger.config.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## Backup and Recovery

### Database Backup
```bash
# Create backup
pg_dump -U postgres -d vanacheckin > backup.sql

# Restore backup
psql -U postgres -d vanacheckin < backup.sql
```

### File Storage Backup
```bash
# Backup to S3
aws s3 sync ./uploads s3://vanacheckin-backups/uploads

# Restore from S3
aws s3 sync s3://vanacheckin-backups/uploads ./uploads
```

## Security

### SSL Configuration
```nginx
server {
    listen 443 ssl;
    server_name vanacheckin.com;

    ssl_certificate /etc/letsencrypt/live/vanacheckin.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/vanacheckin.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
}
```

### Security Headers
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ];
  }
};
```

## Troubleshooting

### Common Issues

1. **Deployment Failures**
   ```bash
   # Check deployment logs
   vercel logs

   # Check build logs
   vercel build
   ```

2. **Database Issues**
   ```bash
   # Check database connection
   npx prisma db pull

   # Reset database
   npx prisma migrate reset
   ```

3. **Environment Issues**
   ```bash
   # List environment variables
   vercel env ls

   # Add environment variable
   vercel env add
   ```

### Rollback Procedure

```bash
# Revert to previous deployment
vercel rollback

# Revert database migration
npx prisma migrate reset
```

## Maintenance

### Regular Tasks

1. **Weekly**
   - Check error logs
   - Monitor performance
   - Update dependencies
   - Backup database

2. **Monthly**
   - Security audit
   - Performance optimization
   - Cost optimization
   - Documentation update

3. **Quarterly**
   - Infrastructure review
   - Security assessment
   - Performance review
   - Capacity planning 