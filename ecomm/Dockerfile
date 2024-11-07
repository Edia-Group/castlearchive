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

# Start the service
CMD ["yarn", "start"]