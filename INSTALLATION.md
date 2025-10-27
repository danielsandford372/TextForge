# TextForge Installation Guide

> Part of the **LabKit** tech stack

Complete installation instructions for TextForge API.

## Table of Contents

- [System Requirements](#system-requirements)
- [Installation Methods](#installation-methods)
  - [Local Development](#local-development)
  - [Docker Installation](#docker-installation)
  - [Production Deployment](#production-deployment)
- [Configuration](#configuration)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

## System Requirements

### Minimum Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (or yarn 1.22.0+)
- **Memory**: 512 MB RAM
- **Disk Space**: 200 MB free space

### Recommended Requirements

- **Node.js**: 20.x LTS
- **npm**: 10.x
- **Memory**: 1 GB RAM
- **Disk Space**: 500 MB free space

### For Docker Installation

- **Docker**: 20.10.0 or higher
- **Docker Compose**: 2.0.0 or higher (optional)

## Installation Methods

### Method 1: Local Development

#### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/TextForge.git
cd TextForge
```

#### Step 2: Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- Express.js and middleware
- TypeScript and type definitions
- Text processing libraries (slugify, franc, string-similarity, etc.)
- Testing framework (Jest, Supertest)
- Development tools

#### Step 3: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` file with your preferred settings:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# API Configuration
API_PREFIX=/api/v1

# CORS Configuration
CORS_ORIGIN=*
```

#### Step 4: Build the Project

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

#### Step 5: Start the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The API will be available at `http://localhost:3000`

---

### Method 2: Docker Installation

#### Option A: Using Docker

**Step 1: Build the Docker Image**

```bash
docker build -t textforge:1.0 .
```

**Step 2: Run the Container**

```bash
docker run -d \
  --name textforge-api \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  textforge:1.0
```

**Step 3: Verify Container is Running**

```bash
docker ps
docker logs textforge-api
```

#### Option B: Using Docker Compose

**Step 1: Start Services**

```bash
docker-compose up -d
```

**Step 2: View Logs**

```bash
docker-compose logs -f
```

**Step 3: Stop Services**

```bash
docker-compose down
```

---

### Method 3: Production Deployment

#### Using a Process Manager (PM2)

**Step 1: Install PM2 Globally**

```bash
npm install -g pm2
```

**Step 2: Build the Application**

```bash
npm install --production
npm run build
```

**Step 3: Start with PM2**

```bash
pm2 start dist/index.js --name textforge-api
```

**Step 4: Configure PM2 for Auto-Restart**

```bash
pm2 startup
pm2 save
```

**Step 5: Monitor the Application**

```bash
pm2 status
pm2 logs textforge-api
pm2 monit
```

#### Using systemd (Linux)

**Step 1: Create systemd Service File**

Create `/etc/systemd/system/textforge.service`:

```ini
[Unit]
Description=TextForge API Service
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/textforge
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/node dist/index.js
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**Step 2: Enable and Start Service**

```bash
sudo systemctl daemon-reload
sudo systemctl enable textforge
sudo systemctl start textforge
sudo systemctl status textforge
```

---

## Configuration

### Environment Variables

All configuration is done via environment variables in the `.env` file:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 3000 | No |
| `NODE_ENV` | Environment (development/production) | development | No |
| `API_PREFIX` | API route prefix | /api/v1 | No |
| `CORS_ORIGIN` | CORS allowed origins (* for all) | * | No |

### Production Configuration

For production environments, update your `.env` file:

```env
PORT=3000
NODE_ENV=production
API_PREFIX=/api/v1
CORS_ORIGIN=https://yourdomain.com
```

### Nginx Reverse Proxy (Optional)

If using Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Verification

### Test the Installation

**1. Check Health Endpoint**

```bash
curl http://localhost:3000/api/v1/health
```

Expected response:
```json
{
  "success": true,
  "message": "TextForge API is running",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

**2. Test a Simple Endpoint**

```bash
curl -X POST http://localhost:3000/api/v1/slugify \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World!"}'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "original": "Hello World!",
    "slug": "hello-world"
  }
}
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test

# Run tests in watch mode
npm run test:watch
```

All tests should pass.

---

## Troubleshooting

### Common Issues

#### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::3000`

**Solution**: Change the port in `.env` file or kill the process using port 3000:

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

#### Module Not Found Errors

**Error**: `Cannot find module 'express'`

**Solution**: Reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Build Errors

**Error**: TypeScript compilation errors

**Solution**: Ensure TypeScript is installed and clean build:

```bash
npm install -g typescript
rm -rf dist
npm run build
```

#### Docker Build Fails

**Error**: Docker build fails during npm install

**Solution**: Clear Docker cache and rebuild:

```bash
docker system prune -a
docker build --no-cache -t textforge:1.0 .
```

#### Permission Denied (Linux)

**Error**: `EACCES: permission denied`

**Solution**: Use correct permissions or run with appropriate user:

```bash
sudo chown -R $USER:$USER /path/to/textforge
```

### Getting Help

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/yourusername/TextForge/issues)
2. Review the [API Documentation](API_DOCUMENTATION.md)
3. Check application logs:
   - Local: Check terminal output
   - Docker: `docker logs textforge-api`
   - PM2: `pm2 logs textforge-api`
4. Open a new issue with:
   - Node.js version (`node --version`)
   - npm version (`npm --version`)
   - Operating system
   - Error messages
   - Steps to reproduce

---

## Next Steps

After successful installation:

1. Read the [Quick Start Guide](QUICKSTART.md)
2. Review the [API Documentation](API_DOCUMENTATION.md)
3. Check the [Deployment Guide](DEPLOYMENT.md) for production setup
4. Explore example use cases in the documentation

## Uninstallation

### Local Installation

```bash
# Stop the server (Ctrl+C if running)
# Remove the directory
cd ..
rm -rf TextForge
```

### Docker Installation

```bash
# Stop and remove container
docker stop textforge-api
docker rm textforge-api

# Remove image
docker rmi textforge:1.0
```

### PM2 Installation

```bash
# Stop and delete from PM2
pm2 stop textforge-api
pm2 delete textforge-api
pm2 save

# Remove files
rm -rf /path/to/textforge
```

---

**LabKit** | Building better tools for developers
