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

// Minimal required plugins
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: "@medusajs/admin",
    options: {
      autoRebuild: false,  // Changed this to false for production
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  }
];

// Basic module configuration
const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-local"
  },
  cacheService: {
    resolve: "@medusajs/cache-inmemory"
  }
};

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
  },
  load_plugins: true,  // Added this explicitly
  // These two settings might help with the plugin loading issue
  register_plugins: true,
  plugins_require_resolve: true
};

module.exports = {
  projectConfig,
  plugins,
  modules
};