const config = require('../../config.env.js');
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