/*================================================
    BLOCK: CONFIGS
==================================================*/

const config = require('../../config.env');
const { Pool } = require('pg');

const pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    database: config.db.name,
    user: config.db.user,
    password: config.db.password,
    max: 10, // default 10
    connectionTimeoutMillis: 2000, // default 0
    idleTimeoutMillis: 10000, // default 10000
    allowExitOnIdle: false, // default false - (true) allow the node event loop to exit as soon as all clients in the pool are idle, even if their socket is still open
});
module.exports = pool;

// const config = require('../config');
// const { Client } = require('pg');

// const configClient = {
//     user: config.db.user,
//     password: config.db.password,
//     host: config.db.host,
//     port: config.db.port,
//     database: config.db.name,
//     // connectionString?: string, // e.g. postgres://user:password@host:5432/database
//     idle_in_transaction_session_timeout: 5000, // default is 0
//     connectionTimeoutMillis: 3000, // default 0
//     query_timeout: 3000, // default 0
//     statement_timeout: 3000, // default 0
//     // application_name?: string, // The name of the application that created this Client instance
//     // ssl?: any, // passed directly to node.TLSSocket, supports all tls.connect options
//     // types?: any, // custom type parsers
// };
// const client = new Client(configClient);

/*================================================
    BLOCK: CALLS
==================================================*/


// pool.connect((err, client, release) => {
//     if (err) {
//         return console.error('Error acquiring client', err.stack);
//     }
//     client.query('SELECT NOW()', (err, result) => {
//         release();
//         if (err) {
//             return console.error('Error executing query', err.stack);
//         }
//         console.log(result.rows);
//     });
// });

// const { Pool } = require('pg');
// const pool = new Pool();
// (async function () {
//     const client = await pool.connect();
//     await client.query('SELECT NOW()');
//     client.release();
// })();
