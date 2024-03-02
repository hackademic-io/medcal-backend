import { fetchAndPublishAppointments } from './jobs/fetchAndPublishAppointments';
import cron from 'node-cron';
import 'dotenv/config';

cron.schedule('0 17 * * *', fetchAndPublishAppointments);
