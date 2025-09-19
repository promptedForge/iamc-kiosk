#!/bin/bash

# Build script for IAMC monorepo Docker image

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="iamc-platform"
VERSION=${VERSION:-"0.4.0"}
REGISTRY=${REGISTRY:-""}

# Get build metadata
BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
VCS_REF=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")

echo -e "${GREEN}Building IAMC Human Rights Intelligence Platform${NC}"
echo -e "Version: ${VERSION}"
echo -e "Commit: ${VCS_REF}"
echo -e "Date: ${BUILD_DATE}\n"

# Function to build image
build_image() {
    local target=$1
    local tag_suffix=$2
    local tag="${IMAGE_NAME}:${VERSION}${tag_suffix}"
    
    echo -e "${YELLOW}Building ${target} image...${NC}"
    
    docker build \
        --target "$target" \
        --build-arg BUILD_DATE="$BUILD_DATE" \
        --build-arg VCS_REF="$VCS_REF" \
        --build-arg VERSION="$VERSION" \
        -t "$tag" \
        -f Dockerfile \
        .
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Successfully built ${tag}${NC}"
        
        # Tag as latest if this is the runtime build
        if [ "$target" == "runtime" ]; then
            docker tag "$tag" "${IMAGE_NAME}:latest"
            echo -e "${GREEN}✓ Tagged as ${IMAGE_NAME}:latest${NC}"
        fi
        
        # Push to registry if specified
        if [ -n "$REGISTRY" ]; then
            local full_tag="${REGISTRY}/${tag}"
            docker tag "$tag" "$full_tag"
            echo -e "${YELLOW}Pushing to ${full_tag}...${NC}"
            docker push "$full_tag"
            echo -e "${GREEN}✓ Pushed to registry${NC}"
        fi
    else
        echo -e "${RED}✗ Failed to build ${tag}${NC}"
        exit 1
    fi
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --dev|--development)
            BUILD_DEV=true
            shift
            ;;
        --push)
            if [ -z "$2" ] || [[ $2 == --* ]]; then
                echo -e "${RED}Error: --push requires a registry URL${NC}"
                exit 1
            fi
            REGISTRY=$2
            shift 2
            ;;
        --version)
            VERSION=$2
            shift 2
            ;;
        --help|-h)
            echo "Usage: $0 [options]"
            echo "Options:"
            echo "  --dev, --development    Build development image"
            echo "  --push <registry>       Push to Docker registry"
            echo "  --version <version>     Set version (default: 0.4.0)"
            echo "  --help, -h              Show this help"
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            exit 1
            ;;
    esac
done

# Build runtime image
build_image "runtime" ""

# Build development image if requested
if [ "$BUILD_DEV" = true ]; then
    build_image "development" "-dev"
fi

# Print summary
echo -e "\n${GREEN}Build Summary:${NC}"
docker images | grep "$IMAGE_NAME" | head -5

# Print run instructions
echo -e "\n${GREEN}To run the platform:${NC}"
echo -e "  ${YELLOW}docker run -p 8080:80 ${IMAGE_NAME}:${VERSION}${NC}"
echo -e "\n${GREEN}To use docker-compose:${NC}"
echo -e "  ${YELLOW}docker-compose -f docker-compose.monorepo.yml up${NC}"
echo -e "\n${GREEN}Access the platform at:${NC}"
echo -e "  ${YELLOW}http://localhost:8080${NC}"