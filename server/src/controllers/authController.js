const createHttpError = require("http-errors");
const createError     = require('http-errors') ; 
const { createJSONWebToken } = require("../helper/jsonwebtoken");
const jwt = require('jsonwebtoken') ; 
 const bcrypt = require('bcryptjs') ; 


const { successResponse } = require("./responseController");
const User = require("../models/userModel");
const { jwtActivationKey } = require("../secret");
const { cookie } = require("express-validator");

User


const handleLogin = async(req,res,next)=>{
    try{
        const {email,password} = req.body ; 
        
        const user = await User.findOne({email}) ; 
       

        if(!user){
            throw createHttpError(404,'User does not exist with this email.Please Register First') ; 


        }
        //compare password

       const isPasswordMatch = await bcrypt.compare(password,user.password) ; 
       if(!isPasswordMatch){
           throw createError(401,'Email/Pass did not match') ; 

       }
       //isBanned
       if(user.isBanned){
        throw createError(403,'You are Banned.Please contact Authority') ; 

       }
       //token , cookie
       //create jwt 
       const accessToken = createJSONWebToken({_id:user._id},
        jwtActivationKey,
        '10m'
       );

       res.cookie('access_token',accessToken,{
        maxAge:15*60*1000,
        httpOnly:true,
        //secure:true,
        sameSite: 'none'
       });
        //successResponse

        return successResponse(res, {
            statusCode:200,
            message:'user login Successfully',
            payload:{}
,         }) ; 

    }
    catch(error){
       next(error) ; 
    }
};

const handleLogOut = async(req,res,next)=>{
    try{
        
        res.clearCookie('access_token') ; 

        return successResponse(res, {
            statusCode:200,
            message:'user logout Successfully',
            payload:{}
,         }) ; 

    }
    catch(error){
       next(error) ; 
    }
};


module.exports = {handleLogin,handleLogOut}