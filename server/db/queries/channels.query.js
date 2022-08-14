const pool = require('../db.js');

const channels = {
    /*================================================*/
    geChannels: async function (userName) {
        const client = await pool.connect();
        const results = await client.query(`SELECT * FROM channels WHERE name='${userName}'`);
        console.log('channels-query ==> pool = ', pool);
        client.release();
        return results;
    },
    /*================================================*/
    getChannels: async function () {
        const client = await pool.connect();
        const results = await client.query(`SELECT * FROM channels`);
        client.release();
        return results;
    },
    /*================================================*/
};
module.exports = channels;
