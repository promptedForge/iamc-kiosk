# Monorepo Dockerfile for IAMC Human Rights Intelligence Platform
# This builds both frontend and backend services in a single image

# ==============================================================================
# Stage 1: Rust Backend Builder
# ==============================================================================
FROM rust:1.81 as backend-builder
WORKDIR /build

# Copy backend workspace files
COPY backend/Cargo.toml ./
COPY backend/api/Cargo.toml ./api/
COPY backend/engine/Cargo.toml ./engine/

# Create dummy source files to cache dependencies
RUN mkdir -p api/src engine/src && \
    echo "fn main() {}" > api/src/main.rs && \
    echo "pub fn lib() {}" > engine/src/lib.rs

# Build dependencies (this layer will be cached)
RUN cargo build --release -p api

# Copy actual source code
COPY backend/api/src ./api/src
COPY backend/engine/src ./engine/src

# Touch source files to ensure they're newer than dummy files
RUN touch api/src/main.rs engine/src/lib.rs

# Build the actual application
RUN cargo build --release -p api

# ==============================================================================
# Stage 2: Frontend Builder
# ==============================================================================
FROM node:20-alpine as frontend-builder
WORKDIR /build

# Copy package files
COPY frontend/package.json frontend/package-lock.json* ./

# Install dependencies
RUN npm ci || npm install

# Copy frontend source
COPY frontend/ ./

# Build the frontend
RUN npm run build

# ==============================================================================
# Stage 3: Production Runtime
# ==============================================================================
FROM debian:bookworm-slim as runtime
WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    supervisor \
    nginx \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -m -u 1000 -s /bin/bash appuser

# Copy backend binary
COPY --from=backend-builder /build/target/release/api /usr/local/bin/iamc-api

# Copy frontend build
COPY --from=frontend-builder /build/dist /var/www/html

# Copy example data for backend
COPY backend/examples /app/examples

# Configure Nginx
RUN rm /etc/nginx/sites-enabled/default
COPY <<EOF /etc/nginx/sites-available/iamc
server {
    listen 80;
    server_name _;
    
    # Frontend
    location / {
        root /var/www/html;
        try_files \$uri \$uri/ /index.html;
    }
    
    # API proxy
    location /api/ {
        proxy_pass http://127.0.0.1:8787/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\\n";
        add_header Content-Type text/plain;
    }
}
EOF
RUN ln -s /etc/nginx/sites-available/iamc /etc/nginx/sites-enabled/

# Configure Supervisor to run both services
COPY <<EOF /etc/supervisor/conf.d/iamc.conf
[supervisord]
nodaemon=true
user=root

[program:nginx]
command=/usr/sbin/nginx -g "daemon off;"
autostart=true
autorestart=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0

[program:api]
command=/usr/local/bin/iamc-api --mock --examples /app/examples --addr 127.0.0.1:8787
directory=/app
autostart=true
autorestart=true
user=appuser
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
environment=RUST_LOG="info"
EOF

# Set permissions
RUN chown -R appuser:appuser /app && \
    chmod +x /usr/local/bin/iamc-api

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost/health && curl -f http://localhost/api/ingest/status || exit 1

# Start supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]

# ==============================================================================
# Stage 4: Development Environment (optional)
# ==============================================================================
FROM runtime as development

# Install development tools
RUN apt-get update && apt-get install -y \
    vim \
    git \
    htop \
    net-tools \
    && rm -rf /var/lib/apt/lists/*

# Add development configurations
ENV RUST_LOG=debug
ENV NODE_ENV=development

# ==============================================================================
# Build arguments and labels
# ==============================================================================
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION=0.4.0

LABEL org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.name="IAMC Human Rights Intelligence Platform" \
      org.label-schema.description="Dual-track intelligence platform for human rights compliance monitoring" \
      org.label-schema.url="https://github.com/promptedForge/iamc-retreat-prototype-kiosk-v0.4" \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.vcs-url="https://github.com/promptedForge/iamc-retreat-prototype-kiosk-v0.4" \
      org.label-schema.vendor="IAMC" \
      org.label-schema.version=$VERSION \
      org.label-schema.schema-version="1.0"