const express = require('express') ; 
const { getUsers, getUser, deleteUser, processRegister } = require('../controllers/userController');

const userRouter = express.Router() ; 

userRouter.post('/process-register', processRegister);
userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);
userRouter.delete('/:id', deleteUser);


module.exports = userRouter ; 
