import { config } from "dotenv"; config();
export const PORT = process.env.PORT || 8080;
export const SECRET_PASS = process.env.SECRET_PASS;
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const JWT_CLIENT_ID = process.env.JWT_CLIENT_ID;
export const JWT_CLIENT_SECRET = process.env.JWT_CLIENT_SECRET;
export const ENVIRONMENT = process.env.ENVIRONMENT;
export const NODEMAILER_USER = process.env.NODEMAILER_USER;
export const NODEMAILER_PASS = process.env.NODEMAILER_PASS
export const EMAIL_USER = process.env.EMAIL_USER
export const EMAIL_PASS = process.env.EMAIL_PASS