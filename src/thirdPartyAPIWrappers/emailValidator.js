const deepEmailValidator = require("deep-email-validator");

async function canEmailBeReached(email){
    const isEmailReachable = await deepEmailValidator.validate(email).validators.smtp;
    if(!isEmailReachable.valid){
        console.log(isEmailReachable.reason);
    }
    return isEmailReachable.valid;
}


module.exports = {
    canEmailBeReached
}