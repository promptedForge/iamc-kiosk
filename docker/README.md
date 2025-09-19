# Docker Configuration

This directory contains the Docker setup for running the IAMC Human Rights Intelligence Platform in containerized environments.

## 🚀 Quick Start

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild after code changes
docker-compose build
docker-compose up -d
```

## 🏗️ Architecture

The Docker setup consists of two main services:

### 1. Backend Service (`sidecar`)
- **Image**: Multi-stage Rust build
- **Port**: 8787
- **Features**:
  - Optimized Rust compilation with cargo caching
  - Minimal runtime image (Debian slim)
  - Mock data included for demo

### 2. Frontend Service (`kiosk`)
- **Image**: Node.js Alpine
- **Port**: 5173
- **Features**:
  - Production build with Vite
  - Static file serving with `serve`
  - Environment variable injection

## 📁 File Structure

```
docker/
├── docker-compose.yml    # Orchestration configuration
├── .env.example         # Environment variables template
└── README.md           # This file

backend/
├── Dockerfile          # Multi-stage Rust build
└── .dockerignore      # Exclude unnecessary files

frontend/
├── Dockerfile          # Node.js build and serve
└── .dockerignore      # Exclude node_modules, etc.
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the docker directory:

```env
# Frontend configuration
VITE_API_URL=http://localhost:8787

# Backend configuration
RUST_LOG=info
API_ADDR=0.0.0.0:8787
```

### Docker Compose Services

```yaml
services:
  sidecar:
    build: ../backend
    ports: ["8787:8787"]
    environment:
      - RUST_LOG=info
    networks: [iamc-network]
    restart: unless-stopped

  kiosk:
    build: ../frontend
    ports: ["5173:5173"]
    environment:
      - VITE_API_URL=http://sidecar:8787
    depends_on: [sidecar]
    networks: [iamc-network]
    restart: unless-stopped
```

## 🚢 Building Images

### Development Build
```bash
# Build with no cache (fresh build)
docker-compose build --no-cache

# Build specific service
docker-compose build kiosk
```

### Production Build
```bash
# Build with BuildKit for better caching
DOCKER_BUILDKIT=1 docker-compose build

# Tag for registry
docker tag docker-kiosk:latest myregistry.com/iamc/kiosk:v1.0.0
docker tag docker-sidecar:latest myregistry.com/iamc/sidecar:v1.0.0
```

## 🔍 Debugging

### View Container Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f kiosk

# Last 100 lines
docker-compose logs --tail=100 sidecar
```

### Access Container Shell
```bash
# Frontend container
docker-compose exec kiosk sh

# Backend container
docker-compose exec sidecar bash

# Run commands inside container
docker-compose exec sidecar ls -la /app/examples
```

### Health Checks
```bash
# Check service status
docker-compose ps

# Test backend API
curl http://localhost:8787/ingest/status

# Test frontend
curl -I http://localhost:5173
```

## 🛠️ Common Issues

### Port Already in Use
```bash
# Find process using port
lsof -i :8787
lsof -i :5173

# Use different ports
API_PORT=8788 FRONTEND_PORT=5174 docker-compose up
```

### Build Cache Issues
```bash
# Clear Docker build cache
docker system prune --all

# Remove volumes
docker-compose down -v

# Fresh build
docker-compose build --no-cache
```

### Network Issues
```bash
# Recreate network
docker-compose down
docker network prune
docker-compose up -d
```

## 🚀 Performance Optimization

### Build Optimization
1. **Multi-stage builds** - Separate build and runtime
2. **Layer caching** - Order Dockerfile commands efficiently
3. **`.dockerignore`** - Exclude unnecessary files

### Runtime Optimization
1. **Alpine images** - Smaller base images
2. **Health checks** - Automatic container recovery
3. **Resource limits** - Prevent runaway containers

Example resource limits:
```yaml
services:
  kiosk:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

## 📊 Monitoring

### Basic Monitoring
```bash
# Resource usage
docker stats

# Disk usage
docker system df

# Container inspection
docker-compose exec sidecar top
```

### Log Aggregation
```yaml
# Add logging configuration
services:
  sidecar:
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
```

## 🔒 Security Considerations

### Best Practices
1. **Non-root user** - Run containers as non-root
2. **Read-only filesystem** - Where possible
3. **Secrets management** - Use Docker secrets
4. **Network isolation** - Custom networks

### Security Scanning
```bash
# Scan images for vulnerabilities
docker scan docker-kiosk
docker scan docker-sidecar

# Use Trivy for detailed scanning
trivy image docker-kiosk
```

## 🌐 Deployment Options

### Local Development
```bash
docker-compose up
```

### Production Single Host
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Kubernetes
Convert to Kubernetes manifests:
```bash
kompose convert -f docker-compose.yml
```

### Docker Swarm
```bash
docker stack deploy -c docker-compose.yml iamc-platform
```

## 📝 Maintenance

### Regular Tasks
- Update base images monthly
- Review and update dependencies
- Check for security vulnerabilities
- Monitor disk usage

### Backup Strategy
```bash
# Backup volumes
docker run --rm -v iamc_data:/data -v $(pwd):/backup alpine tar czf /backup/iamc-backup.tar.gz /data

# Restore volumes
docker run --rm -v iamc_data:/data -v $(pwd):/backup alpine tar xzf /backup/iamc-backup.tar.gz -C /
```

---

For more detailed information about each service, refer to:
- [Frontend Dockerfile](../frontend/Dockerfile)
- [Backend Dockerfile](../backend/Dockerfile)
- [Main Documentation](../README.md)