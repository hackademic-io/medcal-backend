import cron from "node-cron";
require("dotenv").config();

const confirmationJob = () => {
  cron.schedule("0 0 12 * * *", async () => {
    fetch(
      `${process.env.NOTIFICATION_BASE_URL}:${process.env.NOTIFICATION_SERVICE_PORT}/notification/confirmation-cron`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  });
};

export default confirmationJob;
