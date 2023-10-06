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
  const { APP_FLAVOR, NODE_NAME, POD_NAME, POD_IP, NAMESPACE, ...props } =
    process.env;
  res.json({
    appFlavor: APP_FLAVOR || "black",
    nodeName: NODE_NAME,
    podName: POD_NAME,
    podIp: POD_IP,
    namespace: NAMESPACE,
    date: d.toLocaleString(),
    ...props,
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

app.get("/stress", (req, res) => {
  const { APP_FLAVOR } = process.env;
  const d = new Date();
  for (let i = 0; i < 7000000; i++) {
    console.log(`Printing index ${i} from pod ${APP_FLAVOR} \n`)
  }
  res.json({
    appFlavor: APP_FLAVOR || "black",
    date: d.toLocaleString(),
    result: "success",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
