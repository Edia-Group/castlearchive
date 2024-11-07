const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";
const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_API_KEY,
      webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    },
  },
  {
    resolve: "@medusajs/admin",
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
  {
    resolve: `medusa-plugin-sendgrid`,
    options: {
      api_key: process.env.SENDGRID_API_KEY,
      from: process.env.SENDGRID_FROM,
      order_placed_template: process.env.SENDGRID_ORDER_PLACED_ID,
    },
  },
];

// Simplified Redis configuration
const redisConfig = {
  url: process.env.REDIS_URL,
  options: {
    keyPrefix: "medusa:",
    retryStrategy: function(times) {
      return Math.min(times * 50, 2000);
    },
    maxRetriesPerRequest: 5
  }
};

// Modules configuration
const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: process.env.REDIS_URL,
      typePrefix: "medusa:events",
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: process.env.REDIS_URL,
      ttl: 30
    }
  }
};

// Base project config
const projectConfig = {
  jwt_secret: process.env.JWT_SECRET,
  cookie_secret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  admin_cors: ADMIN_CORS,
  database_url: DATABASE_URL,
  database_type: "postgres",
  database_extra: { 
    ssl: { 
      rejectUnauthorized: false 
    } 
  },
  redis_url: process.env.REDIS_URL
};

module.exports = {
  projectConfig,
  plugins,
  modules
};