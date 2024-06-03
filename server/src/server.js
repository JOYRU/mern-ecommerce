const express = require('express') ;
const app = express() ; 


// app.use(morgan('dev')) ;

app.get('./test',(req,res)=>{
    res.status(200).send({
        message: 'api testing is working'
    });
});

app.listen(3001 , ()=>{
    console.log('server is running a at ') ; 
    
}) ; 
