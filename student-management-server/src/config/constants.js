import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: `.env.${process.env.NODE_ENV}` });

export const CONSTANTS = {
  // Database
  MONGO_URI: process.env.MONGO_URI,
  // Common
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  /* JWT */
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES_SIGNIN: "30d",
  JWT_EXPIRES_RESET_PASS: "1d",
  JWT_TOKEN_LOGIN_EXPIRE: 86400000,

  ROLE_RESET_PASSWORD_TOKEN: ""
};
