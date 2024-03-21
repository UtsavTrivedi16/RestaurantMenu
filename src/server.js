const http = require('http');
const { routeHandlers, notFoundRoute } = require('./routes/routeHandlers');

const fileFormats = [".html", ".css", ".webp", ".avif", ".mp4"];

function createServer(){
    const server = http.createServer((req, res) => {
        let hasFormat = false;

        for (let i = 0; i < fileFormats.length; i++){
            if(req.url.endsWith(fileFormats[i])){
                hasFormat = true;
                break;
            }
        }

        if(hasFormat) {
            routeHandlers['/public'](req, res);
            return;
        }

        const handler = routeHandlers[req.url] || notFoundRoute;
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