const pool = require('../db.js');
const room = {
    /*================================================*/
    /*================================================*/
    // QUERY: => getRoom
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
    // QUERY: => getRooms
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
module.exports = room;
