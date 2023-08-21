const http = require("http");
const express = require("express");
//express module exports a function

//console.log(express);

const app = express();

// express framework will manage and store a lot of things behind the scenes.

//console.log(app);

app.use((req, res, next) => {
  console.log("In the middleware!");
  next(); // call next to travel on to the next middleware., (allows the request to continue to the next middleware in line.)
  // we should call next if we want to go to the next function.
});

app.use((req, res, next) => {
  console.log("In another middleware!");
  res.send("<h1>Hello from Express</h1>"); // we get this response.
  // in the network tab, response headers, the Content-type is set to text/html.

  //https://github.com/expressjs/express/blob/master/lib/response.js - res.send = function() -> to see the internal implementation
});

app.listen(3000);

// https://github.com/expressjs/express/blob/master/lib/application.js - see the implementation of listen method, we can see taht the below lines are there over there.
//const server = http.createServer(app);

// app is a valid requesthandler, so we can pass in createServer., but this will not do anything out here for now.

//server.listen(3000);
