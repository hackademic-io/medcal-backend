import express from "express";
import cors from "cors";
import { consumeAppointmentQueue } from "./src/services/appointmentQueueConsumer";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

const PORT = 3002;

consumeAppointmentQueue();

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
