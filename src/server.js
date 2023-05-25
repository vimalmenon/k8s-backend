const express = require("express");
var cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());
app.get("/", (req, res) => {
  res.json({
    appFlavor: process.env.APP_FLAVOR || "black",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
