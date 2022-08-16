const dbQuery = require('../../db/root.query.js');
const express = require('express');
const router = express.Router();
/*================================================*/
/*================================================*/

// ROUTE: => GET user (by user name || by user id)
router.get('/:value', async function (req, res) {
    console.log('GET: user:name||id');
    let output = await dbQuery.user.getUser(req.params.value);
    res.send(output);
});

/*================================================*/
/*================================================*/
module.exports = router;