const http = require("http");
const rqhandler = require("./routes");

const server = http.createServer(rqhandler.handler);

server.listen(3000);
