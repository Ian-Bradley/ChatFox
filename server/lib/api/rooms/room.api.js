const dbQuery = require('../../db/root.query.js');
const express = require('express');
const router = express.Router();
/*================================================*/
/*================================================*/

// ROUTE: => GET room (by room name || by room id)
router.get('/:value', async function (req, res) {
    console.log('GET: room:name||id');
    let output = await dbQuery.users.getRooms(req.params.value);
    res.send(output);
});

/*================================================*/
/*================================================*/
module.exports = router;