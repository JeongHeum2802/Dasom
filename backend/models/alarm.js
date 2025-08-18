const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const alarmSchema = new Schema({
    myNaverId : {
        type: String,
        required: true
    },
    type: {
        type : String,
        required : true
    },
    fromUser : {
        type : String
    },
    message: {
        type : String
    },
    isRead : {
        type: Boolean,
        default : false
    }
},{timestamps : true});

module.exports = mongoose.model('Alarm', alarmSchema);