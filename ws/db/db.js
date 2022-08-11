const config = require('../config');
const { Client } = require('pg');
const client = new Client({
    host: config.db.host,
    port: config.db.port,
    name: config.db.name,
    user: config.db.user,
    password: config.db.password,
});

client
    .connect()
    .then(() => console.log('Connected'))
    .then(() => client.query('SELECT name FROM users'))
    .then((res) => console.table(res.rows))
    .catch((err) => console.log(err))
    .finally(() => client.end());
