const pool = require('../../db.js');
const rooms = {
    /*================================================*/
    /*================================================*/
    getRooms: async function () {
        try {
            const client = await pool.connect();
            const results = await client.query(`SELECT * FROM rooms`);
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
module.exports = rooms;
