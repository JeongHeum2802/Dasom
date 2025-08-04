const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    main: {
        name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        MBTI: {
            type: String,
            default: ''
        },
        profileImageUrl: {
            type: String,
            default: ''
        },
        naverId: {
            type: String,
            required: true
        }
    },
    others: {
        friends: {
            type: [Schema.Types.ObjectId]
        },
        socialUrl: {
            type: [String]
        }
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);