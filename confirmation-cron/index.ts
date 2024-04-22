import express, { Express } from "express";
import confirmationJob from "./services/confirmationJob";

require("dotenv").config();

const app: Express = express();

const PORT =
  (process.env.CONFIRMATION_CRON_PORT &&
    parseInt(process.env.CONFIRMATION_CRON_PORT)) ||
  3004;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});

confirmationJob();
