const MongoClient = require('mongodb').MongoClient;
const DB_NAME = require('./app');

export const setDatabaseData = async (collectionName, data) => {
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

export const getDatabaseData = async collectionName => {
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

export const resetDatabase = async () => {
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
