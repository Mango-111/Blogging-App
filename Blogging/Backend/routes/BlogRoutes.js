const express = require('express');
const { addBlog } = require('../Controller/BlogController');
const router = express.Router()

router.post('/addPost',(req,res)=>{
    addBlog(req,res);  
});

module.exports = router