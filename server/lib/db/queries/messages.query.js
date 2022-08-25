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
            const client = await pool.connect();
            const results = await client.query(
                `INSERT INTO messages (channel_id, timestamp, name, content)
                 VALUES ('${message.channelID}', '${message.timestamp}', '${message.name}', '${message.content}');`
            );
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
    deleteMessage: async function (name) {
        try {
            const client = await pool.connect();
            const results = await client.query(`DELETE * FROM messages WHERE UPPER(name) = UPPER('${name}');`);
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
