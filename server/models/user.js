const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
   
})

UserSchema.virtual('url').get(function() {
    return `/users/${this.id}`
})

module.exports = mongoose.model('User', UserSchema)