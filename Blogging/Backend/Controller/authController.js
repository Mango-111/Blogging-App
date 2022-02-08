var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../db/UserSchema");

exports.signup = (req, res) => {
    const user = new User({
    firstname: req.body.firstname,
    LastName:req.body.LastName,
    mobile:req.body.mobile,
    gender:req.body.gender,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500)
        .send({
          message: "Please enter valid credentials",
          err:err.message
        });
      return;
    } else {
      res.status(200)
        .send({
          message: "User Registered successfully"
        })
    }
  });
};

exports.signin = (req, res) =>{
 User.findOne({email:req.body.email},(err,user)=>{
  if(!user){
    res.status(200).json({
      success:false,
      message:"user not found"
    })
  }
  else if(req.body.email == null || req.body.password == null){
    res.json({
      status_code:404,
      success:false,
      message:"Error"
    })
  }
  else{
    if(req.body.email == user.email && bcrypt.compareSync(req.body.password,user.password)){
    

     const token = jwt.sign(   { _id: user._id }, 
       "saddksadljjljjkjjkjlj",  {  expiresIn: "20h",  }  );
       res.status(200).json({
         status:true,
         message:"Logged In successfully",
         accessToken:token
       })
       console.log("Myemail",user.email)
    }
    else{
     res.status(200).json({
       status:false,
       message:"Enter correct credentials",
     })
    }
  }
 })
 
};
