const express = require('express') ; 
const runValidation = require('../validators');
const { handleLogin } = require('../controllers/authController');

//const runValidation = requuire('../validators') ; 

const authRouter = express.Router() ; 


authRouter.post('/login',handleLogin) ; 






module.exports = authRouter ; 

