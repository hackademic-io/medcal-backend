import { fetchAndPublishAppointments } from "./jobs/fetchAndPublishAppointments";
import cron from "node-cron";

// cron.schedule("0 17 * * *", fetchAndPublishAppointments);
fetchAndPublishAppointments();
