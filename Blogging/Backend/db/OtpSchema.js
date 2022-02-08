const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    code:{
      type:String,
      required:true
    },
    expiresIn:{
        type:Number,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("OTP",otpSchema);