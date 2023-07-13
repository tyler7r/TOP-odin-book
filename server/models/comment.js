const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: { type: String, maxLength: 160 },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    time: { type: Date, default: Date.now() },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    interactions: { type: Number, default: 0 }
})

module.exports = mongoose.model('Comment', CommentSchema);