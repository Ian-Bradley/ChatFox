const dbQuery = require('../../db/root.query.js');
const config = require('../../../config.env.js');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
/*================================================*/
/*================================================*/

// ROUTE: => LOGIN
router.post('/', async function (req, res) {
    console.log('=====LOGIN======');
    console.log('req.body: ', req.body);
    try {
        // ==> Validate data for account requirements
        const { name, password } = req.body;
        if (!(name && password)) {
            res.status(400).json({ error: 'Missing data' });
        }
        if (name.length < 3 || password.length < 3) {
            res.status(400).json({ error: 'Invalid name or password length' });
        }

        // ==> Determine is user exists in DB
        const user = await dbQuery.user.getUser(name);
        console.log('user: ', user);

        // ==> Validate password
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                // ==> Add JWT for authentication
                // const token = jwt.sign(
                //     { user_id: user.id, user_name: user.name },
                //     config.jwt.key_private,
                //     {
                //         algorithm: config.jwt.alg,
                //         expiresIn: config.jwt.expire,
                //     }
                // );
                // user.token = token;

                // ==> END
                res.status(200).json(user);
            } else {
                res.status(400).json({ error: 'Invalid password' });
            }
        } else {
            res.status(401).json({ error: 'User does not exist' });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

/*================================================*/
/*================================================*/
module.exports = router;
