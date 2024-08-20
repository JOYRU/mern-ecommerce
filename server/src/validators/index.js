const {validationResult} = require('express-validator');
const { errorResponse } = require("../controllers/responseController");

const runValidation = (req,res,next)=>{
    try{

        const errors = validationResult(req) ;
        console.log(req.body.name) ;
        if(!errors.isEmpty()) {
           return errorResponse(res,{
            statusCode:422 , 
            message:errors.array()[0].msg
           });
        }
        return next() ; 

    }catch(error){
       return next(error)
    }
};

module.exports = runValidation ; 