const mongoose = require('mongoose');
const validator = require('validator');
const BlogSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:[true,"Please enter Blog title"],
        maxLength: [100, "Title cannot exceed 100 characters"],
        minLength: [4, "Title should have more than 4 characters"],
        validate:[validator.isAlpha,"please enter valid First name"]
    },
    Body:{
        type:String,
        required:[true,"Please enter body of the blog"],
    },
    Tags:{
        type:String,       
        required:[false,"Please enter tags"],
        validate:[validator.isAlpha,"please enter valid alpha tags"]
    },
    Blog_img:{
        type:String,
        required:false,
    },
    date:{
        type:Date,
        default:Date.now
    },
});

module.exports=mongoose.model("Blog",BlogSchema);