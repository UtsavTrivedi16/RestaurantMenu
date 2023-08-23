const emailValidator = require("../../src/thirdPartyAPIWrappers/emailValidator");
const dbInterface = require("../../src/thirdPartyAPIWrappers/dbInterface");
const verifyFormSubmissionIsEmail = require("../../src/fetchEmail").verifyFormSubmissionIsEmail;
const verifyEmailIsReachable = require("../../src/fetchEmail").verifyEmailIsReachable;
const storeUserAndEmail = require("../../src/fetchEmail").storeUserAndEmail;
const getUserDataFromEmail = require("../../src/fetchEmail").getUserDataFromEmail;

describe('When user submits email', () => {

    describe("Email format is checked", () => {
        it('Email should not be processed when format is wrong', () => {
            const emails = [
                "lol",
                "123&$",
                "1231234",
                "@lol.com",
                "hello@",
                "123@lol.com"
            ];

            for (let i = 0; i < emails.length; i++){
                const isEmail = verifyFormSubmissionIsEmail(emails[i]);
                expect(isEmail, " Email format should not be correct for " + emails[i]).to.be.false;
            }
        });

        it("Email should be processed when format is correct", () => {
            const emails = [
                "Rob@lol.com",
                "James@yahoo.com",
                "udt16@gmail.com"
            ]
            for (let i = 0; i < emails.length; i++){
                const isEmail = verifyFormSubmissionIsEmail(emails[i]);
                expect(isEmail, " Email format should be correct for " + emails[i]).to.be.true;
            }
        });
    });

    describe("Valid email ids can be reached", () => {

        let canEmailBeReachedStub = null;

        before(function () {
            canEmailBeReachedStub = sinon.stub(emailValidator, "canEmailBeReached");
        });

        it('Email id should be reachable provided it exists and has valid domain', async () => {
            const emails = [
                "utsavtrivedi16@gmail.com",
                "utsav.trivedi@aviatnet.com"
            ];

            canEmailBeReachedStub.returns(true);

            for (let i = 0; i < emails.length; i++){
                const isEmail = await verifyEmailIsReachable(emails[i]);
                expect(isEmail, " Email should be reachable " + emails[i]).to.be.true;
            }
        });

        it('Email id should not be reachable due to invalid domain or it does not exist', async () => {
            const emails = [
                "Rob@fakeEmail.com",
                "lol@aviatnet.com"
            ];

            canEmailBeReachedStub.returns(false);

            for (let i = 0; i < emails.length; i++){
                const isEmail = await verifyEmailIsReachable(emails[i]);
                expect(isEmail, " Email should be reachable " + emails[i]).to.be.false;
            }

        })
    });
});

describe("EmailAPI to facilitate storage and retrieval of user and emails from database", () => {

    let setDataForCollectionStub = null;
    let getDataFromCollectionUsingKeyStub = null;

    before(function () {
        setDataForCollectionStub = sinon.stub(dbInterface, "setDataForCollection");
        getDataFromCollectionUsingKeyStub = sinon.stub(dbInterface, "getDataFromCollectionUsingKey");
    });

    it('Email is stored with username in database after being collected from form', async() => {
        const emails = [
            {"utsavtrivedi16@gmail.com": "Utsav Trivedi"},
            {"utsav.trivedi@aviatnet.com": "Utsav Trivedi"}
        ];

        for (let i = 0; i < emails.length; i++){
            setDataForCollectionStub.callsFake(() => {console.log("Stored ", emails[i]," in DB")})
            getDataFromCollectionUsingKeyStub.returns(emails[i]);

            await storeUserAndEmail(emails[i]);

            const emailEntry = await getUserDataFromEmail(Object.values(emails[i])[0]);

            expect(emailEntry, " Email entered should be same as " + emails[i]).to.deep.equal(emails[i]);
        }
    })
})

