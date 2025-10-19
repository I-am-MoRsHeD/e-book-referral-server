
import dotenv from 'dotenv';

dotenv.config();

interface EnvVars {
    PORT: number;
    MONGO_URL: string;
    NODE_ENV: string;
    BCRYPT_SALT_ROUNDS: number;
};

const requiredEnvVariables = ['PORT', 'MONGO_URL', 'NODE_ENV', 'BCRYPT_SALT_ROUNDS'];

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
    };

};


export const envVars = loadEnvVariables();