const environment = process.env.NODE_ENV;

require('dotenv').config({
    path: `env/.env.${environment}`
});


const serverConfig = {
    port: process.env.PORT || 3000,
    hostname: process.env.HOSTNAME || 'http://localhost:3000',
};

module.exports = {
    environment,
    serverConfig
}
