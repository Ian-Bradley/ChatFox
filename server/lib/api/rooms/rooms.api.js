const dbQuery = require('../../db/root.query.js');
const express = require('express');
const router = express.Router();
/*================================================*/
/*================================================*/

// ROUTE: => GET rooms (all - use with caution)
router.get('/', async function (req, res) {
    console.log('GET: rooms');
    let output = await dbQuery.users.getRooms();
    res.send(output);
});

/*================================================*/
/*================================================*/
module.exports = router;