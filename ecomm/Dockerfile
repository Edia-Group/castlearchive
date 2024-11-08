FROM node:latest

WORKDIR /ecomm

COPY . .

RUN apt-get update && apt-get install -y python3 python3-pip python-is-python3

RUN yarn global add @medusajs/medusa-cli

RUN yarn

RUN yarn build:prod

EXPOSE 9000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=2 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:9000/health || exit 1

# Start the service
CMD ["medusa", "start"]