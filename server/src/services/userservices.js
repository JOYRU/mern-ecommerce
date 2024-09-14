
const createError = require('http-errors') ;
const User = require('../models/userModel');

const findUsers = async(search,page,limit)=>{
   
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

   if(!users) throw createError(404,'no users found' ) ; 
   
   return {
      users,
      pagination:{
         totalPages: Math.ceil(count/limit),
         currentPage:page,
         previousPage: page - 1 > 0 ? page-1: null,
         nextPage: page + 1<=Math.ceil(count/limit) ? page+1:null  ,
            
       },     
     }
  
   }

const handleUserAction =async (userId,action)=>{
 try{
    let update  ; 
    let successMessage ; 
    console.log(action)
    if(action=='ban'){
       update = {isBanned: true} ; 
       successMessage = "User was Banned Successfully"
    }else if(action=='unban'){
        update = {isBanned:false}
         successMessage = "User was UnBanned Successfully"
    }else{
       throw createError(400,'Invalid Action. Use Ban or unban') ; 
    }
   

   ///const updates = {isBanned:true}  ; 
   const updateOptions = {new: true , runValidators : true , context: 'query'} ; 
   const updatedUser =  await User.findByIdAndUpdate(
       userId,
       update,
       updateOptions
   ).select('-password') ; 
    // console.log(updatedUser)

if(!updatedUser){
   throw createError(400,'Ban/Unban is not sucessfully work') ; 
}
return successMessage ;
 } catch(error){
    throw error ; 
 }
}

module.exports = {handleUserAction , findUsers} ; 
