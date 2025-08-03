const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { boolean } = require('webidl-conversions');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    main: {
        name: {
            type: String,
            required: true
        },
        gender: {
            type: Boolean,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        MBTI: {
            type: String,
            required: true
        },
        profileImageUrl: {
            type: String,
            required: true,
            default: ''
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
})

module.exports = mongoose.model('User', userSchema);