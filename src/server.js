import fetch from "node-fetch";
import express from "express";
import cors from "cors";
import fs from "fs";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const app = express();
const port = 4000;

app.use(cors());
app.get("/", (req, res) => {
  const d = new Date();
  const { POD_IP, APP_NAME, APP_API } = process.env;
  res.json({
    APP_NAME,
    POD_IP,
    APP_API,
    date: d.toLocaleString(),
  });
});

app.get("/health", (req, res) => {
  const { APP_NAME } = process.env;
  const d = new Date();
  res.json({
    APP_NAME,
    date: d.toLocaleString(),
    result: "success",
  });
});

app.get("/make-call", async (req, res) => {
  const { POD_IP, APP_NAME, APP_API } = process.env;
  try {
    const d = new Date();
    console.log(APP_API, POD_IP);
    const response = await (await fetch(`http://${APP_API}:4000/`)).json();
    res.json({
      response,
      POD_IP,
      APP_NAME,
      APP_API,
      date: d.toLocaleString(),
      result: "success",
    });
  } catch (error) {
    res.json({
      POD_IP,
      APP_NAME,
      error,
      result: "failure",
    });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
