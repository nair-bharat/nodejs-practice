const fs = require("fs");
// file system functionality /  module, file system object

//console.log(fs); //this displays all the functions present in the file system object.

fs.writeFileSync("hello.txt", "hello from node.js");
// this will write into a file hello.txt, the text which we have entered.

fs.writeFileSync("hello.txt", "hello again from node.js");
// if we again run this, the file is overwritten with the text which we entered now.
