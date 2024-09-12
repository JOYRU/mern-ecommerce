const express = require('express') ; 
const { getUsers, getUser, deleteUser, processRegister, activateUserAccount, updateUserByIdUser, updateUserBySingleId } = require('../controllers/userController');
const upload = require('../middlewares/uploadFile');
const { validateUserRegistration } = require('../validators/auth');
const  runValidation  = require('../validators');
const { isLoggedIn } = require('../middlewares/auth');

const userRouter = express.Router() ; 

userRouter.post('/process-register',validateUserRegistration,upload.single("image"),processRegister);
userRouter.post('/verify',activateUserAccount);
userRouter.get('/',getUsers);

//userRouter.get('/:id',isLoggedIn,getUser);
userRouter.get('/:id',isLoggedIn,getUser);
userRouter.delete('/:id', deleteUser);
userRouter.put('/:id',upload.single("image") ,updateUserBySingleId);


module.exports = userRouter ; 
