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
        // TODO: add other column, use Util function to build queries
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
    updateChannel: async function (id, update) {
        try {
            const client = await pool.connect();
            const results = await client.query(
                `UPDATE channels SET ${update.column} = '${update.data}' WHERE id = '${id}';`
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
    // QUERY: => deleteChannel
    deleteChannel: async function (id) {
        try {
            const client = await pool.connect();
            const results = await client.query(`DELETE FROM channels WHERE id = '${id}';`);
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
