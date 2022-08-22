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
    // QUERY: => deleteMessage (name||id)
    deleteMessage: async function (value) {
        try {
            const client = await pool.connect();
            let query = '';
            if (parseInt(value)) {
                query = `DELETE * FROM messages WHERE id = ${value};`;
            } else {
                query = `DELETE * FROM messages WHERE UPPER(name) = UPPER('${value}');`;
            }
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
};
module.exports = messages;
