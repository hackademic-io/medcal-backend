import express, { Express } from "express";
import confirmationJob from "./services/confirmationJob";

require("dotenv").config();

const app: Express = express();

const PORT =
  (process.env.NOTIFICATION_SERVICE_PORT &&
    parseInt(process.env.NOTIFICATION_SERVICE_PORT)) ||
  3003;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});

confirmationJob();
