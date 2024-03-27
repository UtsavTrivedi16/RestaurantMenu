const _ = require("lodash");
const { MongoClient } = require("mongodb");
const DB_NAME = process.env.DB_NAME;
const DB_URL = process.env.DB_URL.replace('${DB_NAME}', DB_NAME);

let db = null;

// if(!_.isEmpty(db)){
//     db.on('error', function(err){
//         console.error("Error connecting to Database!", err);
//         if (!_.isEmpty(db)) {
//             db.close();
//         }
//     })
//
//     db.on('connect', function(){
//         console.log("Database is connected!");
//     })
// }


async function connectToDatabase(){
    try {
        // Connect the client to the server (optional starting in v4.7)
        const client = new MongoClient(DB_URL,  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true,
            tlsAllowInvalidCertificates: true,
            tlsAllowInvalidHostnames: true,
            socketTimeoutMS: 60000
        });

        await client.connect();
        db = client.db(DB_NAME);
        // Send a ping to confirm a successful connection
        await db.command({ ping: 1 });
        console.log("Pinged your deployment. Successfully connected to MongoDB!");
    } catch(e) {
        // Ensures that the client will close when you finish/error
        console.error(e);
    }

}

async function storeDataForCollection(data, collectionName){
    return await db.collection(collectionName).insertMany([data]);
};

async function getWholeCollection(collectionName){
    return await db.collection(collectionName);
};

async function getDataFromCollectionUsingKey(collectionName, key){
    return await db.collection(collectionName).findOne({}, {fields: {[key]: 1, _id: 0}});
};

async function resetDatabase(){
    await db.listCollections().forEach(
        collection => {
            db.collection(collection.name).deleteOne();
        }
    );
};


module.exports = {
    connectToDatabase,
    resetDatabase,
    getWholeCollection,
    storeDataForCollection,
    getDataFromCollectionUsingKey
}