const express = require('express') ;
const bodyParser = require('body-parser')
const createError = require('http-errors');
const userRouter = require('./routers/userRouter');
const { seedRouter } = require('./routers/seedRouter');
const { errorResponse } = require('./controllers/responseController');
const { productRouter } = require('./routers/productRouter');
const app = express() ; 
app.use(express.json()) ; 

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api/users',userRouter) ;
app.use('/api/seed',seedRouter) ; 
app.use('/api/product',productRouter) ; 


// app.use(morgan('dev')) ;
app.get('/',(req,res)=>{
    res.status(200).send({
        message: 'Server is running'
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
    return errorResponse(res,{
        statusCode : err.status,
        message:err.message
    });

})  ; 



module.exports = app ; 