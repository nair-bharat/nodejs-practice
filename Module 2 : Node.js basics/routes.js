const fs = require("fs"); //importing

const requestHandler = (req, res) => {
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

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
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
};

//module.exports = requestHandler; // 1st way to export the module in Node.js, exports property in module., this is a global object.

// exports = requestHandler;

/* module.exports = {
  handler: requestHandler,
  someText: "Some hard coded text",
};
 */

module.exports.handler = requestHandler;
module.exports.someText = "Some hard coded text 2";

// we can ignore the module object and just have exports.handler and so on.

/*

Note- 

The res.end() function is used to end the response process. This method actually comes from the Node core, specifically the response.end() method of HTTP.ServerResponse. Use to quickly end the response without any data.

*/
