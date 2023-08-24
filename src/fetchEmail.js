const emailValidator = require("./thirdPartyAPIWrappers/emailValidator");
const dbInterface = require("./thirdPartyAPIWrappers/dbInterface");

function verifyFormSubmissionIsEmail(email) {
    if (!email.includes("@")) {
        return false;
    } else if (email.indexOf("@") === 0 || !email.includes(".com")) {
        return false;
    } else {
        const emailSignIndex = email.indexOf("@");
        const isNumber = parseInt(email.substring(0, emailSignIndex));
        return !isNumber;
    }
}

async function verifyEmailIsReachable(email){
    return await emailValidator.canEmailBeReached(email);
}

async function storeUserAndEmail(email){
    await dbInterface.setDataForCollection(email, "EmailList");
}

async function getUserDataFromEmail(email){
    return await dbInterface.getDataFromCollectionUsingKey("EmailList", email);
}

function getEmailFromForm(){

}

module.exports = {
    verifyFormSubmissionIsEmail,
    verifyEmailIsReachable,
    storeUserAndEmail,
    getUserDataFromEmail
}