"use strict";

const DB_NAME = process.env.NODE_ENV === 'test'
    ? 'TEST_DB'
    : 'PROD_DB';

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === "/api" && req.method === "GET") {
        //response headers
        res.writeHead(200, { "Content-Type": "application/json" });
        //set the response
        res.write("Hi there, This is a Vanilla Node.js API");
        //end the response
        res.end();

    }else if(req.url === "/emailList" && req.method === "POST"){
        //end the response
        res.end();
    }else {
        //No route present
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


module.exports = {
    DB_NAME,
    server
}