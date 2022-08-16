const pool = require('../../db.js');
const users = {
    /*================================================*/
    /*================================================*/
    getUsers: async function () {
        try {
            const client = await pool.connect();
            const results = await client.query(`SELECT * FROM users`);
            client.release();
            return results.rows;
        } catch (error) {
            console.error(error);
            return [error.severity + ': ' + error.routine];
        }
    },
    /*================================================*/
    /*================================================*/
    getUsersByRoomID: async function (value) {
        try {
            const client = await pool.connect();
            const results = await client.query(`SELECT * FROM users WHERE room_id = ${value}`);
            client.release();
            return results.rows;
        } catch (error) {
            console.error(error);
            return [error.severity + ': ' + error.routine];
        }
    },
    /*================================================*/
    /*================================================*/
};
module.exports = users;
