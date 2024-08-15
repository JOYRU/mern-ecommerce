require('dotenv').config() ; 
const serverPort = process.env.SERVER_PORT ; 
module.exports = {serverPort}
const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || 'public/images/users/default.png'


const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || 'ahahihaighaigag_28y2266283' ; 

const smtpUsername = process.env.SMTP_USERNAME || '' ; 
const smtpPassword = process.env.SMTP_PASSWORD || '' ; 

const uploadDir = process.env.UPLOAD_FILE || 'public/images/users' ; 

// const uploadDir = public/images/users ;

//module.exports = {jwtActivationKey , smtpUsername ,smtpPassword , uploadDir }
module.exports = {jwtActivationKey , smtpUsername ,smtpPassword,uploadDir}