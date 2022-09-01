const dbQuery = require('../../db/root.query.js');
const Util = require('../../util/util.js');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
/*================================================*/
/*================================================*/
// ROUTE: => LOGIN
router.post('/', async function (req, res) {
    // console.log('=====LOGIN======');
    // console.log('req.body: ', req.body);
    try {
        // ==> Validate data for account requirements
        const { name, password } = req.body;
        if (!(name && password)) {
            res.status(400).json({ error: 'Missing data' });
        }
        if (name.length < 3 || password.length < 3) {
            res.status(400).json({ error: 'Account requirements not met' });
        }

        // ==> Determine is user exists in DB
        const user = await dbQuery.users.getUser(name);
        // console.log(user);

        // ==> Validate password
        if (user[0]) {
            const validPassword = await bcrypt.compare(password, user[0].password);
            if (validPassword) {
                // ==> JWT for authentication
                const token = Util.createAuthToken(user[0].id);

                // ==> END
                res.status(200).json({
                    id: user[0].id,
                    name: user[0].name,
                    token: token,
                });
            } else {
                res.status(401).json({ error: 'Invalid password' });
            }
        } else {
            res.status(400).json({ error: 'User does not exist' });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});
/*================================================*/
/*================================================*/
module.exports = router;
