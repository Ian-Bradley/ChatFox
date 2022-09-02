const dbQuery = require('../../db/root.query.js');
const Util = require('../../util/util.js');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
/*================================================*/
/*================================================*/
// ROUTE: => REGISTER
router.post('/', async function (req, res) {
    // console.log('=====REGISTER======');
    // console.log('req.body: ', req.body);
    try {
        // ==> Validate data for account requirements
        const { name, password } = req.body;
        if (!(name && password)) {
            res.status(400).json({ error: 'Missing data' });
        }
        if (name.length < 3 || password.length < 3) {
            res.status(400).json({ error: 'Invalid name or password length' });
        }

        // ==> Determine is user exists
        const existingUser = await dbQuery.users.getUser(name);
        // console.log('existingUser: ', existingUser);
        if (existingUser && existingUser.length) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // ==> Encrypt and insert
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = {
            name: name,
            password: encryptedPassword,
            role: 'registered',
        };
        const results = await dbQuery.users.insertUser(user);

        // ==> JWT for authentication
        const token = Util.createAuthToken(results.rows[0].id);

        // ==> END
        res.status(201).json({
            id: results.rows[0].id,
            name: results.rows[0].name,
            role: results.rows[0].role,
            token: token,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});
/*================================================*/
/*================================================*/
module.exports = router;
