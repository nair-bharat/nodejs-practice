const http = require("http");
const routes = require("./routes");

// here we can't do routes.addProperty -> so basically the file is locked and we can't add / anything to the routes which we fetched.
// we can ignore .js here and just give ./routes instead of ./routes.js
// whatever is exported from routes.js is now stored in routes.

const server = http.createServer(routes.handler); //executing function stored in routes.
console.log(routes.someText);

server.listen(1234);
