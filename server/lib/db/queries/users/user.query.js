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
};
module.exports = user;
