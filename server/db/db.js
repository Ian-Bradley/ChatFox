/*================================================
    BLOCK: IMPORTS
==================================================*/

const users = require('./queries/users.query.js');
const rooms = require('./queries/rooms.query.js');
const channels = require('./queries/channels.query.js');

/*================================================
    BLOCK: DATABASE DECLARATION
==================================================*/

const db = {
    users,
    rooms,
    channels,
};
// console.log('db ==> db = ', db);
module.exports = db;
