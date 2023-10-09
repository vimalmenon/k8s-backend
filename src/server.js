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
  const {
    APP_FLAVOR,
    NODE_NAME,
    POD_NAME,
    POD_IP,
    NAMESPACE,
    NODE_IP,
    ...props
  } = process.env;
  res.json({
    appFlavor: APP_FLAVOR || "black",
    podIp: POD_IP,
    namespace: NAMESPACE,
    date: d.toLocaleString(),
    props,
  });
});

app.get("/health", (req, res) => {
  const { APP_FLAVOR } = process.env;
  const d = new Date();
  res.json({
    appFlavor: APP_FLAVOR || "black",
    date: d.toLocaleString(),
    result: "success",
  });
});

app.get("/make-call/:api_endpoint", async (req, res) => {
  try {
    console.log(req.params);
    const { APP_FLAVOR, POD_IP } = process.env;
    const { api_endpoint } = req.params;
    const d = new Date();
    const response = await (await fetch(`http://${api_endpoint}/`)).json();
    res.json({
      response,
      appFlavor: APP_FLAVOR || "black",
      date: d.toLocaleString(),
      result: "success",
      podIp: POD_IP,
    });
  } catch (error) {
    res.json({
      error,
      result: "failure",
    });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
