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
    // QUERY: => updateChannel (name||id)
    updateChannel: async function (value) {
        try {
            const client = await pool.connect();
            // TODO: update channel
            // const results = await client.query(`SELECT * FROM channels WHERE id = ${value}`);
            client.release();
            return results;
        } catch (error) {
            console.error(error);
            return [error.severity + ': ' + error.routine];
        }
    },
    /*================================================*/
    /*================================================*/
    // QUERY: => deleteChannel (name||id)
    deleteChannel: async function (value) {
        try {
            const client = await pool.connect();
            let query = '';
            if (parseInt(value)) {
                query = `DELETE * FROM channels WHERE id = ${value};`;
            } else {
                query = `DELETE * FROM channels WHERE UPPER(name) = UPPER('${value}');`;
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
module.exports = channels;
