const pool = require('../db.js');

const rooms = {
    /*================================================*/
    /*================================================*/
    getRoom: async function (userName) {
        try {
            const client = await pool.connect();
            const results = await client.query(`SELECT * FROM rooms WHERE name='${userName}'`);
            client.release();
            return results.rows;
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    /*================================================*/
    /*================================================*/
    getRooms: async function () {
        try {
            const client = await pool.connect();
            const results = await client.query(`SELECT * FROM rooms`);
            client.release();
            return results.rows;
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    /*================================================*/
    /*================================================*/
};
module.exports = rooms;
