import cron from "node-cron";

const confirmationJob = () => {
  cron.schedule("0 12 * * *", async () => {
    fetch("http://localhost:3000/notification/confirmation-cron", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
};

export default confirmationJob;
