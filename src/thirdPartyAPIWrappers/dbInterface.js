const MongoClient = require('mongodb').MongoClient;

const DB_NAME = process.env.NODE_ENV === 'test'
    ? 'TEST_DB'
    : 'PROD_DB';

const setDataForCollection = async (collectionName, data) => {
    const client = await MongoClient.connect(
        `mongodb://localhost:27017/TEST_DB`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    );
    const db = client.db(DB_NAME);

    await db.collection(collectionName).insertMany(data);

    client.close();
};

const getWholeCollection = async collectionName => {
    const client = await MongoClient.connect(
        `mongodb://localhost:27017/TEST_DB`,
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
        `mongodb://localhost:27017/TEST_DB`,
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
        `mongodb://localhost:27017/TEST_DB`,
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