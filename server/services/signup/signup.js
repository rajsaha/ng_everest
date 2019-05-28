const User = require('../../models/User');
const mongoose = require('mongoose');
const Validation = require('../validation/validation');

const Signup = (() => {
    const signup = async (data) => {
        return await Validation.SignUpDataValidation(data).then(async (res) => {
            if (res.status) {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: data.email,
                    username: data.username,
                    password: data.password
                });

                try {
                    await user.save();
                    return {
                        status: 200,
                        message: "Signup successful",
                        username: data.username
                    };
                } catch (error) {
                    return {
                        status: 500,
                        error: error.message
                    };
                }
            } else {
                return {
                    status: 500,
                    error: res.messages,
                    message: 'Validation failed'
                };
            }
        });
    }

    return {
        signup
    }
})();

module.exports = Signup;