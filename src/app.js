const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5273"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

const healthRouter = require("./routes/healph.router");
app.use("/api/v1", healthRouter);

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/about", (req, res) => res.send("this is BaseCAmpAPp api"));

module.exports = app;
