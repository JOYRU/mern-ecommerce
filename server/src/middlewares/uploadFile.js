const multer = require("multer") ; 
const path  = require('path') ; 
const createError = require('http-errors') ; 
const { uploadDir } = require("../secret");

 const UPLOAD_DIR = uploadDir ; 
 const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE )|| 2097152;
 const ALLOWED_FILE_TYPES = process.env.ALLOWED_FILE_TYPES || ['jpg','jpeg','png']  ; 

const storage = multer.memoryStorage(
  //{
  //   destination: function (req, file, cb) {
  //     cb(null,UPLOAD_DIR)
  //   },
  //   // filename: function (req, file, cb) {
  //   //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  //   //   cb(null, file.fieldname + '-' + uniqueSuffix)
  //   // }

  //   filename: function(req,file , cb){
  //     const extname = path.extname(file.originalname) ; 
  //     cb(null, Date.now() + "-"+ file.originalname.replace(extname,'')+extname) ; 

  //   },
  // }


) ; 

  const fileFilter = (req,file,cb)=>{
      // if(!file.mimetype.startsWith("image/")){
      //   return cb(new Error('Only image files are allowed'),false) ; 

      // }
      if(file.size> MAX_FILE_SIZE){
        return cb(new Error('File size exceeds the maximum limit'),false) ;

      }
      // if(!ALLOWED_FILE_TYPES.includes(file.mimetype)){
      //     return cb(new Error('File type is not allowed'),false) ; 

      // }
      cb(null,true) ; 

  }
  
  const upload = multer({ storage: storage,
    
  fileFilter:fileFilter
   }) ;

  module.exports = upload ; 
