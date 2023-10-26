"use strict";

const {createServer, startServer} = require('./server');
const { port, hostname } = require('./config').serverConfig;

const server = createServer();
startServer(server, port, hostname);
