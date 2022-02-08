const mongoose = require('mongoose');
const validator = require('validator');
const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
        validate:[validator.isAlpha,"please enter valid First name"]
    },
    LastName:{
        type:String,
        required:[true,"Please enter your last name"],
        validate: [validator.isAlpha, "Please Enter a valid Last name"],
    },
    email:{
        type:String,       
        required:[true,"Please enter your Email"],
        unique:true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password:{
        type:String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
    },
    profile_img:{
        type:String,
        required:false,
    },
    date:{
        type:Date,
        default:Date.now
    },
});

module.exports=mongoose.model("User",UserSchema);