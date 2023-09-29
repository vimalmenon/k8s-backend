const express = require("express");
var cors = require("cors");

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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
