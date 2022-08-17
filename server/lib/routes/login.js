const dbQuery = require('../db/root.query.js');
const config = require('../../config.env.js');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
/*================================================*/
/*================================================*/

// ROUTE: => LOGIN
router.post('/', async function (req, res) {
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send('Missing data');
        }

        const user = await dbQuery.getUser(username);
        console.log(user);

        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {

                const token = jwt.sign({ user_id: user.id, user_name: user.name }, config.jwt.key_private, {
                    algorithm: config.jwt.alg,
                    expiresIn: config.jwt.expire,
                });
                user.token = token;

                res.status(200).json(user);
            } else {
                res.status(400).json({ error: 'Invalid Password' });
            }
        } else {
            res.status(401).json({ error: 'User does not exist' });
        }
    } catch (err) {
        console.log(err);
    }
});

/*================================================*/
/*================================================*/
module.exports = router;
