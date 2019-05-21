const User = require('../../models/User');

const Login = (() => {
    const login = async (username, password) => {
        try {
            const user = await User.findOne({ username: username }).exec();

            // If no username found
            if (!user) {
                return {
                    status: 404,
                    error: "The username does not exist"
                };
            }

            // Compare plaintext password with hash
            const match = user.comparePassword(password, (error, match) => {
                return match;
            });

            if (match) {
                return {
                    message: "Logged in",
                    username: username
                }
            } else {
                return {
                    status: 400,
                    error: 'Username/password invalid'
                }
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    }

    return {
        login
    }
})();

module.exports = Login;