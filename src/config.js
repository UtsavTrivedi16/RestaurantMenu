// const {MongoClient } = require('mongodb');
const environment = process.env.NODE_ENV;

require('dotenv').config({
    path: `env/.env.${environment}`
});

// const DB_NAME = process.env.DB_NAME;
// // const DB_URL = process.env.DB_URL.replace('${DB_NAME}', DB_NAME);

// const DB_URL = "mongodb://localhost:27017/poc-test?replicaSet=rs0"

const serverConfig = {
    port: process.env.PORT,
    hostname: process.env.HOSTNAME
};

const dbCollections = {

}


// const client = new MongoClient(DB_URL,  {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     tls: true,
//     tlsInsecure: true,
//     socketTimeoutMS: 60000
// });


module.exports = {
    environment,
    serverConfig,
}
