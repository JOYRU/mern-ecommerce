const express = require('express') ;
const bodyParser = require('body-parser')
const createError = require('http-errors')
const app = express() ; 


// app.use(morgan('dev')) ;
app.get('/',(req,res)=>{
    res.status(200).send({
        message: 'Server is running'
    });
});

app.get('/api/users',(req,res)=>{
    res.status(200).send({
        message: 'User Profile is returned'
    });
});

//client side error handling
app.use((req,res,next)=>{
    createError(404, 'route not found') ; 
    next() ; 
})

// server side error => all the errors
app.use((err,req,res,next)=>{
    return res.status(err.status || 500).json({
        success: false , 
        message:err.message , 

    }) ; 

})  ; 



module.exports = app ; 