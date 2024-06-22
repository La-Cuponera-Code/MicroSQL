import { config } from "dotenv"; config();
export const PORT = process.env.PORT || 8080;
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const JWT_CLIENT_ID = process.env.JWT_CLIENT_ID;
export const JWT_CLIENT_SECRET = process.env.JWT_CLIENT_SECRET;
export const ENVIRONMENT = process.env.ENVIRONMENT
