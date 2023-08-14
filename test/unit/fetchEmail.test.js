const emailValidator = require("../../src/thirdPartyAPIWrappers/emailValidator");
const verifyFormSubmissionIsEmail = require("../../src/fetchEmail").verifyFormSubmissionIsEmail;
const verifyEmailIsReachable = require("../../src/fetchEmail").verifyEmailIsReachable;
const storeEmail = require("../../src/fetchEmail").storeEmail;
const getUserInfoFromEmail = require("../../src/fetchEmail").getUserInfoFromEmail;

describe('User submits email', () => {

    describe("Email format tests", () => {
        it('Email format is incorrect', () => {
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
                expect(isEmail, " Email format should not be correct for " + emails[i]).to.equal(false);
            }
        });

        it("Email format is correct", () => {
            const emails = [
                "Rob@lol.com",
                "James@yahoo.com",
                "udt16@gmail.com"
            ]
            for (let i = 0; i < emails.length; i++){
                const isEmail = verifyFormSubmissionIsEmail(emails[i]);
                expect(isEmail, " Email format should be correct for " + emails[i]).to.equal(true);
            }
        });
    });

    describe("Email reachability tests", () => {

        let canEmailBeReachedStub = null;

        before(function () {
            canEmailBeReachedStub = sinon.stub(emailValidator, "canEmailBeReached");
        });

        it('Email is reachable', async () => {
            const emails = [
                "utsavtrivedi16@gmail.com",
                "utsav.trivedi@aviatnet.com"
            ];

            canEmailBeReachedStub.returns(true);

            for (let i = 0; i < emails.length; i++){
                const isEmail = await verifyEmailIsReachable(emails[i]);
                expect(isEmail, " Email should be reachable " + emails[i]).to.equal(true);
            }
        });

        it('Email is not reachable', async () => {
            const emails = [
                "Rob@fakeEmail.com",
                "lol@aviatnet.com"
            ];

            canEmailBeReachedStub.returns(false);

            for (let i = 0; i < emails.length; i++){
                const isEmail = await verifyEmailIsReachable(emails[i]);
                // expect(isEmail, " Email should be reachable " + emails[i]).to.equal(false);
                expect(isEmail, " Email should be reachable " + emails[i]).to.be.false;
            }

        })
    });
});

describe("EmailAPI", () => {

    it('Email is stored in database', async() => {
        const emails = [
            {"utsavtrivedi16@gmail.com": "Utsav Trivedi"},
            {"utsav.trivedi@aviatnet.com": "Utsav Trivedi"}
        ];

        for (let i = 0; i < emails.length; i++){
            await storeEmail(emails);

            const emailEntry = await getUserInfoFromEmail(Object.values(emails[i])[0]);

            expect(emailEntry, " Email entered should be same as " + emails[i]).to.deep.equal(emails[i]);
        }
    })
})

