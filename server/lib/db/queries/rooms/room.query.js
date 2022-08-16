const pool = require('../../db.js');
const room = {
    /*================================================*/
    /*================================================*/
    getRoom: async function (value) {
        try {
            const client = await pool.connect();
            let query = '';
            if (parseInt(value)) {
                query = `SELECT * FROM rooms WHERE id = ${value}`;
            } else {
                query = `SELECT * FROM rooms WHERE UPPER(name) = UPPER('${value}')`;
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
module.exports = room;
