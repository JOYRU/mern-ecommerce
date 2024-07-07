const createError = require('http-errors') ;
const mongoose = require('mongoose') ; 


const User = require("../models/userModel")

const findWithId = async(Model, id , options ={}) =>{
    try{
        
        const options = {password: 0} ; 
        const item = await Model.findById(id,options) ;
        
        
    if(!item){
        throw createHttpError(404,'Item does not exist with this id');

    }
    return item ; 
    
    }catch(error){
        if(error instanceof mongoose.error){
            throw createError(400,'Invalid User Id')
        }

    }
}

module.exports = {findWithId}