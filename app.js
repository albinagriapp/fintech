const express = require("express");
const { logger } = require("./winston");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
const routes = require("./src/routes/index.routes");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("API Documentation");
});

app.get("/health-check", (req, res) => {
  res.send("Server is running...");
});

app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  logger.info(`App listening on port ${port}`);
});
