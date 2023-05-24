const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.json({
    appFlavor: process.env.APP_FLAVOR || "black",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
