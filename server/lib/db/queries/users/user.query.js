const pool = require('../../db.js');
const user = {
    /*================================================*/
    /*================================================*/
    getUser: async function (value) {
        try {
            const client = await pool.connect();
            let query = '';
            if (parseInt(value)) {
                query = `SELECT * FROM users WHERE id = ${value}`;
            } else {
                query = `SELECT * FROM users WHERE UPPER(name) = UPPER('${value}')`;
            }
            const results = await client.query(query);
            client.release();
            return results.rows;
        } catch (error) {
            console.error(error);
            return [error.severity + ': ' + error.routine];
        }
    },
    /*================================================*/
    /*================================================*/
    insertUser: async function (user) {
        try {
            const client = await pool.connect();
            const results = await client.query(`INSERT INTO users (name, password) VALUES (${user.name}, ${user.password})`);
            client.release();
            console.log(results);
            return results;
        } catch (error) {
            console.error(error);
            return [error.severity + ': ' + error.routine];
        }
    },
    /*================================================*/
    /*================================================*/
    updateUser: async function (value) {
        // try {
        //     const client = await pool.connect();
        //     const results = await client.query(`SELECT * FROM users WHERE id = ${value}`);
        //     client.release();
        //     return results;
        // } catch (error) {
        //     console.error(error);
        //     return [error.severity + ': ' + error.routine];
        // }
    },
    /*================================================*/
    /*================================================*/
    deleteUser: async function (value) {
        // try {
        //     const client = await pool.connect();
        //     const results = await client.query(`SELECT * FROM users WHERE id = ${value}`);
        //     client.release();
        //     return results;
        // } catch (error) {
        //     console.error(error);
        //     return [error.severity + ': ' + error.routine];
        // }
    },
    /*================================================*/
    /*================================================*/
};
module.exports = user;