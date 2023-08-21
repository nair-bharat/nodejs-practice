const express = require("express");
const app = express();

/*
app.use((req, res, next) => {
  res.send("<h1>This is the response Page</h1>");
  console.log("this is from first middleware function");
  next();
});

app.use((req, res, next) => {
  console.log("this is from second middleware function");
});
*/

app.use("/users", (req, res, next) => {
  res.send("<ul><li>Bharat</li><li>Priya</li></ul>");
});

app.use("/", (req, res, next) => {
  console.log('this is a middleware that handles "/"');
  res.send('<h2>This is from "/" Page</h2>');
});

// we should never have a next() inside a middleware whenever we are sending a response. (Cannot set headers after they are sent to the client)

app.listen(5001);
