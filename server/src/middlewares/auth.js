const createError = require('http-errors') ; 
const jwt = require('jsonwebtoken') ; 
const { jwtActivationKey } = require('../secret');
const { successResponse } = require('../controllers/responseController');


const isLoggedIn =async (req,res,next)=>{
     try{
        const token = req.cookies.access_token ; 
        //console.log(token);

        if(!token){
            throw createError(401,'Access token not found') ; 
        }

        const decoded = jwt.verify(token,jwtActivationKey) ; 
       
        if(!decoded){
            throw createError(401,'Access token is not valid') ; 

        }
       // console.log(decoded) ;
        req.body.userId = decoded._id ; 
        //need to check
         next() ; 
     

     }catch(error){
        next(error) ; 
     }
    
}








module.exports={isLoggedIn } ;