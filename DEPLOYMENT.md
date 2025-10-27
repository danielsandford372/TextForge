# TextForge Deployment Guide

> Part of the **LabKit** tech stack

Production deployment guide for TextForge API.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Deployment Options](#deployment-options)
  - [Docker Deployment](#docker-deployment)
  - [Cloud Platform Deployment](#cloud-platform-deployment)
  - [Traditional Server Deployment](#traditional-server-deployment)
- [Configuration](#configuration)
- [Security Best Practices](#security-best-practices)
- [Monitoring and Logging](#monitoring-and-logging)
- [Scaling](#scaling)
- [Backup and Recovery](#backup-and-recovery)

---

## Pre-Deployment Checklist

Before deploying to production:

- [ ] All tests pass (`npm test`)
- [ ] Environment variables configured
- [ ] Security headers enabled
- [ ] CORS configured for your domain
- [ ] Logging configured
- [ ] SSL/TLS certificates ready
- [ ] Domain name configured
- [ ] Monitoring tools setup
- [ ] Backup strategy defined

---

## Deployment Options

### Docker Deployment

#### Docker Hub (Recommended)

**Step 1: Build and Tag Image**

```bash
docker build -t textforge:1.0 .
docker tag textforge:1.0 yourdockerhub/textforge:1.0
docker tag textforge:1.0 yourdockerhub/textforge:latest
```

**Step 2: Push to Docker Hub**

```bash
docker login
docker push yourdockerhub/textforge:1.0
docker push yourdockerhub/textforge:latest
```

**Step 3: Deploy on Target Server**

```bash
docker pull yourdockerhub/textforge:1.0
docker run -d \
  --name textforge-api \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e CORS_ORIGIN=https://yourdomain.com \
  yourdockerhub/textforge:1.0
```

#### Docker Compose Production Setup

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  textforge:
    image: textforge:1.0
    container_name: textforge-api
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - API_PREFIX=/api/v1
      - CORS_ORIGIN=https://yourdomain.com
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/api/v1/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    networks:
      - textforge-network

networks:
  textforge-network:
    driver: bridge
```

Deploy:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

### Cloud Platform Deployment

#### AWS (Elastic Beanstalk)

**Step 1: Install EB CLI**

```bash
pip install awsebcli
```

**Step 2: Initialize EB Application**

```bash
eb init textforge-api --platform node.js --region us-east-1
```

**Step 3: Create Environment**

```bash
eb create textforge-production \
  --instance-type t3.small \
  --envvars NODE_ENV=production,PORT=8080
```

**Step 4: Deploy**

```bash
eb deploy
```

**Step 5: Configure Environment Variables**

```bash
eb setenv \
  NODE_ENV=production \
  API_PREFIX=/api/v1 \
  CORS_ORIGIN=https://yourdomain.com
```

#### AWS (ECS/Fargate)

Create task definition `textforge-task.json`:

```json
{
  "family": "textforge-api",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "textforge",
      "image": "yourdockerhub/textforge:1.0",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {"name": "NODE_ENV", "value": "production"},
        {"name": "PORT", "value": "3000"}
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/textforge",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

Deploy:

```bash
aws ecs register-task-definition --cli-input-json file://textforge-task.json
aws ecs create-service \
  --cluster your-cluster \
  --service-name textforge-api \
  --task-definition textforge-api \
  --desired-count 2 \
  --launch-type FARGATE
```

#### Google Cloud (Cloud Run)

**Step 1: Build and Push to GCR**

```bash
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/textforge

# Or build locally
docker build -t gcr.io/YOUR_PROJECT_ID/textforge:1.0 .
docker push gcr.io/YOUR_PROJECT_ID/textforge:1.0
```

**Step 2: Deploy to Cloud Run**

```bash
gcloud run deploy textforge-api \
  --image gcr.io/YOUR_PROJECT_ID/textforge:1.0 \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,API_PREFIX=/api/v1
```

#### Heroku

**Step 1: Create Heroku App**

```bash
heroku create textforge-api
```

**Step 2: Set Environment Variables**

```bash
heroku config:set \
  NODE_ENV=production \
  API_PREFIX=/api/v1
```

**Step 3: Deploy**

```bash
git push heroku main
```

**Step 4: Scale**

```bash
heroku ps:scale web=1
```

#### DigitalOcean App Platform

Create `app.yaml`:

```yaml
name: textforge-api
services:
  - name: api
    github:
      repo: yourusername/TextForge
      branch: main
    build_command: npm run build
    run_command: npm start
    environment_slug: node-js
    instance_size_slug: basic-xxs
    instance_count: 1
    http_port: 3000
    envs:
      - key: NODE_ENV
        value: production
      - key: API_PREFIX
        value: /api/v1
    health_check:
      http_path: /api/v1/health
```

Deploy:

```bash
doctl apps create --spec app.yaml
```

---

### Traditional Server Deployment

#### Ubuntu/Debian Server with PM2

**Step 1: Setup Node.js**

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2
```

**Step 2: Clone and Build**

```bash
cd /opt
sudo git clone https://github.com/yourusername/TextForge.git
cd TextForge
sudo npm install --production
sudo npm run build
```

**Step 3: Configure Environment**

```bash
sudo nano .env
```

Add production settings:
```env
NODE_ENV=production
PORT=3000
API_PREFIX=/api/v1
CORS_ORIGIN=https://yourdomain.com
```

**Step 4: Start with PM2**

```bash
pm2 start dist/index.js --name textforge-api
pm2 startup systemd
pm2 save
```

**Step 5: Configure Nginx**

```bash
sudo nano /etc/nginx/sites-available/textforge
```

Add configuration:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

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

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

Enable and restart:

```bash
sudo ln -s /etc/nginx/sites-available/textforge /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**Step 6: Setup SSL with Let's Encrypt**

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

---

## Configuration

### Production Environment Variables

```env
# Server
NODE_ENV=production
PORT=3000

# API
API_PREFIX=/api/v1

# Security
CORS_ORIGIN=https://yourdomain.com,https://app.yourdomain.com
```

### Environment-Specific Configuration

Create different `.env` files:

- `.env.development` - Local development
- `.env.staging` - Staging environment
- `.env.production` - Production environment

Load based on `NODE_ENV`:

```javascript
// In config/index.ts
import dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });
```

---

## Security Best Practices

### 1. HTTPS Only

Always use HTTPS in production:

```javascript
// Add to app.ts for HTTPS redirect
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

### 2. Rate Limiting

Install and configure rate limiting:

```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

### 3. Environment Variables

Never commit `.env` files. Use secret managers:

- AWS Secrets Manager
- Google Cloud Secret Manager
- Azure Key Vault
- HashiCorp Vault

### 4. Security Headers

Already configured via Helmet middleware. Verify:

```bash
curl -I https://api.yourdomain.com/api/v1/health
```

### 5. Input Validation

All endpoints have validation middleware enabled.

---

## Monitoring and Logging

### PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# View logs
pm2 logs textforge-api

# Status
pm2 status
```

### Application Logging

Add structured logging:

```bash
npm install winston
```

Configure in `src/config/logger.ts`:

```typescript
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

### Cloud Monitoring

- **AWS CloudWatch**: Automatic with ECS/EB
- **Google Cloud Logging**: Automatic with Cloud Run
- **Datadog**: Full APM solution
- **New Relic**: Application monitoring

---

## Scaling

### Horizontal Scaling

#### Docker Swarm

```bash
docker swarm init
docker service create \
  --name textforge-api \
  --replicas 3 \
  --publish 3000:3000 \
  textforge:1.0
```

#### Kubernetes

Create `k8s/deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: textforge-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: textforge
  template:
    metadata:
      labels:
        app: textforge
    spec:
      containers:
      - name: textforge
        image: textforge:1.0
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
---
apiVersion: v1
kind: Service
metadata:
  name: textforge-service
spec:
  selector:
    app: textforge
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

Deploy:

```bash
kubectl apply -f k8s/deployment.yaml
```

### Vertical Scaling

Increase resources based on platform:

- **Docker**: Increase `--memory` and `--cpus`
- **AWS**: Change instance type
- **GCP**: Adjust Cloud Run instance size
- **K8s**: Update resource limits

---

## Backup and Recovery

### Backup Strategy

1. **Code**: Use Git tags for releases
2. **Configuration**: Store in version control
3. **Logs**: Rotate and archive regularly

### Disaster Recovery

**Step 1: Document Current State**

```bash
# Save PM2 configuration
pm2 save

# Export Docker configuration
docker inspect textforge-api > textforge-backup.json
```

**Step 2: Create Recovery Script**

```bash
#!/bin/bash
# recovery.sh

cd /opt/TextForge
git pull origin main
npm install --production
npm run build
pm2 restart textforge-api
```

**Step 3: Test Recovery Procedure**

Regularly test your recovery process in staging.

---

## Health Checks

Configure health checks for load balancers:

- **Endpoint**: `GET /api/v1/health`
- **Expected Status**: 200
- **Interval**: 30 seconds
- **Timeout**: 5 seconds
- **Healthy Threshold**: 2
- **Unhealthy Threshold**: 3

---

## Performance Optimization

### 1. Enable Compression

Already handled by reverse proxy (Nginx), or add to Express:

```bash
npm install compression
```

### 2. Caching

Add caching headers for static responses.

### 3. Database Connection Pooling

If adding database support in the future.

---

## Troubleshooting Production Issues

### High Memory Usage

```bash
# Check memory
pm2 status
docker stats textforge-api

# Restart if needed
pm2 restart textforge-api
docker restart textforge-api
```

### High CPU Usage

Check for infinite loops or inefficient code:

```bash
# PM2 CPU profiling
pm2 profile textforge-api
```

### Request Timeouts

Increase timeout in Nginx or load balancer configuration.

---

## Post-Deployment Checklist

- [ ] Health check endpoint responding
- [ ] SSL certificate valid
- [ ] CORS configured correctly
- [ ] Monitoring dashboards setup
- [ ] Logs being collected
- [ ] Backups configured
- [ ] Auto-scaling configured (if applicable)
- [ ] Documentation updated
- [ ] Team notified
- [ ] Performance baseline established

---

**LabKit** | Building better tools for developers
