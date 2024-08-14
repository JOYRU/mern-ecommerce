const express = require('express') ; 
const { ProductUpload } = require('../controllers/productController');
const productRouter = express.Router() ; 
productRouter.get('/products',ProductUpload) ; 

module.exports = {productRouter} ;
