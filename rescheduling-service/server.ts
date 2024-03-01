import express from 'express';
import cors from 'cors';
import routes from './src/routes';
import 'dotenv/config';
import { consumeAppointmentQueue } from './src/services/appointmentQueueConsumer';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

const PORT = 3002;

app.use('/', routes);

consumeAppointmentQueue();

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
