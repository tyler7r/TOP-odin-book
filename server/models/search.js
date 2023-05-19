const mongoose = require('mongoose');
const Schema = mongoose.Schema

const SearchSchema = new Schema({
    search: { type: String },
})

SearchSchema.virtual('url').get(function() {
    return `/search/${this.id}`
})

module.exports = mongoose.model('Search', SearchSchema);