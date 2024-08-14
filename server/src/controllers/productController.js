const express = require('express') ; 
const createError = require('http-errors') ; 
const jwt  = require('jsonwebtoken') ; 
const bodyParser= require('body-parser') ; 

const app = express() ; 

app.use(bodyParser.json()) ; 
const fs = require('fs') ; 
const Product = require('../models/Product');
const product = require('../productdata');


const ProductUpload =async (req,res,next)=>{

    try{
      await Product.deleteMany({}) ; 
      const products = await Product.insertMany(product.products) ; 

       return res.status(201).json(products) ; 

    }catch(error){
        next(error) ; 
    }
}

module.exports = {ProductUpload} ; 
