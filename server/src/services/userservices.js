
const createError = require('http-errors') ;
const User = require('../models/userModel');
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

module.exports = {handleUserAction} ; 
