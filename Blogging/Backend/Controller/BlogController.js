const Blog = require('../db/BlogSchema');
const multer = require("multer");
const path = require('path');


// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");

// To add uploaded files
async function addPosts(req,res){
    console.log("addpost method")
    upload(req, res, err => {
        if (err){
            return res.json({ success: false, err });
        }
            return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
        });
}

// Create post
async function createPost(req,res){
        let blog = await new Blog({ content: req.body.content, writer: req.body.userID });

        blog.save((err, postInfo) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({ success: true, postInfo })
        })
}

// get the blogs created by logged in user
async function getBlogs(req,res){
        await Blog.find()
        .populate("writer")
        .exec((err, blogs) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, blogs });
        });
}

// get the post
async function getPosts(req,res){
        console.log(req.body)
        await Blog.findOne({ "_id": req.body.postId })
            .populate('writer')
            .exec((err, post) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({ success: true, post })
            });
}
module.exports = {createPost,addPosts,upload,getBlogs,getPosts};
