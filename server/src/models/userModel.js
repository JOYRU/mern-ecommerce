const {Schema , model} = require('mongoose') ; 
const bcrypt = require('bcrypt') ; 
const userSchema = new Schema({
    name: {
        type:String,
        required:[true,'User name is missing'],
        trim:true,
        maxlength:[31, 'user name can be max 31 cha'],

    },
    email:{
        type:String, 
        require:[true,'user email is required'],
        trim:true,
        validate:{
            validator: function(v) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) ; 
            }
        }

    },
    password: {
        type:String,
        required:[true,'User password is required'],
        set:(v) => bcrypt.hashSync(v,bcrypt.genSaltSync(10)) ,
    },
    image: {
        type:String ,
        default: 'public/images/users/default.png'
        
    },
    address:{
        type:String,
    },
    phone:{
        type:String,
    },
    isAdmin:{
        type:Boolean , 
        default:false
    } , 

    isBanned:{
    type:Boolean,
    default:false
    },



},{timestamps: true}) ; 


const User = model('Users',userSchema) ;

module.exports = User ; 