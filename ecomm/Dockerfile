FROM node:18-bullseye-slim

WORKDIR /ecomm

# Install only essential dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn global add @medusajs/medusa-cli
RUN yarn install

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Create uploads directory
RUN mkdir -p uploads dist

EXPOSE 9000 7001

CMD ["yarn", "start"]