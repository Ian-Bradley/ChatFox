const pool = require('../pool');

const users = {
    /*================================================*/
    getUser: async function (userName) {
        const client = await pool.connect();
        const results = await client.query(`SELECT * FROM users WHERE name='${userName}'`);
        console.log('users-query ==> pool = ', pool);
        client.release();
        return results;
    },
    /*================================================*/
    getUsers: async function () {
        const client = await pool.connect();
        const results = await client.query(`SELECT * FROM users`);
        client.release();
        return results;
    },
    /*================================================*/
};
module.exports = users;
