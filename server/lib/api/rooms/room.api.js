const dbQuery = require('../../db/root.query.js');
const express = require('express');
const router = express.Router();
/*================================================*/
/*================================================*/

// ROUTE: => GET room
router.get('/:name', async function (req, res) {
    console.log('GET: room:name');
    let output = await dbQuery.users.getRooms(req.params.name);
    res.send(output);
});

/*================================================*/
/*================================================*/
module.exports = router;