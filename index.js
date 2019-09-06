const express = require("express");
const app = express();

// this will create route handler
app.get("/", (req, res) => {
  console.log(req);
  res.send({ Hi: "There" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
