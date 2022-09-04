const pool = require('../db.js');
const messages = {
    /*================================================*/
    /*================================================*/
    // QUERY: => getMessages
    getMessages: async function () {
        try {
            const client = await pool.connect();
            const results = await client.query(`SELECT * FROM messages;`);
            client.release();
            return results.rows;
        } catch (error) {
            console.error(error);
            return [error.severity + ': ' + error.routine];
        }
    },
    /*================================================*/
    /*================================================*/
    // QUERY: => getMessagesForChannel
    getMessagesForChannel: async function (id) {
        try {
            const client = await pool.connect();
            const results = await client.query(`SELECT * FROM messages WHERE channel_id = ${id};`);
            client.release();
            return results.rows;
        } catch (error) {
            console.error(error);
            return [error.severity + ': ' + error.routine];
        }
    },
    /*================================================*/
    /*================================================*/
    // QUERY: => insertMessage
    insertMessage: async function (message) {
        try {
            let query = '';
            // TODO: too specific, use a freakin' query builder function
            messages.nickname
                ? (query = `INSERT INTO messages (channel_id, timestamp, name, content, color, nickname)
                 VALUES ('${message.channelID}', '${message.timestamp}', '${message.name}', '${message.content}', '${message.color}', '${message.nickname}');`)
                : (query = `INSERT INTO messages (channel_id, timestamp, name, content, color)
                 VALUES ('${message.channelID}', '${message.timestamp}', '${message.name}', '${message.content}', '${message.color}');`);
            const client = await pool.connect();
            const results = await client.query(query);
            client.release();
            return results;
        } catch (error) {
            console.error(error);
            return [error.severity + ': ' + error.routine];
        }
    },
    /*================================================*/
    /*================================================*/
    // QUERY: => deleteMessage
    deleteMessage: async function (id) {
        try {
            const client = await pool.connect();
            const results = await client.query(`DELETE FROM messages WHERE id = '${id}';`);
            client.release();
            return results;
        } catch (error) {
            console.error(error);
            return [error.severity + ': ' + error.routine];
        }
    },
    /*================================================*/
    /*================================================*/
};
module.exports = messages;
