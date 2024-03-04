import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

import adminRouter from "./router/adminRouter";
import patientRouter from "./router/patientRouter";

dotenv.config();

const app: Express = express();

const PORT =
  (process.env.APPOINTMENT_SERVICE_PORT &&
    parseInt(process.env.APPOINTMENT_SERVICE_PORT)) ||
  3000;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/", adminRouter);
app.use("/patient", patientRouter);

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
