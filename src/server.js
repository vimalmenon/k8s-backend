const express = require("express");
var cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());
app.get("/", (req, res) => {
  const d = new Date();
  res.json({
    appFlavor: process.env.APP_FLAVOR || "black",
    nodeName: process.env.NODE_NAME,
    podName: process.env.POD_NAME,
    podIp: process.env.POD_IP,
    date: d.toLocaleString()
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
