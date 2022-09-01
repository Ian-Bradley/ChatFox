const pool = require('../db.js');
const users = {
    /*================================================*/
    /*================================================*/
    // QUERY: => getUser
    getUser: async function (name) {
        try {
            const client = await pool.connect();
            const results = await client.query(
                `SELECT * FROM users WHERE UPPER(name) = UPPER('${name}');`
            );
            client.release();
            return results.rows;
        } catch (error) {
            console.error(error);
            return [error.severity + ': ' + error.routine];
        }
    },
    /*================================================*/
    /*================================================*/
    // QUERY: => getUsers
    getUsers: async function () {
        try {
            const client = await pool.connect();
            const results = await client.query(`SELECT * FROM users;`);
            client.release();
            return results.rows;
        } catch (error) {
            console.error(error);
            return [error.severity + ': ' + error.routine];
        }
    },
    /*================================================*/
    /*================================================*/
    // QUERY: => insertUser
    insertUser: async function (user) {
        try {
            const client = await pool.connect();
            const results = await client.query(
                `INSERT INTO users (name, password)
                 VALUES ('${user.name}', '${user.password}');`
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
    // QUERY: => updateUser
    updateUser: async function (name, update) {
        try {
            const client = await pool.connect();
            const results = await client.query(
                `UPDATE users SET ${update.column} = '${update.data}' WHERE name = '${name}';`
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
    // QUERY: => deleteUser
    deleteUser: async function (name) {
        try {
            const client = await pool.connect();
            const results = await client.query(
                `DELETE FROM users WHERE UPPER(name) = UPPER('${name}');`
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
};
module.exports = users;
