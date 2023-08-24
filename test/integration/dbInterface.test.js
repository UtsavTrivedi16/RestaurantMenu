const { resetDatabase, getWholeCollection, setDataForCollection, getDataFromCollectionUsingKey } = require("../../src/thirdPartyAPIWrappers/dbInterface");

describe('Database CRUD operation tests via the DB interface', () => {

    afterEach( async function() {
        await resetDatabase();
    })

    it('Data for a specific collection is stored', async () => {
        const collection = "Fruits"
        const people = {"Citrus": ["Apple", "Orange", "Lime"]}

        await setDataForCollection(people, collection);

        const actualData = await getWholeCollection(collection);

        expect(actualData, " Data should be exactly: ").to.deep.equal(people);

    });



});