const config = require('../../../config.env.js');
const jwt = require('jsonwebtoken');

const jwtHandler = {
    /*================================================*/
    /*================================================*/
    // FUNCTION: => createAuthToken
    createAuthToken: function (userID) {
        const token = jwt.sign({ user_id: userID }, config.jwt.key_private, {
            algorithm: config.jwt.alg,
            expiresIn: config.jwt.expire,
        });
        return token;
    },
    /*================================================*/
    /*================================================*/
    // FUNCTION: => validateAuthToken
    validateAuthToken: function (token) {
        try {
            const decode = jwt.verify(token, config.jwt.key_public);
            return decode;
        } catch (err) {
            console.error(err);
            return null;
        }
    },
    /*================================================*/
    /*================================================*/
};
module.exports = jwtHandler;
