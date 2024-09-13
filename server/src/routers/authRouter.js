const express = require('express') ; 
const runValidation = require('../validators');
const { handleLogin, handleLogOut } = require('../controllers/authController');
const { isLoggedOut } = require('../middlewares/auth');

//const runValidation = requuire('../validators') ; 

const authRouter = express.Router() ; 


authRouter.post('/login',isLoggedOut,handleLogin) ; 
authRouter.post('/logout',handleLogOut) ; 






module.exports = authRouter ; 

