const users = require('./queries/users.query.js');
const rooms = require('./queries/rooms.query.js');

const dbQuery = {
    users,
    rooms,
};
module.exports = dbQuery;
