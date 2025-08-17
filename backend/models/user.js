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
        },
        initUser: {
            type: Boolean,
            default: true
        }
    },
    others: {
        friends: {
            type: [String]
        },
        socialUrl: {
            type: [String]
        }
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);