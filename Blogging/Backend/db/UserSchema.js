const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const validator = require('validator');

const UserSchema = mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
        validate:[validator.isAlpha,"please enter valid First name"]
    },
    email: {
        type:String,
        required:[true,"Please enter your Email"],
        unique:true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
})


UserSchema.pre('save', function( next ) {
    var user = this;
    
    if(user.isModified('password')){    

        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

UserSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

UserSchema.methods.generateToken = function(cb) {
    var user = this;
    var token =  jwt.sign(user._id.toHexString(),'secret')

    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

UserSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token,'secret',function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}
module.exports = mongoose.model('User', UserSchema);