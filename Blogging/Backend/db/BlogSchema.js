const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const blogSchema = mongoose.Schema({
    content: {
        type:String,
        required:[true,"Please enter blog content"],
        validate:[validator.isAlpha,"please enter valid content"]
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Blog', blogSchema);
