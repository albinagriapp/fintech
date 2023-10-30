const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const path = require("path");

const logDirectory = "logs";
const logFilePath = path.join(logDirectory, "app.log");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: logFilePath }),
  ],
});

module.exports = { logger };
