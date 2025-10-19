import { Server } from 'http';
import mongoose from 'mongoose';
import { envVars } from './app/config/env';
import app from './app';


let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.MONGO_URL);
        console.log('Connected to DB...!');

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is running on port ${envVars.PORT}...!`);
        })
    } catch (error) {
        console.log(error);
    }
};

(async () => {
    await startServer();
})();


process.on('unhandledRejection', (err) => {
    console.log("Unhandled rejection is detected...Server is shutting down...!", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        })
    };
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.log("Uncaught expection is detected...Server is shutting down...!", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        })
    };
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log("SIGTERN signal is received...Server is shutting down...!");
    if (server) {
        server.close(() => {
            process.exit(1);
        })
    };
    process.exit(1);
});
