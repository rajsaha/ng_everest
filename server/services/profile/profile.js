const User = require('../../models/User');

const Profile = (() => {
    const getProfileData = async (username) => {
        try {
            const user = await User.findOne({ username: username }, { 'password': 0 }).exec();
            return {
                userData: user
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    }

    const updateProfileData = async (data) => {
        let _id = data._id;
        let name = data.name || '';
        let website = data.website || '';
        let bio = data.bio || '';
        let email = data.email || '';

        try {
            const user = await User.updateOne({ _id: _id }, {
                $set: {
                    name: name,
                    website: website,
                    bio: bio,
                    email: email
                }
            }).exec();

            return {
                message: 'User details updated',
                newData: data
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    }

    return {
        getProfileData,
        updateProfileData
    }
})();

module.exports = Profile;