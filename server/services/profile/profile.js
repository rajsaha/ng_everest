const User = require('../../models/User');
const axios = require('axios');

const Profile = (() => {
    const getProfileData = async (username) => {
        try {
            const user = await User.findOne({
                username: username
            }, {
                'password': 0
            }).exec();
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
        const _id = data.id;
        const name = data.name || '';
        const website = data.website || '';
        const bio = data.bio || '';
        const email = data.email || '';
        const interests = data.interests || [];

        const query = {
            _id: _id
        };
        const update = {
            $set: {
                name: name,
                website: website,
                bio: bio,
                email: email,
            },
            $addToSet: {
                interests: {
                    $each: interests
                }
            },
            safe: {
                new: true,
                upsert: true
            }
        };

        try {
            const user = await User.updateOne(query, update).exec();
            return {
                message: 'User details updated',
            }
        } catch (err) {
            console.log(err);
            return {
                error: err.message
            };
        }
    }

    const removeInterest = async (data) => {
        try {
            const user = await User.updateOne({
                _id: data.id
            }, {
                $pull: {
                    interests: data.interest
                }
            }).exec();
            return {
                message: `${data.interest} removed`
            }
        } catch (err) {
            console.log(err);
            return {
                error: err.message
            };
        }
    }

    const saveProfilePhoto = async (data) => {
        try {
            const replacedBase64String = data.replace(/^data:image\/[a-z]+;base64,/, "");
            let buff = new Buffer(replacedBase64String);
            let base64Image = buff.toString('base64');
            const savePhoto = axios.create({
                headers: {
                    'Authorization': `Client-ID ${process.env.CLIENT_ID}`
                }
            });

            const package = {
                image: base64Image,
                type: 'base64',
                title: 'Imgur'
            };

            savePhoto
                .post(process.env.IMAGE_UPLOAD_URL, package)
                .then((response) => {
                    return {
                        message: response
                    };
                })
                .catch((error) => {
                    console.log(error);
                    return {
                        message: `Error: ${error.response.status} - ${error.response.statusText}`
                    };
                });

        } catch (err) {
            console.log(err);
            return {
                error: err.message
            };
        }
    }

    return {
        getProfileData,
        updateProfileData,
        removeInterest,
        saveProfilePhoto
    }
})();

module.exports = Profile;