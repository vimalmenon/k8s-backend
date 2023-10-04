import fetch from "node-fetch";
import express from "express";
import cors from "cors";
import fs from "fs";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const app = express();
const port = 4000;

app.use(cors());
app.get("/", (req, res) => {
  fs.appendFileSync("/logs/pod.txt", getLogsText("/"));
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
  fs.appendFileSync("/logs/pod.txt", getLogsText("/health"));
  res.json({
    result: "success",
  });
});

app.get("/crash", (req, res) => {
  fs.appendFileSync("/logs/pod.txt", getLogsText("/crash"));
  process.exit(1);
});

app.get("/pods", async (req, res) => {
  const { API_KEY } = process.env;
  try {
    const response = await fetch(
      `https://kubernetes.default.svc/api/v1/namespaces/local/pods`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    const json = await response.json();
    res.json({
      kubernetes: process.env.kubernetes,
      ...json,
    });
  } catch (error) {
    console.log(error);
    res.json({
      kubernetes: process.env.kubernetes,
      status: "error",
    });
  }
});

const getLogsText = (api) => {
  return `${getTimeStamp()} : API "${api}" is called \n`;
};

const getTimeStamp = () => {
  return new Date().toISOString();
};
setTimeout(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}, process.env.APP_DELAY || 0);
