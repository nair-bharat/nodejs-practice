const http = require("http");
const routes = require("./routes");

const server = http.createServer(routes.handler); //executing function stored in routes.
console.log(routes.someText);

server.listen(5001);
