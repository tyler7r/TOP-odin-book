const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
   first_name: { type: String, maxLength: 15, minLength: 2, required: true },
   last_name: { type: String, maxLength: 15, minLength: 2, required: true },
   username: { type: String, maxLength: 15, minLength: 2, required: true },
   password: { type: String, minLength: 2, required: true, maxLength: 20 },
   posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
   friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
   sentRequests: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
   receivedRequests: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
   profilePic: { type: String },
   profileBio: { type: String, maxLength: 60 }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
})

UserSchema.virtual('fullName').get(function() {
    return `${this.first_name} ${this.last_name}`
})

UserSchema.virtual('url').get(function() {
    return `/users/${this.id}`
})

module.exports = mongoose.model('User', UserSchema)