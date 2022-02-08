const jwt = require('jsonwebtoken')
const User = require('../db/UserSchema')
const verifyToken=async (req, res, next) => {

 
  if(req.headers.authorization){  
      try { 
          const token = req.headers.authorization.split(" ")[1]; 
          const SECRET_KEY ="saddksadljjljjkjjkjlj"; 
          const veriyfyToken = jwt.verify(token,SECRET_KEY);
          // req.user=veriyfyToken._id;
          User.findOne({
            _id: veriyfyToken._id
          })
          .exec((err, user) => {
            if (err) {
              res.status(500)
                .send({
                  message:"Internal server error"
                });
            } else {
              req.user = user;
              next();
            }
          });
          // next()

      } catch (error) {
          console.log(error.message)
           return res.status(400).json({message:"invalid authorization"})
      }
      

  }else{
      return res.status(400).json({message:"invalid authorization header not set"})
     
  }
}

  module.exports = verifyToken;