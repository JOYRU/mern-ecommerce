require('dotenv').config() ; 
const serverPort = process.env.SERVER_PORT ; 
module.exports = {serverPort}

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || 'ahahihaighaigag_28y2266283' ; 

const smtpUsername = process.env.SMTP_USERNAME || '' ; 
const smtpPassword = process.env.SMTP_PASSWORD || '' ; 


module.exports = {jwtActivationKey , smtpUsername ,smtpPassword }