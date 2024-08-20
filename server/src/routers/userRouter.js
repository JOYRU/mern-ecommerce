const express = require('express') ; 
const { getUsers, getUser, deleteUser, processRegister, activateUserAccount } = require('../controllers/userController');
const upload = require('../middlewares/uploadFile');
const { validateUserRegistration } = require('../validators/auth');
const  runValidation  = require('../validators');

const userRouter = express.Router() ; 

userRouter.post('/process-register',validateUserRegistration,runValidation, upload.single("image") ,processRegister);
userRouter.post('/verify',activateUserAccount);
userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);
userRouter.delete('/:id', deleteUser);


module.exports = userRouter ; 
