# Monorepo Docker Configuration

This document describes the monorepo Docker setup that builds both frontend and backend services in a single container.

## 🎯 Overview

The monorepo Dockerfile creates a single Docker image containing:
- **Nginx** - Serves the React frontend and proxies API requests
- **Rust API** - Backend service running on internal port 8787
- **Supervisor** - Process manager to run both services

## 🚀 Quick Start

### Using the Build Script
```bash
# Build the monorepo image
./build-monorepo.sh

# Build with development tools
./build-monorepo.sh --dev

# Build and push to registry
./build-monorepo.sh --push myregistry.com --version 0.4.1
```

### Using Docker Directly
```bash
# Build the image
docker build -t iamc-platform:0.4.0 .

# Run the container
docker run -p 8080:80 iamc-platform:0.4.0

# Access the platform
open http://localhost:8080
```

### Using Docker Compose
```bash
# Start the platform
docker-compose -f docker-compose.monorepo.yml up

# Start with development profile
docker-compose -f docker-compose.monorepo.yml --profile development up

# Start with production profile (includes PostgreSQL and Redis)
docker-compose -f docker-compose.monorepo.yml --profile production up
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│           Docker Container              │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────┐    ┌───────────────┐  │
│  │   Nginx     │    │   Rust API    │  │
│  │   Port 80   │───▶│  Port 8787    │  │
│  └─────────────┘    └───────────────┘  │
│         │                    │          │
│         ▼                    ▼          │
│  ┌─────────────┐    ┌───────────────┐  │
│  │  React App  │    │  Mock Data    │  │
│  │  (Static)   │    │  Examples     │  │
│  └─────────────┘    └───────────────┘  │
│                                         │
│         Supervisor (Process Manager)     │
└─────────────────────────────────────────┘
```

## 📁 File Structure

```
/
├── Dockerfile              # Monorepo multi-stage build
├── .dockerignore          # Optimize build context
├── docker-compose.monorepo.yml  # Orchestration config
├── build-monorepo.sh      # Build automation script
└── MONOREPO.md           # This documentation
```

## 🔧 Configuration

### Environment Variables

```bash
# Logging
RUST_LOG=info|debug|trace

# Node environment
NODE_ENV=production|development

# API configuration
API_ADDR=127.0.0.1:8787
EXAMPLES_DIR=/app/examples
```

### Nginx Configuration

The Nginx server:
- Serves frontend from `/var/www/html`
- Proxies `/api/*` requests to the Rust backend
- Provides `/health` endpoint for container health checks
- Handles SPA routing with fallback to index.html

### Build Arguments

```dockerfile
ARG BUILD_DATE      # Build timestamp
ARG VCS_REF         # Git commit hash
ARG VERSION=0.4.0   # Application version
```

## 🚢 Deployment Options

### Single Container Deployment

```bash
# Run with default settings
docker run -d \
  --name iamc-platform \
  -p 80:80 \
  --restart unless-stopped \
  iamc-platform:0.4.0

# Run with custom environment
docker run -d \
  --name iamc-platform \
  -p 8080:80 \
  -e RUST_LOG=debug \
  -e NODE_ENV=development \
  iamc-platform:0.4.0
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: iamc-platform
spec:
  replicas: 3
  selector:
    matchLabels:
      app: iamc-platform
  template:
    metadata:
      labels:
        app: iamc-platform
    spec:
      containers:
      - name: iamc-platform
        image: iamc-platform:0.4.0
        ports:
        - containerPort: 80
        env:
        - name: RUST_LOG
          value: "info"
        livenessProbe:
          httpGet:
            path: /health
            port: 80
        readinessProbe:
          httpGet:
            path: /api/ingest/status
            port: 80
```

### Docker Swarm Deployment

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.monorepo.yml iamc

# Scale service
docker service scale iamc_iamc-platform=5
```

## 📊 Performance Optimization

### Build Optimization
1. **Multi-stage builds** - Separate build and runtime environments
2. **Layer caching** - Dependencies built before source code
3. **Minimal base image** - Debian slim for runtime

### Runtime Optimization
1. **Supervisor** - Efficient process management
2. **Static file serving** - Nginx for frontend assets
3. **Internal networking** - API on localhost

### Image Size Comparison
```
iamc-platform:0.4.0     380MB  (monorepo)
iamc-frontend:latest    140MB  (frontend only)
iamc-backend:latest     320MB  (backend only)
Combined separate:      460MB
Savings:                80MB (17%)
```

## 🔍 Troubleshooting

### Viewing Logs
```bash
# All logs
docker logs iamc-platform

# Follow logs
docker logs -f iamc-platform

# Specific service logs
docker exec iamc-platform supervisorctl tail -f api
docker exec iamc-platform supervisorctl tail -f nginx
```

### Debugging Inside Container
```bash
# Access shell
docker exec -it iamc-platform /bin/bash

# Check service status
docker exec iamc-platform supervisorctl status

# Restart a service
docker exec iamc-platform supervisorctl restart api

# Check Nginx config
docker exec iamc-platform nginx -t
```

### Common Issues

1. **Port conflicts**
   ```bash
   # Use different port
   docker run -p 8080:80 iamc-platform:0.4.0
   ```

2. **API connection errors**
   - Check if API is running: `supervisorctl status api`
   - Check Nginx proxy config
   - Verify internal port 8787 is correct

3. **Frontend not updating**
   - Clear browser cache
   - Verify build copied files correctly
   - Check Nginx is serving from `/var/www/html`

## 🔒 Security Considerations

1. **Non-root user** - API runs as `appuser`
2. **Minimal attack surface** - Only necessary packages installed
3. **Health checks** - Automatic container recovery
4. **Process isolation** - Supervisor manages processes

## 🎯 Benefits of Monorepo Approach

### Advantages
- **Single deployment unit** - Easier to manage
- **Consistent versioning** - Frontend and backend always in sync
- **Simplified networking** - No cross-container communication
- **Reduced overhead** - One container instead of two
- **Atomic updates** - Both services update together

### Trade-offs
- **Larger image size** - Contains both services
- **Less granular scaling** - Can't scale services independently
- **Longer build times** - Both services built together
- **Single point of failure** - One container for everything

## 📝 Best Practices

1. **Use build script** - Consistent builds with metadata
2. **Tag appropriately** - Semantic versioning
3. **Health checks** - Ensure both services are running
4. **Resource limits** - Prevent runaway containers
5. **Regular updates** - Keep base images current

---

The monorepo approach is ideal for:
- Small to medium deployments
- Development and testing environments
- Situations where simplicity is preferred
- Teams wanting unified deployment