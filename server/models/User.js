var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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

//authenticate input against database documents
UserSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({ username: username })
        .exec(function (error, user) {
            if (error) {
                return callback(error);
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }

            bcrypt.compare(password, user.password, function (error, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            });
        });
}

//hash password before saving
UserSchema.pre('save', function (next) {
    var user = this;

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
