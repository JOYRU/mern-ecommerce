const createError = require('http-errors') ; 
const jwt = require('jsonwebtoken') ; 
const { jwtActivationKey } = require('../secret');
const { successResponse } = require('../controllers/responseController');
const { create } = require('../models/userModel');


const isLoggedIn =async (req,res,next)=>{
     try{
        const token = req.cookies.access_token ; 
        //console.log(token);

        if(!token){
            throw createError(401,'Access token not found') ; 
        }

        const decoded = jwt.verify(token,jwtActivationKey) ; 
        console.log(decoded) ;
       
        if(!decoded){
            throw createError(401,'Access token is not valid') ; 

        }
       // console.log(decoded) ;
        // req.body.userId = decoded._id ; 
        //need to check

       // req.user = decoded.user ; 
         next() ; 
     

     }catch(error){
        next(error) ; 
     }
    
}
const isLoggedOut =async (req,res,next)=>{
    try{
        const token = req.cookies.access_token ;
      try{
        if(token){
            const decoded = jwt.verify(token,jwtActivationKey) ; 
            if(decoded){
                throw createError(400,'User is already Logged In') ; 
            }
        }

      }catch(error){
        throw error;
      }
        next() ; 
    

    }catch(error){
       next(error) ; 
    }
   
}
const isAdmin =async (req,res,next)=>{
    try{
      if(!req.user.isAdmin){
        throw create(403,'Forbidden. You muest be a admin for this access')  ; 
      }
       
     next() ; 

    }catch(error){
       next(error) ; 
       //throw next(error) ; 
    }
   
}







module.exports={isLoggedIn,isLoggedOut,isAdmin} ;