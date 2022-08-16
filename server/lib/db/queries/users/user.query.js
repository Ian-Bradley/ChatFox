const pool = require('../../db.js');

const user = {
    /*================================================*/
    /*================================================*/
    getUser: async function (value) {
        try {
            const client = await pool.connect();
            let column = '';
            if (parseInt(value)) {
                column = 'id';
            } else {
                column = 'name';
            }
            const results = await client.query(`SELECT * FROM users WHERE ${column}='${value}'`);
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
module.exports = user;
