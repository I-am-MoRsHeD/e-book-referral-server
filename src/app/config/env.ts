
import dotenv from 'dotenv';

dotenv.config();

interface EnvVars {
    PORT: number;
    MONGO_URL: string;
    NODE_ENV: string;
};

const requiredEnvVariables = ['PORT', 'MONGO_URL', 'NODE_ENV'];

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
    };

};


export const envVars = loadEnvVariables();