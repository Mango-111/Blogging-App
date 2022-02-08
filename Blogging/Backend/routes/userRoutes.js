const express = require('express');
const { signup } = require('../Controller/authController');
const router = express.Router()
const {getUsers,logout,sendEmail,changePassword,updateProfile, getUserDetails,postUserData, postUsers} = require('../Controller/UserController')
verifyToken = require('../middleware/authJWT');
const {signin} =require('../Controller/authController');

router.post('/addUser',signup,(req,res)=>{
    postUsers(req,res);  
})
router.post('/Login',signin,(req,res)=>{
  console.log("Incoming data",req.password);
})
router.post('/loginUser',(req,res)=>{
  postUserData(req,res);
})
router.get('/getUsers',(req,res)=>{
  getUsers(req,res);
})
router.post('/Logout',(req,res)=>{
  logout(req,res);
})
router.post('/sendEmail',(req,res)=>{
  sendEmail(req,res);
})
router.post('/changePass',(req,res)=>{
  changePassword(req,res);
})
router.get('/Me',(req,res)=>{
  getUserDetails(req,res);
})
router.post('/editProfile',(req,res)=>{
  updateProfile(req,res);
})
router.get("/hiddencontent",verifyToken, function (req, res) {
    if (!req.user) {
      res.status(403)
        .send({
          message: "error"
        });
    }
    res.status(200)
    .send({
      message: "Congratulations!"
    });
  });

module.exports = router