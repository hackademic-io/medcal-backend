import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { apiDocumentation } from "./docs/apidoc";

import adminRouter from "./router/adminRouter";
import patientRouter from "./router/patientRouter";

dotenv.config();

const app: Express = express();

const PORT =
  (process.env.APPOINTMENT_SERVICE_PORT &&
    parseInt(process.env.APPOINTMENT_SERVICE_PORT)) ||
  3001;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/", adminRouter);
app.use("/patient", patientRouter);
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
