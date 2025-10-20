
import dotenv from 'dotenv';

dotenv.config();

interface EnvVars {
    PORT: number;
    MONGO_URL: string;
    NODE_ENV: string;
    FRONTEND_URL: string;
    BCRYPT_SALT_ROUNDS: number;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES: string;
};

const requiredEnvVariables = ['PORT', 'MONGO_URL', 'NODE_ENV', 'BCRYPT_SALT_ROUNDS', 'JWT_ACCESS_SECRET', 'JWT_ACCESS_EXPIRES', 'JWT_REFRESH_SECRET', 'JWT_REFRESH_EXPIRES', 'FRONTEND_URL'];

const loadEnvVariables = (): EnvVars => {
    requiredEnvVariables.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`Missing environment variable: ${envVar}`);
        };
    });

    return {
        PORT: Number(process.env.PORT),
        MONGO_URL: process.env.MONGO_URL as string,
        NODE_ENV: process.env.NODE_ENV as string,
        BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS),
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
    };

};


export const envVars = loadEnvVariables();