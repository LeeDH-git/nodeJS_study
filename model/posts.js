let mongoose = require('mongoose')

let postSchema = mongoose.Schema({
    title: { type: String, required: true },
    contents: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    upadteAt: { type: Date }
});

let post = mongoose.model('post', postSchema)
module.exports = post;