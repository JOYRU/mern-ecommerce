const express = require('express') ; 
const { getUsers, getUser, deleteUser } = require('../controllers/userController');

const userRouter = express.Router() ; 


userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);
userRouter.get('/:id', deleteUser);


module.exports = userRouter ; 
