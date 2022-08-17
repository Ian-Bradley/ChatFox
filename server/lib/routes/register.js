const dbQuery = require('../db/root.query.js');
const config = require('../../config.env.js');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
/*================================================*/
/*================================================*/

// ROUTE: => REGISTER
router.post('/', async function (req, res) {
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send('Missing data');
        }

        const existingUser = await dbQuery.user.getUser(username);
        if (existingUser) {
            return res.status(409).send('User already exists');
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = {
            name: username,
            password: encryptedPassword,
        };
        const results = dbQuery.user.insertUser(user);


        // const token = jwt.sign({ user_id: user.id, user_name: user.name }, config.jwt.key_private, {
        //     algorithm: config.jwt.alg,
        //     expiresIn: config.jwt.expire,
        // });
        // user.token = token;
        res.status(201).json(results);
    } catch (err) {
        console.log(err);
    }
});

/*================================================*/
/*================================================*/
module.exports = router;
