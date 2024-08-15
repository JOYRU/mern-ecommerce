const multer = require("multer") ; 
const { uploadDir } = require("../secret");

 const UPLOAD_DIR = uploadDir ; 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload ; 
