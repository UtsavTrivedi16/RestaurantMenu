const { resetDatabase, getWholeCollection, storeDataForCollection,
    getDataFromCollectionUsingKey, connectToDatabase} = require("../../src/thirdPartyAPIWrappers/dbInterface");

describe('Database CRUD operation tests via the DB interface', () => {

    afterEach( async function() {
        await resetDatabase();
    })

    it('Data for a specific collection is stored', async () => {
        const collection = "Fruits"
        const key = "Citrus";
        const people = {[key]: ["Apple", "Orange", "Lime"]};

        await connectToDatabase();
        await storeDataForCollection(_.cloneDeep(people), collection);

        const actualData = await getDataFromCollectionUsingKey(collection, key);

        expect(actualData, " Data should be exactly: ").to.deep.equal(people);
    });

});