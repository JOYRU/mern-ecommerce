var jwt = require('jsonwebtoken') ; 
const createJSONWebToken = (payload , secretKey, expiresIn)=>{

    var token = jwt.sign({foo: 'bar'} , 'shhhhh' , {expiresIn:'10m'}) ; 
    const token = jwt.sign(payload,secretKey,)

}