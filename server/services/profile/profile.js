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

    const saveProfilePhoto = async (id, data) => {
        try {
            const replacedBase64String = data.replace(/^data:image\/[a-z]+;base64,/, "");
            const savePhoto = axios.create({
                headers: {
                    'Authorization': `Client-ID ${process.env.CLIENT_ID}`
                }
            });

            savePhoto
                .post(process.env.IMAGE_UPLOAD_URL, replacedBase64String)
                .then(async (response) => {
                    console.log(response.data);
                    try {
                        const query = {
                            _id: id
                        };

                        const update = {
                            $set: {
                                image: {
                                    link: response.data.data.link,
                                    id: response.data.data.id,
                                    deleteHash: response.data.data.deleteHash
                                }
                            },
                            safe: {
                                new: true,
                                upsert: true
                            }
                        };
                        const user = await User.updateOne(query, update).exec();
                        console.log(`Image uploaded with id: ${response.data.data.id}`);
                        return {
                            error: false,
                            message: {
                                status: 200,
                                data: {
                                    id: response.data.data.id,
                                    deleteHash: response.data.data.deletehash,
                                    link: response.data.data.link
                                }
                            }
                        };
                    } catch (err) {
                        console.log(err);
                        return {
                            error: err.message
                        };
                    }
                })
                .catch((error) => {
                    console.log(`Error: ${error.response.status} - ${error.response.statusText}`);
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

    const deleteProfilePhoto = async (id, deleteHash) => {
        try {
            const deletePhoto = axios.create({
                headers: {
                    'Authorization': `Client-ID ${process.env.CLIENT_ID}`
                }
            });
            deletePhoto
                .delete(`${process.env.IMAGE_DELETE_URL}/${deleteHash}`)
                .then(async (response) => {
                    const query = {
                        _id: id
                    };

                    const update = {
                        $set: {
                            image: {
                                link: null,
                                id: null,
                                deleteHash: null
                            }
                        },
                        safe: {
                            new: true,
                            upsert: true
                        }
                    };
                    const user = await User.updateOne(query, update).exec();
                    console.log(`Image deleted`);
                    return {
                        error: false,
                        message: {
                            status: 200
                        }
                    };
                })
                .catch((error) => {
                    console.log(`Error: ${error.response.status} - ${error.response.statusText}`);
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
        saveProfilePhoto,
        deleteProfilePhoto
    }
})();

module.exports = Profile;