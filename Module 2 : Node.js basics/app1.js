const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>First Page: Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button>Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    // we add a return over here so as to not allow line 35 to execute.
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      //fs.writeFileSync("message.txt", message);
      /*
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();*/
      // writeFile -  is better practice / as we never want to block our code thus making it highly performant.
      fs.writeFile("message.txt", message, (err) => {
        // this will be executed once we are done writing our file. / event driven architecture in Node.js
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("content-type", "text/html");
  res.write("<html>");
  res.write("<head><title>Second Page</title></head>");
  res.write("<body><h1>This is coming from the Node Server</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
