import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { router } from './app/routes';
import notFound from './app/middleware/notFound';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
    res.send('E-Book Referral Server is running!!!');
});


app.use(globalErrorHandler);
app.use(notFound);

export default app;