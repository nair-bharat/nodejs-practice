const http = require("http");
const fs = require("fs");

//here it will look for global module named http, even if we have a file named http.js - it won't import that.

function rqListener(req, res) {
  //console.log(req.method, req.url, req.headers);
  //process.exit();
  // this is used to hard exit event loop and our program shuts down, we shouldn't do this as this will not allow people to reach the web page.

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
      console.log(chunk);
      // we can see the data which we entered in chunks (Node.js takes the data in the form of chunks)
      // here the text which we entered (and the key), as in the form of key value pair, message=the message which we wrote
      body.push(chunk);
    });

    // line no 34 is executed (end event listener) => once the incoming request data is done parsing., we can say here that Node.js is having some internal registries to these events.

    req.on("end", () => {
      //const parsedBody = Buffer.concat(body); //Join the array into one buffer object:
      const parsedBody = Buffer.concat(body).toString();
      //The concat() method joins all buffer objects in an array into one buffer object.
      //console.log(body); - in the form of array object.
      //console.log("parsed body", parsedBody);
      const message = parsedBody.split("=")[1];
      console.log(message);
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302; //check this code, we sent a request to message and we were redirected to localhost.
      res.setHeader("Location", "/");
      return res.end();
    });

    //fs.writeFileSync("message.txt", "Some Dummy Content into the file");

    /*
    pasting the below code to line 42 as it makes sense to put the below code below there as we should be setting header and status code after 
    we write the message to the file */

    /*

    res.statusCode = 302; //check this code, we sent a request to message and we were redirected to localhost.
    res.setHeader("Location", "/");
    return res.end();   */
  }

  res.setHeader("content-type", "text/html");
  res.write("<html>");
  res.write("<head><title>Second Page</title></head>");
  res.write("<body><h1>This is coming from the Node Server</h1></body>");
  res.write("</html>");
  res.end();
  //we have ended the response data which we want to send, after this we should not use res.write() as this will result in an error.

  // now after the program is run, as soon as the request is hit to the url, we get the response as the html code which we have written using the response object.

  //console.log(req.headers);
}

const server = http.createServer(rqListener);
// this line tells that look for this particular function 'rqListener' and execute it on every incoming request.

//if a request comes, line 9 is executed.

server.listen(1234);
// listen to port no 1234

//start a port - localhost:1234 - as soon as I hit the localhost:1234 - a request is sent to the server which we are listening to:

//as soon as I hit the url, then only we get the output as the result is sent after that only.

// there are headers like request headers and response headers - refer Module2 text file.

// so basically in this code, we are getting an error - Cannot set headers after they are sent to the client. Why ?

/*
because of, from line no 62 

it first runs that piece of code, then it will check the code event listener - end, we don't want to happen that but we have to make sure
that we are not blocking anything in the event loop, so therefore it makes sense to return the res.on(end) once it is done so that the 
code from line 62 is not executed.

refer app1.js

*/
