FROM node:18-alpine

WORKDIR /ecomm

# Install system dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies with yarn
RUN yarn install --frozen-lockfile

# Copy application files
COPY . .

# Build the application
RUN yarn build

# Expose both backend and admin ports
EXPOSE 9000 7001

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:9000/health || exit 1

# Start the service
CMD ["yarn", "start"]