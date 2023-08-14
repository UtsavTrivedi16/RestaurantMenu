const deepEmailValidator = require("deep-email-validator");

async function canEmailBeReached(email){
    let isEmailReachable = {valid: false};
    try{
        isEmailReachable = await deepEmailValidator.validate(email).validators.smtp;
        if(!isEmailReachable.valid){
            console.log(isEmailReachable.reason);
        }
        return isEmailReachable.valid;
    }catch(err){
        console.log(err);
    }finally{
        console.log("Finished verifying email");
    }

    return isEmailReachable.valid;
}


module.exports = {
    canEmailBeReached
}