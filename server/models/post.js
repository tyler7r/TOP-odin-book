const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    text: { type: String, maxLength: 250 },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    time: { type: Date, default: Date.now() },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likeNo: { type: Number, default: 0 },
    image: { type: String },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

PostSchema.virtual('url').get(function() {
    return `/post/${this.id}`
})

module.exports = mongoose.model('Post', PostSchema);