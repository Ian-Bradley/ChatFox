const pool = require('../db.js');
const users = {
    /*================================================*/
    /*================================================*/
    // QUERY: => getUser
    getUser: async function (value) {
        try {
            const client = await pool.connect();
            let query = '';
            typeof value === 'number'
                ? (query = `SELECT * FROM users WHERE id = '${value}';`)
                : (query = `SELECT * FROM users WHERE UPPER(name) = UPPER('${value}');`);
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
                 VALUES ('${user.name}', '${user.password}') RETURNING id;`
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
    updateUser: async function (id, update) {
        // TODO: add other column, use Util function to build queries
        try {
            const client = await pool.connect();
            const results = await client.query(
                `UPDATE users SET ${update.column} = '${update.data}' WHERE id = '${id}';`
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
    deleteUser: async function (id) {
        try {
            const client = await pool.connect();
            const results = await client.query(`DELETE FROM users WHERE id = '${id}';`);
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
