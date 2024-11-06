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
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const isDev = process.env.NODE_ENV === 'development'; 
const isTestingEmails = process.env.TEST_EMAILS === 'true'; 

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
    /** @type {import('@medusajs/admin').PluginOptions} */
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
      from: "giannnlaa@gmail.com",
      order_placed_template: "d-e69e46b356e7493c8dd7d0b692828f38",
    },
  },
];

// Redis configuration based on environment
const getRedisConfig = () => {
  if (isDev && !isTestingEmails) {
    return null; // No Redis config in normal development
  }
  
  if (isDev && isTestingEmails) {
    // Use Upstash for local email testing
    return {
      url: process.env.UPSTASH_REDIS_URL,
      options: {
        tls: true,
        keyPrefix: "medusa:",
        username: 'default',
        rejectUnauthorized: false
      }
    };
  }
  
  // Production configuration. Internal URL pointing to redis container hosted on the same server as this backend
  return {
    url: process.env.REDIS_URL,
    options: {
      tls: false,
      keyPrefix: "medusa:",
      maxRetriesPerRequest: 3,
      retryStrategy: function(times) {
        return Math.min(times * 50, 2000);
      },
      reconnectOnError: function(err) {
        return true;
      },
      enableReadyCheck: false,
      keepAlive: 10000,
      connectTimeout: 20000,
      autoResubscribe: true,
      autoResendUnfulfilledCommands: true
    }
  };
};

const redisConfig = getRedisConfig();

// Event bus configuration based on environment
const getEventBusConfig = () => {
  if (isDev && !isTestingEmails) {
    return {
      resolve: "@medusajs/event-bus-local"
    };
  }
  
  return {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: redisConfig.url,
      ...redisConfig.options
    }
  };
};



const modules = {
  eventBus: getEventBusConfig(),
  cacheService: {
    resolve: "@medusajs/cache-inmemory"
  }
};

// Base project config
const baseProjectConfig = {
  jwt_secret: process.env.JWT_SECRET,
  cookie_secret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  database_type: "postgres",
  database_extra: { 
    ssl: { 
      rejectUnauthorized: false 
    } 
  }
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = redisConfig ? {
      ...baseProjectConfig,
      redis_url: redisConfig.url,
      redis_options: redisConfig.options
    } : baseProjectConfig;


/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules
};