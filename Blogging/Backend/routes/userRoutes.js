const express = require('express');
const { authenticate, addUsers, Login, logout } = require('../Controller/UserController');
const router = express.Router();
const { auth } = require("../middleware/authJWT");

router.get("/auth", auth, (req, res) => {
  authenticate(req,res);
});

router.post("/register",(req, res) => {
  addUsers(req,res);
});

router.post("/login",(req, res) => {
  Login(req,res);
});

router.get("/logout", auth, (req, res) => {
  logout(req,res);
});

module.exports = router;