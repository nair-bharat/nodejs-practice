const http = require("http");
const express = require("express");

const app = express();

// handling different routes.

app.use("/", (req, res, next) => {
  console.log("This always runs!!");
  next();
});

app.use("/add-product", (req, res, next) => {
  res.send('<h1>In "Add-Product" Page!</h1>');
});

app.use("/", (req, res, next) => {
  res.send("<h1>Hello from Express</h1>");
});

app.listen(3000);
