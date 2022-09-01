const functions = require('./helpers/functions.js');
const jwtHandler = require('./jwt/jwt.js');

const Util = {
        // Helpers - Constants

        // Helpers - Functions
        // shuffleArray: functions.shuffleArray,
        parseCookies: functions.parseCookies,

        // JWT (JSON Web Token)
        createAuthToken: jwtHandler.createAuthToken,
        validateAuthToken: jwtHandler.validateAuthToken,
    
};
module.exports = Util;