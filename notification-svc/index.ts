import express, { Express } from 'express';
import cors from 'cors';
import reschedulingPromptRoutes from './routes/rescheduling-prompt';
import confirmationJob from './services/confirmationJob';

require('dotenv').config();

const app: Express = express();

const PORT =
  (process.env.NOTIFICATION_SERVICE_PORT &&
    parseInt(process.env.NOTIFICATION_SERVICE_PORT)) ||
  3001;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});

confirmationJob();

app.use('/notification', reschedulingPromptRoutes);
