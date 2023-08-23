const http = require('http');
const routeHandlers = require('./routes/routeHandlers');

function createServer(){
    const server = http.createServer((req, res) => {
        const handler = routeHandlers[req.url] || routeHandlers.notFoundRoute;
        handler(req, res);
    });

    return server;
}

function startServer (server, port, hostname) {
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

module.exports = {
    createServer,
    startServer
}