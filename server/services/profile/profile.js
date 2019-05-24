const User = require('../../models/User');

const Profile = (() => {
    const getProfileData = async (username) => {
        try {
            const user = await User.findOne({username: username}, {'password': 0}).exec();
            return {
                userData: user
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    }

    return {
        getProfileData
    }
})();

module.exports = Profile;