const users = require('./queries/users.query.js');
const channels = require('./queries/channels.query.js');
const messages = require('./queries/messages.query.js');

const dbQuery = {
    users,
    channels,
    messages,
};
module.exports = dbQuery;
