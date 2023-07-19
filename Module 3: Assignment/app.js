const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Greetings</title></head>");
    res.write("<body>");
    res.write("Hello, how are you ?");
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="username" placeholder="Enter the name of the user"></input><button>Add User</button></form>'
    );
    res.write("</body>");
    res.write("</html");
    return res.end();
  }

  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Users</title></head>");
    res.write("<body>");
    res.write("<ul><li>Bharat</li><li>Sam</li><li>Priya</li></ul>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split("=")[1];
      console.log(user);
      return res.end();
    });
  }
});

server.listen(3000);
