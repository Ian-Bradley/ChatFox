require('dotenv').config({ path: '../.env' });
const ENV = process.env.NODE_ENV;
console.log(process.env.NODE_ENV);
/*================================================*/
const dev = {
    server: {
        ip: process.env.DEV_APP_IP || '0.0.0.0',
        port: parseInt(process.env.DEV_APP_PORT) || 3001,
        domain: process.env.DEV_APP_DOMAIN || 'localhost',
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'db',
        user: process.env.DEV_DB_USER || '',
        password: process.env.DEV_DB_PASSWORD || '',
    },
};
/*================================================*/
const test = {
    server: {
        ip: process.env.TEST_APP_IP || '0.0.0.0',
        port: parseInt(process.env.TEST_APP_PORT) || 3001,
        domain: process.env.TEST_APP_DOMAIN || 'localhost',
    },
    db: {
        host: process.env.TEST_DB_HOST || 'localhost',
        port: parseInt(process.env.TEST_DB_PORT) || 27017,
        name: process.env.TEST_DB_NAME || 'test',
        user: process.env.TEST_DB_USER || '',
        password: process.env.TEST_DB_PASSWORD || '',
    },
};
/*================================================*/
const prod = {
    server: {
        ip: process.env.PROD_APP_IP || '0.0.0.0',
        port: parseInt(process.env.PROD_APP_PORT) || 3001,
        domain: process.env.PROD_APP_DOMAIN || 'localhost',
    },
    db: {
        host: process.env.PROD_DB_HOST || 'localhost',
        port: parseInt(process.env.PROD_DB_PORT) || 27017,
        name: process.env.PROD_DB_NAME || 'dbch',
        user: process.env.PROD_DB_USER || '',
        password: process.env.PROD_DB_PASSWORD || '',
    },
};
/*================================================*/
const config = {
    prod,
    dev,
    test,
};
module.exports = config[ENV];
