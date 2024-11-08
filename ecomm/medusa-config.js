const dotenv = require("dotenv");

try {
  dotenv.config();
} catch (e) {}

const ADMIN_CORS = process.env.ADMIN_CORS || "https://coolify.carlsrl.it,https://coolify.carlsrl.it/antonioecommerce";
const STORE_CORS = process.env.STORE_CORS || "https://coolify.carlsrl.it,https://coolify.carlsrl.it/antonioecommerce";
const DATABASE_URL = process.env.DATABASE_URL;
const REDIS_URL = process.env.REDIS_URL;

process.env.NODE_ENV = 'development';

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "/ecomm/uploads",
    },
  },
  {
    resolve: "@medusajs/admin",
    options: {
      autoRebuild: false,        // Set to false since we pre-built it in a Dockerfile step
      serve: true,
      path: "/antonioecommerce",  // Match your Coolify subdirectory
      publicUrl: "/antonioecommerce", // Match your Coolify subdirectory
      outDir: "dist/admin",
      backend: {
        loadConfig: true,
        cors: process.env.ADMIN_CORS
      }
    }
  },
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_API_KEY,
      webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    },
  },
  {
    resolve: `medusa-plugin-sendgrid`,
    options: {
      api_key: process.env.SENDGRID_API_KEY,
      from: "giannnlaa@gmail.com",
      order_placed_template: "d-e69e46b356e7493c8dd7d0b692828f38",
    },
  }
];

const getModules = () => {
  if (REDIS_URL) {
    return {
      eventBus: {
        resolve: "@medusajs/event-bus-redis",
        options: {
          redisUrl: REDIS_URL,
          options: {
            tls: false,
            maxRetriesPerRequest: 3,
            retryStrategy: function(times) {
              return Math.min(times * 50, 2000);
            }
          }
        }
      },
      cacheService: {
        resolve: "@medusajs/cache-redis",
        options: {
          redisUrl: REDIS_URL,
          ttl: 30
        }
      }
    };
  }
  
  return {
    eventBus: {
      resolve: "@medusajs/event-bus-local"
    },
    cacheService: {
      resolve: "@medusajs/cache-inmemory"
    }
  };
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
};

if (REDIS_URL) {
  projectConfig.redis_url = REDIS_URL;
}

module.exports = {
  projectConfig,
  plugins,
  modules: getModules(),
  featureFlags: {
    product_categories: true,
  },
};