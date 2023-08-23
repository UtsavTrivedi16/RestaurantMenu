"use strict";

const {createServer, startServer} = require('./server');
const { PORT, HOSTNAME } = require('./config');

const server = createServer();
startServer(server, PORT, HOSTNAME);
