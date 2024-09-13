const express = require('express')
const createError = require('http-errors') ;
const jwt = require('jsonwebtoken') ; 

const bodyParser = require('body-parser') ;
var nodemailer = require('nodemailer');

const app = express() ; 


app.use(bodyParser.json());

const fs = require('fs') ; 

const User = require("../models/userModel");
const { successResponse } = require('./responseController');
const { findWithId } = require('../services/findItem');
const { jwtActivationKey } = require('../secret');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const { Http2ServerRequest } = require('http2');
const { Script } = require('vm');
const { handleUserAction } = require('../services/userservices');


const getUsers =async(req,res)=>{
    try{
        const search = req.query.search || "" ; 
        const page = Number(req.query.page) || 1 ; 
        const limit = Number(req.query.limit) || 1 ; 
        const searchRegExp = new RegExp('.*' + search + ".*",'i') ; 
        const filter = {
            isAdmin : {$ne : true },
            $or:[
                {name:{$regex:searchRegExp}},
                {email:{$regex:searchRegExp}},
                {phone:{$regex:searchRegExp}},
                
            ]
        } ; 
        const options = {password : 0 } ; 

        const users = await User.find(filter,options).limit(limit).skip((page-1)*limit) ;
        const count = await User.find(filter).countDocuments() ; 

        if(!users) throw createError(404,'no users found' )
        // res.status(200).send({
        //     message: 'User were returned sucessfully' ,
        // payload:{
        //             users,
        //             pagination:{
        //                 totalPages: Math.ceil(count/limit),
        //                 currentPage:page,
        //                 previousPage: page - 1 > 0 ? page-1: null,
        //                 nextPage: page + 1<=Math.ceil(count/limit) ? page+1:null  ,
                         
        
        //             }
        
        //         }

        // });
      
        return successResponse(res,{
            statusCode : 200 , 
            message: 'User was returned successfully' , 
            payload:{
                users,
                pagination:{
                    totalPages: Math.ceil(count/limit),
                    currentPage:page,
                    previousPage: page - 1 > 0 ? page-1: null,
                    nextPage: page + 1<=Math.ceil(count/limit) ? page+1:null  ,
                     
    
                },
    

            }
        })

    }catch(error){
         next(error) ;
    }
   

};

const getUser = async(req,res,next)=>{
    try{

       // console.log(req.body.userId) ;
        const id = req.params.id ; 
        const options = {password: 0} ; 
        //const user = await User.findById(id,options) ; 
        
        const user = await findWithId(User,id,options) ; 

        
        if(!user) throw createError(404,'Users does not exist' ) ; 

        return successResponse(res,{
            statusCode: 200 , 
            message:'user were returned successfully',
            payload:{user}
        }) ; 

    }catch(error){
       next(error) ;
    }
}

const deleteUser = async(req,res,next)=>{
    try{

        const id = req.params.id ; 
        const options = {password: 0} ; 
        const user = await User.findById(id,options) ; 
        console.log(user) ;
        
        const deleteUser = await User.findByIdAndDelete({_id:id }) ; 
        
        const userImagePath = user.image ; 
        fs.access(userImagePath  , (err)=>{
            if(err){
                console.log('user image does not exist')
            }else{
                fs.unlink(userImagePath,(err)=>{
                    if(err) throw err ; 
                    console.log('user image was deleted')
                })
            }
        })

        
         

        return successResponse(res,{
            statusCode: 200 , 
            message:'user was deleted successfully',
            
        }) ; 

    }catch(error){
       next(error) ;
    }
}

const processRegister = async(req , res , next)=>{
    try{
        const {name, email, password, phone, address} = req.body ; 
         
        const image = req.file ; 

        if(!image){
            throw createError(400,'Image FIle is required') ; 

        }

        if(image.size > 1024*1024*2){
            throw createError(400,'File too large.It must be less then 2 mb') ; 
        }

        console.log(image); 

        const imageBufferString = req.file.buffer.toString('base64') ; 
   
        const userExists = await User.findOne({email:email}) ; 
        if(userExists){
            throw createError(409,'User was already Exist.Plase try with another mail') ; 
        }
       

    //   const userExist =   User.findOne({
    //         $or: [{
    //             email: email
    //         }, {
    //             name: name
    //         }]
    //     }) ; 

        // console.log(userExists.email) ;
        // console.log(userExists.name) ; 
//create jwt


      const token =   createJSONWebToken({name, email, password, phone, address, image:imageBufferString},jwtActivationKey,'10m') ; 

    

        // var transporter = nodemailer.createTransport({
        // service: 'gmail',
        // auth: {
        //     user: 'joycseru@gmail.com',
        //     pass: 'nuzzalbesjcwrvxw'
        // }
        // });

        // var mailOptions = {
        // from: 'joycseru@gmail.com',
        // to: 'bpbs.itdept@gmail.com',
        // subject: 'Sending Email using Node.js',
        // text: 'That was easy!'
        // };

        // transporter.sendMail(mailOptions, function(error, info){
        // if (error) {
        //     console.log(error);
        // } else {
        //     console.log('Email sent: sucessfully ' + info.response);
        // }
        // });
        

      //PREPARE EMAIL
        const emailData = {
            // email,
            // subject: 'Account Activation Email',
            // html:
            // Script
            // <h2>
            //     Hello ${name}
            // </h2>
            // <p>

            // </p>
        }

      //SEND email with nodemailer


        const newUser = {
            name,
            email,
            image,
             password,
              phone,
              address
        } ; 

        // const users = await User.insertMany(newUser) ; 
        // console.log(users) ;



        return successResponse(res,{
            statusCode: 200 , 
            message:"user register success",
            payload:{token},
        })

    }catch(error){
        next(error) ; 
    }
}

const activateUserAccount = async(req , res , next)=>{
  try{

    const token = req.body.token; 

    console.log(token) ;
    if(!token) throw createError(404,'token not found') ; 
   
    const decode =  jwt.verify(token,jwtActivationKey) ;
    const users = await User.insertMany(decode) ; 
    console.log(decode) ; 
    return successResponse(res,{
        statusCode:201,
        message: 'User registered Successfully Done',
        users

    })
  }catch(error){
    next(error) ; 
}

} ; 

const updateUserBySingleId = async(req,res,next)=>{
    try{

        const userId = req.params.id ; 
        const updateOptions = {new:true , context:'query'} ; 

        let updates = {} ; 

        //name , email, password , phone , image ,address,
      if(req.body.name){
        updates.name = req.body.name ; 

      }
      if(req.body.password){
        updates.name = req.body.password ; 

      }
      console.log(updates) ;

      const image = req.file ; 
      if(image){
        if(image.size > 1024*1024*2){
            throw createError(400,'File too large.It must be less then 2 mb') ; 
        }

      }

      updates.image = image.buffer.toString('base64') ; 
      

      const updatedUser = await User.findByIdAndUpdate(userId,updates,updateOptions) ; 
      console.log(updatedUser) ;
      if(!updatedUser){
        throw createError(404,'User with this id does not exit ')
      }
        return successResponse(res,{
            statusCode: 200 , 
            message:'user was Updated successfully',
            payload:updatedUser,
            
        }) ; 

    }catch(error){
       next(error) ;
    }
}

const updateUserStatusById = async(req,res,next)=> {
      try{
        const userId = req.params.id ; 
        const action = req.body.action ; 

    //      let update  ; 
    //      let successMessage ; 
    //      if(action=='ban'){
    //         update = {isBanned: true} ; 
    //         successMessage = "User was Banned Successfully"
    //      }else if(action=='unban'){
    //          update = {isBanned:false}
    //           successMessage = "User was UnBanned Successfully"
    //      }else{
    //         throw createError(400,'Invalid Action. Use Ban or unban') ; 
    //      }
   
    //     ///const updates = {isBanned:true}  ; 
    //     const updateOptions = {new: true , runValidators : true , context: 'query'} ; 
    //     const updatedUser =  await User.findByIdAndUpdate(
    //         userId,
    //         update,
    //         updateOptions
    //     ).select('-password') ; 

    // if(!updatedUser){
    //     throw createError(400,'Ban/Unban is not sucessfully work') ; 
    // }

    const successMessage = await handleUserAction(userId,action) ; 
    console.log(successMessage);

    return successResponse(res,{
          statusCode:200,
          message:successMessage
    }) ; 

      }catch(error){
        next(error) ; 
      }
}



module.exports = {getUsers,getUser,deleteUser,processRegister,activateUserAccount,updateUserBySingleId ,updateUserStatusById}