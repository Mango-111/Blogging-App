const BlogModel = require('../db/BlogSchema')

// To add users
async function addBlog(data){
    let ins =await new BlogModel(data);
    ins.save((err)=>{
        if (err){
            console.log(err);
        };
    })
}

module.exports = {addBlog};
