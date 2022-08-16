const user = require('./queries/users/user.query.js');
const users = require('./queries/users/users.query.js');
const room = require('./queries/rooms/room.query.js');
const rooms = require('./queries/rooms/rooms.query.js');

const dbQuery = {
    user,
    users,
    room,
    rooms,
};
module.exports = dbQuery;
