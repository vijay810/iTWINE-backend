const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let smsSchema = new Schema({

    date: {
        type: Date,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },

}, {
    collection: 'sms'
})
module.exports = mongoose.model('sms', smsSchema)