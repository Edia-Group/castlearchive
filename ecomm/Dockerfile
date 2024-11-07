# Use a specific Node.js version for better stability
FROM node:18-bullseye

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python-is-python3 \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Copy package files first to leverage Docker cache
COPY package.json yarn.lock ./
COPY medusa-config.js ./

# Install Medusa CLI and project dependencies
RUN yarn global add @medusajs/medusa-cli
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Create necessary directories and set permissions
RUN mkdir -p uploads && \
    chown -R node:node /app

# Switch to non-root user
USER node

# Expose ports
EXPOSE 9000 7001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=2 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:9000/health || exit 1

# Make sure these directories exist
RUN mkdir -p dist uploads

# Start the service
CMD ["yarn", "start"]