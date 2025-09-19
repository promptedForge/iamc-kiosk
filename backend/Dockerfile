# Build stage
FROM rust:1.81 as builder
WORKDIR /work

# Copy workspace files
COPY Cargo.toml ./
COPY api/Cargo.toml ./api/
COPY engine/Cargo.toml ./engine/

# Create dummy source files to cache dependencies
RUN mkdir -p api/src engine/src && \
    echo "fn main() {}" > api/src/main.rs && \
    echo "pub fn lib() {}" > engine/src/lib.rs

# Build dependencies (this layer will be cached)
RUN cargo build --release -p api

# Now copy actual source code
COPY api/src ./api/src
COPY engine/src ./engine/src

# Touch the source files to ensure they're newer than the dummy files
RUN touch api/src/main.rs engine/src/lib.rs

# Build the actual application
RUN cargo build --release -p api

# Runtime stage
FROM debian:bookworm-slim
WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy the binary from builder
COPY --from=builder /work/target/release/api /usr/local/bin/iamc-sidecar

# Copy example files
COPY examples ./examples

EXPOSE 8787
CMD ["iamc-sidecar", "--mock", "--examples", "./examples", "--addr", "0.0.0.0:8787"]
