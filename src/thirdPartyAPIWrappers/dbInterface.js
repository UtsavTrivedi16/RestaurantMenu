const _ = require("lodash");
const { MongoClient } = require("mongodb");
// const db = require("../config").db;

const DB_NAME = process.env.DB_NAME;
const DB_URL = process.env.DB_URL.replace('${DB_NAME}', DB_NAME);

// const DB_URL = "mongodb://localhost:27017/poc-test?replicaSet=rs0"

let db = null;

if(!_.isEmpty(db)){
    db.on('error', function(err){
        console.error("Error connecting to Database!", err);
        if (!_.isEmpty(db)) {
            db.close();
        }
    })

    db.on('connect', function(){
        console.log("Database is connected!");
    })
}


async function connectToDatabase(){
    try {
        // Connect the client to the server (optional starting in v4.7)
        const client = new MongoClient(DB_URL,  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true,
            tlsInsecure: true,
            socketTimeoutMS: 60000
        });

        await client.connect();
        db = client.db(DB_NAME);
        // Send a ping to confirm a successful connection
        await db.command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch(e) {
        // Ensures that the client will close when you finish/error
        console.error(e);
    }

}

async function setDataForCollection(data, collectionName){
    const success = await db.collection(collectionName).insertMany([data]);
    return success;
};

async function getWholeCollection(collectionName){
    const result = await db.collection(collectionName).find({}).toArray();
    return result;
};

async function getDataFromCollectionUsingKey(collectionName, key){
    const result = await db.collection(collectionName).find(key).toArray();
    return result;
};

async function resetDatabase(){
    await db.dropDatabase();
};


module.exports = {
    connectToDatabase,
    resetDatabase,
    getWholeCollection,
    setDataForCollection,
    getDataFromCollectionUsingKey
}