const express = require("express");

const app = express();

const route = app.get("/", (req, res) => {
  res.send("The Server is up and running");
});

module.exports = route;
