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
            return error;
            // return [];
        }
    },
    /*================================================*/
    /*================================================*/
    getUsersByRoomID: async function (value) {
        try {
            const client = await pool.connect();
            let column = '';
            if (parseInt(value)) {
                column = 'roomID';
            } else {
                column = 'name';
            }
            const results = await client.query(`SELECT * FROM users WHERE ${column}=${value}`);
            client.release();
            return results.rows;
        } catch (error) {
            console.error(error);
            return error;
            // return [];
        }
    },
    /*================================================*/
    /*================================================*/
};
module.exports = users;
