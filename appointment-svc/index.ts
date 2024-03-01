import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './router';

dotenv.config();

const app: Express = express();

const PORT =
  (process.env.APPOINTMENT_SERVICE_PORT &&
    parseInt(process.env.APPOINTMENT_SERVICE_PORT)) ||
  3000;

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/', router);

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
