const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Pending', 'Accepted'] },
    time: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Request', RequestSchema);