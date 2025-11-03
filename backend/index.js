const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const pdfServices = require("./routes/pdfServices.js");
const authServices = require("./routes/authServices.js");
const llmServices = require("./routes/llmServices.js");
const dealServices = require("./routes/dealServices.js");
const reportServices = require("./routes/reportServices.js");
const sourceServices = require("./routes/sourceServices.js");
const userServices = require("./routes/userServices.js");
const winston = require("winston");

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'X-User-Id', 'x-page-url']
}));
app.use(express.json());

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

app.use("/pdf", pdfServices);
app.use("/auth", authServices);
app.use("/llm", llmServices);
app.use("/report", reportServices);
app.use("/deal", dealServices);
app.use("/source", sourceServices);
app.use("/user", userServices);

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

if (!MONGODB_URI) {
  logger.error("❌ Fehlende MONGODB_URI in .env Datei");
  throw new Error("Fehlende MONGODB_URI in .env Datei");
}

mongoose
  .connect(MONGODB_URI)
  .then(() => logger.info("✅ MongoDB verbunden"))
  .catch((err) => logger.error("❌ MongoDB Fehler:", err));

app.listen(PORT, () => logger.info(`✅ Server läuft auf Port ${PORT}`));
