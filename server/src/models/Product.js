const {Schema , model} = require('mongoose') ; 
const bcrypt = require('bcrypt') ; 

const productSchema = new Schema({
    name:{
        type:String
    },
    image:{
        type:String
    }

}) ; 


const Product = model('Products',productSchema) ;
module.exports = Product ; 