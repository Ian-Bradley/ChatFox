const pool = require('../pool');

const rooms = {
    /*================================================*/
    getRoom: async function (userName) {
        const client = await pool.connect();
        const results = await client.query(`SELECT * FROM rooms WHERE name='${userName}'`);
        console.log('rooms-query ==> pool = ', pool);
        client.release();
        return results;
    },
    /*================================================*/
    getRooms: async function () {
        const client = await pool.connect();
        const results = await client.query(`SELECT * FROM rooms`);
        client.release();
        return results;
    },
    /*================================================*/
};
module.exports = rooms;
