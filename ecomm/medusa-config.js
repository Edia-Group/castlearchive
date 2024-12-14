const dotenv = require("dotenv");
try {
  dotenv.config();
} catch (e) {}

const ADMIN_CORS = process.env.ADMIN_CORS || "https://castlearchive.netlify.app";
const STORE_CORS = process.env.STORE_CORS || "https://coolify.carlsrl.it/antonioecommerce-storefront-test";
const DATABASE_URL = process.env.DATABASE_URL;
const REDIS_URL = process.env.REDIS_URL;

// Base plugins that are always needed
const basePlugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `medusa-file-s3`,
    options: {
        s3_url: process.env.S3_URL,
        bucket: process.env.S3_BUCKET,
        region: process.env.S3_REGION,
        access_key_id: process.env.S3_ACCESS_KEY_ID,
        secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
        cache_control: process.env.S3_CACHE_CONTROL,
        // optional
        download_file_duration:
          process.env.S3_DOWNLOAD_FILE_DURATION,
        prefix: process.env.S3_PREFIX,
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
    resolve: `medusa-plugin-sendgrid`,
    options: {
      api_key: process.env.SENDGRID_API_KEY,
      from: process.env.SENDGRID_FROM,
      order_placed_template: process.env.SENDGRID_ORDER_PLACED_ID,
      customer_created_template: process.env.SENDGRID_CUSTOMER_CREATED_ID
    },
    
  }
];

// Conditional plugins based on environment
const plugins = process.env.NODE_ENV === 'production' && process.env.DISABLE_MEDUSA_ADMIN === "true"
  ? basePlugins
  : [
    ...basePlugins,
    {
      resolve: "@medusajs/admin",
      options: {
        serve: true,
        path: "/",
        outDir: "build",
        autoRebuild: false,
        develop: {
          open: false,
        }
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

// Base project config
const baseProjectConfig = {
  jwt_secret: process.env.JWT_SECRET,
  cookie_secret: process.env.COOKIE_SECRET,
  database_type: "postgres",
  database_url: DATABASE_URL,
  database_extra: { 
    ssl: { 
      rejectUnauthorized: false 
    } 
  },
  store_cors: STORE_CORS,
  admin_cors: ADMIN_CORS,
  cookie_options: {
    secure: true,
    sameSite: "none",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
};

// Conditional project config
const projectConfig = process.env.NODE_ENV === 'production' && process.env.DISABLE_MEDUSA_ADMIN === "true"
  ? {
      ...baseProjectConfig,
      api: {
        port: 9000
      },
      security: {
        admin_auth_strategy: { 
          api_token: {
            enabled: false
          },
          cookie: {
            enabled: true
          }
        }
      }
    }
  : {
      ...baseProjectConfig,
      api: {
        port: 7001
      }
    };

if (REDIS_URL) {
  projectConfig.redis_url = REDIS_URL;
}

module.exports = {
  projectConfig,
  plugins,
  modules: getModules(),
  featureFlags: {
    product_categories: false,
  },
  admin: {
    path: "/",
    serve: !process.env.DISABLE_MEDUSA_ADMIN || process.env.DISABLE_MEDUSA_ADMIN === "false"
  },
  eventBus: {
    resolve: "@medusajs/event-bus-local",
  },

};