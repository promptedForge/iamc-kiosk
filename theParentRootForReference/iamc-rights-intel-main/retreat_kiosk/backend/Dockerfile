FROM rust:1.81 as builder
WORKDIR /work
COPY . .
RUN cargo build --release -p api
FROM debian:stable-slim
WORKDIR /app
COPY --from=builder /work/target/release/api /usr/local/bin/iamc-sidecar
COPY examples ./examples
EXPOSE 8787
CMD ["iamc-sidecar","--mock","--examples","./examples","--addr","0.0.0.0:8787"]
