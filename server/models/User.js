var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    interests: {
        type: String,
        trim: true
    },
    collections: [
        {
            title: String,
            resources: [String]
        }
    ],
    followers: {
        type: [String],
        default: 'everest'
    },
    recommends: [String],
    score: {
        type: Number,
        default: 0
    }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;