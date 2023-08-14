const emailValidator = require("./thirdPartyAPIWrappers/emailValidator");

function verifyFormSubmissionIsEmail(email){
    if(!email.includes("@")){
        return false;
    }else if(email.indexOf("@") === 0 || !email.includes(".com")){
        return false;
    }else{
        const emailSignIndex = email.indexOf("@");
        const isNumber = parseInt(email.substring(0, emailSignIndex));
        return !isNumber;

    }
}

async function verifyEmailIsReachable(email){
    return await emailValidator.canEmailBeReached(email);
}

async function storeEmail(email){

}

async function getUserInfoFromEmail(email){

}

function getEmailFromForm(){

}

module.exports = {
    verifyFormSubmissionIsEmail,
    verifyEmailIsReachable,
    storeEmail,
    getUserInfoFromEmail
}