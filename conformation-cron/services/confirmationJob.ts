import cron from "node-cron";

const confirmationJob = () => {
  cron.schedule("0 13 * * * *", async () => {
    console.log("cron ran");
    fetch("http://localhost:3001/notification/confirmation-cron", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
};

export default confirmationJob;
