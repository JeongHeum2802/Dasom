const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chatRoom: {
        type: mongoose.Types.ObjectId,
        ref: 'ChatRoom',
        required: true
    },
    sender: {
        type: String,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);