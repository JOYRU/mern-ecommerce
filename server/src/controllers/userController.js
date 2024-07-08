const createError = require('http-errors') ;
const bodyParser = require('body-parser') ;

const fs = require('fs') ; 

const User = require("../models/userModel");
const { successResponse } = require('./responseController');
const { findWithId } = require('../services/findItem');


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

        const userExists = await User.findOne({email}) ; 
        // if(userExists){
        //     throw createError(409,'User was already exist.Plase try with another mail') ; 
        // }
        // console.log(userExists)

    //   const userExist =   User.findOne({
    //         $or: [{
    //             email: email
    //         }, {
    //             name: name
    //         }]
    //     }) ; 

        console.log(userExists.email) ;
        console.log(userExists.name) ; 


        const newUser = {
            name,
            email,
            password,
            phone,
            address
        } ; 

        return successResponse(res,{
            statusCode: 200 , 
            message:"user register success",
            payload:{newUser}
        })

    }catch(error){
        next(error) ; 
    }
}


module.exports = {getUsers,getUser,deleteUser,processRegister}