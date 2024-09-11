const express = require('express') ; 
const runValidation = require('../validators');
const { handleLogin, handleLogOut } = require('../controllers/authController');

//const runValidation = requuire('../validators') ; 

const authRouter = express.Router() ; 


authRouter.post('/login',handleLogin) ; 
authRouter.post('/logout',handleLogOut) ; 






module.exports = authRouter ; 

