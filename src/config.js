
require('dotenv').config({
    path: "env/.env.dev"
});

const serverConfig = {
    port: process.env.PORT,
    hostname: process.env.HOSTNAME
};

module.exports = {
    serverConfig
}
