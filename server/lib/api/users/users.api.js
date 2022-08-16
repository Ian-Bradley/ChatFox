const dbQuery = require('../../db/root.query.js');
const express = require('express');
const router = express.Router();
/*================================================*/
/*================================================*/

// ROUTE: => GET users (all - use with caution)
router.get('/', async function (req, res) {
    console.log('GET: users');
    let output = await dbQuery.users.getUsers();
    res.send(output);
});

/*================================================*/
/*================================================*/

// ROUTE: => GET users for room (by room id - FOREIGN KEY)
router.get('/:id', async function (req, res) {
    console.log('GET: users:id');
    let output = await dbQuery.users.getUsersByRoomID(req.params.id);
    res.send(output);
});

/*================================================*/
/*================================================*/
module.exports = router;