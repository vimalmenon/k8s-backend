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
  const response = await fetch(
    "https://192.168.64.76:8443/api/v1/namespaces/local/pods",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlloMW1PUXpRenY3NjRObGF2U2U2S0ZQRXhPdWRsSU5LT1dvOHRhQV81TU0ifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiXSwiZXhwIjoxNjk2MzMyOTM3LCJpYXQiOjE2OTYzMjkzMzcsImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJsb2NhbCIsInNlcnZpY2VhY2NvdW50Ijp7Im5hbWUiOiJsb2NhbC1zZXJ2aWNlLWFjY291bnQiLCJ1aWQiOiI2OGM1NDE3OC0wZWZjLTRiYWMtOGI2Ny04YjY0YWU5OGM1ZWQifX0sIm5iZiI6MTY5NjMyOTMzNywic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmxvY2FsOmxvY2FsLXNlcnZpY2UtYWNjb3VudCJ9.AYDA5LW502cQyMHZX8hZGv3Sa6flOD8IsJRthvC5rBkY6sLl4Yf_q-LdcB1x-tMrsT6Mu46rey2mSPCfsNxYWBJGmUskj8ZGNVsgtqAgokQVQgAyT9YwuYWNv2DkQodOvfQHdqcA1OpGuip2POG7mBBmdXxNxjVn-cZo9VhLO3SKgqxhYnWhnmdWfrEZpw51TqGuqyhekuqNDDLDWzvLJEzsLDwkc9SE5w04WlvXpr4qSEhemDjXEH0GKXrtWpH2atlTSBnUEQBSNrvm6xseFYvgIXxj-Tu3oUZPHqW6kq-DYoP7Z2ONarfcspOxerwl7hWahLqlXfsMTXWRQHE3fQ",
      },
    }
  );
  const json = await response.json();
  res.json({
    ...json,
  });
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
