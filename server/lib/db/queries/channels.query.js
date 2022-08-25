const pool = require('../db.js');
const channels = {
    /*================================================*/
    /*================================================*/
    // QUERY: => getChannels
    getChannels: async function () {
        try {
            const client = await pool.connect();
            const results = await client.query(`SELECT * FROM channels;`);
            client.release();
            return results.rows;
        } catch (error) {
            console.error(error);
            return [error.severity + ': ' + error.routine];
        }
    },
    /*================================================*/
    /*================================================*/
    // QUERY: => insertChannel
    insertChannel: async function (channel) {
        try {
            const client = await pool.connect();
            const results = await client.query(
                `INSERT INTO channels (name, password, description)
                 VALUES ('${channel.name}', '${channel.password}', '${channel.description}');`
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
    // QUERY: => updateChannel
    updateChannel: async function (name) {
        try {
            const client = await pool.connect();
            // TODO: update channel
            // const results = await client.query(`UPDATE * FROM channels WHERE UPPER(name) = UPPER('${name}');`);
            client.release();
            return results;
        } catch (error) {
            console.error(error);
            return [error.severity + ': ' + error.routine];
        }
    },
    /*================================================*/
    /*================================================*/
    // QUERY: => deleteChannel
    deleteChannel: async function (name) {
        try {
            const client = await pool.connect();
            const results = await client.query(`DELETE * FROM channels WHERE UPPER(name) = UPPER('${name}');`);
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
module.exports = channels;
