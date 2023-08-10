const emailValidator = require("./thirdPartyAPIWrappers/emailValidator");

function verifyFormSubmissionIsEmail(email){
    if(!email.includes("@")){
        return false;
    }else if(email.indexOf("@") === 0 || !email.includes(".com")){
        return false;
    }else{
        const emailSignIndex = email.indexOf("@");
        const isNumber = parseInt(email.substring(0, emailSignIndex));
        if(isNumber){
            return false;
        } 
        return true;
    }
}

async function verifyEmailIsReachable(email){
    return await emailValidator.canEmailBeReached(email);
}

function getEmailFromForm(){

}

function storeEmail(email){

}

module.exports = {
    verifyFormSubmissionIsEmail,
    verifyEmailIsReachable
}