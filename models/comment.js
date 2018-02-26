const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Article = require('./article');

const CommentSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

const Comment = module.exports = mongoose.model('comment', CommentSchema);

module.exports.addComment = async function(body) {
    const comment = new Comment({
        subject: body.subject,
        author: body.author,
        message: body.message
    });

    return comment.save();

};
