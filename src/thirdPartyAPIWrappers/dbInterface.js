const MongoClient = require('mongodb').MongoClient;

const DB_NAME = process.env.DB_NAME;
const DB_URL = process.env.DB_URL.replace('${DB_NAME}', DB_NAME);

const setDataForCollection = async (data, collectionName) => {
    let client = null;

    try {
        client = await MongoClient.connect(
            DB_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        const db = client.db(DB_NAME);

        await db.collection(collectionName).insertMany(data);
    }catch(error){
        console.error(error);
    }finally{
        client.close();
    }

};

const getWholeCollection = async collectionName => {
    const client = await MongoClient.connect(
        DB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    );
    const db = client.db(DB_NAME);

    const result = await db.collection(collectionName).find().toArray();

    client.close();

    return result;
};

const getDataFromCollectionUsingKey = async (collectionName, key) => {
    const client = await MongoClient.connect(
        DB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    );
    const db = client.db(DB_NAME);

    const result = await db.collection(collectionName).find(key).toArray();

    client.close();

    return result;
};

const resetDatabase = async () => {
    const client = await MongoClient.connect(
        DB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    );
    const db = client.db(DB_NAME);

    await db.dropDatabase();

    client.close();
};


module.exports = {
    resetDatabase,
    getWholeCollection,
    setDataForCollection,
    getDataFromCollectionUsingKey
}