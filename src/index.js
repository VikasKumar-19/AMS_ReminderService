const bodyParser = require("body-parser");
const express = require("express");
const { PORT, REMINDER_BINDING_KEY } = require("./config/server-config");
const { apiRoutes } = require("./routes");
const jobs = require("./utils/job");
const { subscribeMessage, createChannel } = require("./utils/messageQueue");
const EmailService = require("./services/email-service");

const setupAndStartServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const channel = await createChannel();
  subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
    jobs();
  });
};

setupAndStartServer();
