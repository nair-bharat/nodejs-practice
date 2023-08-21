const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Greetings</title></head>");
    res.write("<body>");
    res.write("<h1>Hello, how are you ?</h1>");
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

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split("=")[1];
      console.log(user);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.end();
};

exports.handler = requestHandler;
