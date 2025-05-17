import dotenv from "dotenv";
dotenv.config();

export const env = {
    DATABASE_URL: process.env.DATABASE_URL as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    PORT: Number(process.env.PORT) || 3333,
    PORT_FRONTEND: Number(process.env.PORT_FRONTEND) || 3000,
    GMAIL_USER: process.env.GMAIL_USER as string,
    PASSWORD_GMAIL: process.env.PASSWORD_GMAIL as string,
}

