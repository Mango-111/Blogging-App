const express = require('express');
const { upload, createPost, getBlogs, getPosts, addPosts } = require('../Controller/BlogController');
const router = express.Router()

router.post('/uploadfiles',(req,res)=>{ 
    addPosts(req,res);
});
router.post('/createPost',(req,res)=>{
    createPost(req,res);  
});
router.get('/getBlogs',(req,res)=>{
    getBlogs(req,res);  
});
router.post('/getPost',(req,res)=>{
    getPosts(req,res);  
});

module.exports = router