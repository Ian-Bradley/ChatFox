const pool = require('../db.js');

const users = {
    /*================================================*/
    /*================================================*/
    getUser: async function (userName) {
        try {
            const client = await pool.connect();
            const results = await client.query(`SELECT * FROM users WHERE name='${userName}'`);
            client.release();
            return results.rows;
        } catch (error) {
            console.error(error);
            return [];
        }
    },
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
            return [];
        }
    },
    /*================================================*/
    /*================================================*/
    getUsersForRoom: async function (roomID) {
        try {
            const client = await pool.connect();
            const results = await client.query(`SELECT * FROM users WHERE roomID = ${roomID}`);
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
module.exports = users;
