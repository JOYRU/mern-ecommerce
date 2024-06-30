const User = require("../models/userModel")

const findItemById = async(id) =>{
    try{

        const options = {password: 0} ; 
        const user = await User.findById(id,options) ; 

    if(!user){
        throw createHttpError(404,'user does not exist with this id');

    }
    }catch(error){
        if(error instanceof mongoose.error){
            throw createError(400,'Invalid User Id')
        }

    }
}