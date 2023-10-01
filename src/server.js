const express = require("express");
var cors = require("cors");
const fs = require('fs');

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

app.get("/health/", (req, res) => {
  res.json({
    result: "success",
  });
});

app.get("/crash", (req, res) => {
  fs.appendFileSync('/logs/pod.txt', `API crashed from ${process.env.NODE_NAME}\n`);
  process.exit(1);
});

setTimeout(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}, process.env.APP_DELAY || 0);
