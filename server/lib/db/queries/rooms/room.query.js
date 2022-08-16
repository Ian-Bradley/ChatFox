const pool = require('../../db.js');

const room = {
    /*================================================*/
    /*================================================*/
    getRoom: async function (value) {
        try {
            const client = await pool.connect();
            let column = '';
            if (parseInt(value)) {
                column = 'id';
            } else {
                column = 'name';
            }
            const results = await client.query(`SELECT * FROM rooms WHERE ${column}='${value}'`);
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
module.exports = room;
