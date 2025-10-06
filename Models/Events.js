const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let eventSchema = new Schema({
    eventname: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Event", eventSchema);
