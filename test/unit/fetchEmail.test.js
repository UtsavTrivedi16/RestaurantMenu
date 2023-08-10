const expect = require('chai').expect;
const sinon = require('sinon');
const emailValidator = require("../../src/thirdPartyAPIWrappers/emailValidator");
const verifyFormSubmissionIsEmail = require("../../src/fetchEmail").verifyFormSubmissionIsEmail;
const verifyEmailIsReachable = require("../../src/fetchEmail").verifyEmailIsReachable;

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
                expect(isEmail, " Email format should not be correct for " + emails[i]).to.deep.equal(false);
            };
        });

        it("Email format is correct", () => {
            const emails = [
                "Rob@lol.com",
                "James@yahoo.com",
                "udt16@gmail.com"
            ]
            for (let i = 0; i < emails.length; i++){
                const isEmail = verifyFormSubmissionIsEmail(emails[i]);
                expect(isEmail, " Email format should be correct for " + emails[i]).to.deep.equal(true);
            };
        });
    });

    describe("Email reachability tests", () => {

        let canEmailBeReachedStub = null;

        beforeEach(function () {
            canEmailBeReachedStub = sinon.stub(emailValidator, "canEmailBeReached");
        });

        it('Email is reachable', async () => {
            const emails = [
                "utsavtrivedi16@gmail.com",
                "utsav.trivedi@aviatnet.com"
            ];
            canEmailBeReachedStub.returns(Promise.resolve(true));

            for (let i = 0; i < emails.length; i++){
                const isEmail = await verifyEmailIsReachable(emails[i]);
                expect(isEmail, " Email should be reachable " + emails[i]).to.deep.equal(true);
            }
        });

        it('Email is not reachable', async () => {
            const emails = [
                "Rob@fakeEmail.com",
                "lol@aviatnet.com"
            ]

            canEmailBeReachedStub.returns(Promise.resolve(false));

            for (let i = 0; i < emails.length; i++){
                const isEmail = await verifyEmailIsReachable(emails[i]);
                expect(isEmail, " Email should be reachable " + emails[i]).to.deep.equal(false);
            }

        })
    });
});

describe("EmailAPI", () => {

    it('Email is stored in database', () => {
        const emails = [
            "utsavtrivedi16@gmail.com",
            "utsav.trivedi@aviatnet.com"
        ];

        for (let i = 0; i < emails.length; i++){
            await storeEmailInDB(emails[i]);

            const email = getEmailFromDB()

            expect(isEmail, " Email should be reachable " + emails[i]).to.deep.equal(false);
        }

    })

    it('Email list can be retrieved', () => {
        // Use sinon to fake this
        // const email = getEmailFromForm();
        // storeEmail(email);
    })

})

    