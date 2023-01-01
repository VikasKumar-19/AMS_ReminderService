const bodyParser = require("body-parser");
const express = require("express");
const { PORT } = require("./config/server-config");
const { apiRoutes } = require("./routes");

const setupAndStartServer = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
  });
};

setupAndStartServer();
