const apiRoute = require('./apiRoute');
const emailListRoute = require('./emailListRoute');
const homeRoute = require("./homeRoute");
const assetRoute = require("./assetRoute");

const notFoundRoute = (req, res) => {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
};

const routeHandlers = {
    '/': homeRoute,
    '/public': assetRoute,
    '/api': apiRoute,
    '/emailList': emailListRoute
    // Add more routes here
};

module.exports = {
    routeHandlers,
    notFoundRoute
}