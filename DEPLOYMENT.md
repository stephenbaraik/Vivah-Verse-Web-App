# Vivah-Verse Deployment Guide

This guide covers deploying the Vivah-Verse wedding planning application to production.

## Prerequisites

- Node.js 18+ 
- Docker & Docker Compose (optional)
- Git

## Environment Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd Vivah-Verse-Web-App

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure Environment Variables

Create `.env` files from the examples:

```bash
# Frontend environment
cp .env.example .env

# Backend environment
cp backend/.env.example backend/.env
```

#### Required Environment Variables

**Backend (`backend/.env`):**

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 5000) |
| `NODE_ENV` | No | Environment: development/production |
| `JWT_SECRET` | **Yes** | Secret key for JWT (min 32 chars) |
| `JWT_EXPIRES_IN` | No | Token expiration (default: 1h) |
| `GEMINI_API_KEY` | No | Google Gemini API key for AI features |
| `CORS_ORIGINS` | No | Comma-separated allowed origins |
| `DATA_DIR` | No | Data directory for JSON files |

**Frontend (`.env`):**

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | **Yes** | Backend API URL |
| `VITE_GEMINI_API_KEY` | No | Gemini API key for frontend AI features |

### 3. Generate JWT Secret

Generate a strong JWT secret for production:

```bash
# Linux/Mac
openssl rand -base64 64

# Or use this Node.js command
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Deployment Options

### Option 1: Docker Deployment (Recommended)

#### 1. Build and Run with Docker

```bash
# Build the Docker image
docker build -t vivah-verse .

# Run the container
docker run -p 80:80 -e JWT_SECRET=your-secret-key vivah-verse
```

#### 2. Using Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  vivah-verse:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    restart: unless-stopped
```

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Option 2: Manual Deployment

#### 1. Build Frontend

```bash
npm run build
```

#### 2. Start Backend

```bash
cd backend
NODE_ENV=production JWT_SECRET=your-secret-key npm start
```

#### 3. Configure Nginx (Optional)

For production, use nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Health Check

Verify the deployment is healthy:

```bash
curl http://localhost/health

# Expected response:
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "environment": "production"
}
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/auth/register` | POST | Register new user |
| `/api/auth/login` | POST | Login user |
| `/api/auth/logout` | POST | Logout user |
| `/api/auth/me` | GET | Get current user |
| `/api/gemini` | POST | AI wedding advice |
| `/api/process-payment` | POST | Process payment |
| `/api/protected` | GET | Protected route example |

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :80

# Kill the process
kill <PID>
```

### JWT Secret Warning

Ensure `JWT_SECRET` is set and at least 32 characters:

```bash
# Check if JWT_SECRET is set
echo $JWT_SECRET

# Set if not set
export JWT_SECRET="your-strong-secret-key"
```

### CORS Errors

Add your domain to `CORS_ORIGINS` in `backend/.env`:

```bash
CORS_ORIGINS=http://your-domain.com,https://your-domain.com
```

### Logs Not Showing

Check the environment variable `LOG_LEVEL`:

```bash
export LOG_LEVEL=debug
```

## Security Checklist

- [ ] Set strong `JWT_SECRET` (32+ characters)
- [ ] Enable HTTPS in production
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper `CORS_ORIGINS`
- [ ] Keep dependencies updated
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting
- [ ] Set up monitoring and alerts

## Performance Optimization

1. **Enable Gzip Compression** in nginx
2. **Use CDN** for static assets
3. **Configure caching** headers
4. **Monitor** with tools like PM2 process manager

## Backup and Recovery

The application uses JSON files for data storage. Back up the `backend/data` directory regularly:

```bash
# Create backup
tar -czf vivah-verse-backup-$(date +%Y%m%d).tar.gz backend/data

# Restore
tar -xzf vivah-verse-backup-20240101.tar.gz
```

## Support

For issues or questions, please open a GitHub issue.

