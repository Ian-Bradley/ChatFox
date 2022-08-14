require('dotenv').config({ path: '../.env' });
const ENV = process.env.NODE_ENV;
// console.log('/config.js: NODE_ENV = ', process.env.NODE_ENV);
/*================================================*/
/*================================================*/
const development = {
    server: {
        ip: process.env.DEV_APP_IP || '0.0.0.0',
        port: parseInt(process.env.DEV_APP_PORT) || 3001,
        domain: process.env.DEV_APP_DOMAIN || 'localhost',
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 5432,
        name: process.env.DEV_DB_NAME || 'postgres',
        user: process.env.DEV_DB_USER || 'postgres',
        password: process.env.DEV_DB_PASSWORD || '123',
    },
};
/*================================================*/
/*================================================*/
const production = {
    server: {
        ip: process.env.PROD_APP_IP || '0.0.0.0',
        port: parseInt(process.env.PROD_APP_PORT) || 3001,
        domain: process.env.PROD_APP_DOMAIN || 'localhost',
    },
    db: {
        host: process.env.PROD_DB_HOST || 'localhost',
        port: parseInt(process.env.PROD_DB_PORT) || 5432,
        name: process.env.PROD_DB_NAME || 'postgres',
        user: process.env.PROD_DB_USER || 'postgres',
        password: process.env.PROD_DB_PASSWORD || '123',
    },
};
/*================================================*/
/*================================================*/
const config = {
    production,
    development,
};
module.exports = config[ENV];
