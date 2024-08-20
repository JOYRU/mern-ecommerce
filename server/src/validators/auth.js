const {body} = require("express-validator") ; 

//registration validation
const validateUserRegistration = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({min: 3 , max: 31})
    .withMessage('Name should be at least3-31 characters long')

] ; 


//sign in validation


module.exports = {validateUserRegistration} ;