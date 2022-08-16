const db = require('../../db/root.query.js');
const express = require('express');
const router = express.Router();
/*================================================*/
/*================================================*/

// ROUTE: => GET user
router.get('/:name', async function (req, res) {
    console.log('GET: user:name');
    let output = await db.users.getUser(req.params.name);
    // console.log('server.js ==> GET:/api/user/:name = ', output);
    res.send(output);
});

/*================================================*/
/*================================================*/
module.exports = router;