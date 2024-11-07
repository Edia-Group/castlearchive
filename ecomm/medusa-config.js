const dotenv = require("dotenv");

try {
  dotenv.config();
} catch (e) {}

// Force development-like settings even in production
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";
const DATABASE_URL = process.env.DATABASE_URL;

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
    resolve: "@medusajs/admin",
    options: {
      autoRebuild: false,
      develop: {
        open: false,
      },
    },
  }
];

// Force development-like module configuration
const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-local"
  },
  cacheService: {
    resolve: "@medusajs/cache-inmemory"
  }
};

// Development-like project configuration
const projectConfig = {
  jwt_secret: process.env.JWT_SECRET,
  cookie_secret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  admin_cors: ADMIN_CORS,
  database_type: "postgres",
  database_url: DATABASE_URL,
  database_extra: { 
    ssl: { 
      rejectUnauthorized: false 
    } 
  }
};

// Override process.env.NODE_ENV internally
process.env.NODE_ENV = 'development';

module.exports = {
  projectConfig,
  plugins,
  modules,
  featureFlags: {
    product_categories: true,
  },
};