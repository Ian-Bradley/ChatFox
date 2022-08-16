const dbQuery = require('../../db/root.query.js');
const express = require('express');
const router = express.Router();
/*================================================*/
/*================================================*/

// ROUTE: => GET users
router.get('/', async function (req, res) {
    console.log('GET: users');
    let output = await dbQuery.users.getUsers();
    // console.log('server.js ==> GET:/api/users = ', output);
    res.send(output);
});

/*================================================*/
/*================================================*/

// ROUTE: => GET users for room
router.get('/:room', async function (req, res) {
    console.log('GET: users:room');
    let output = await dbQuery.users.getUsersForRoom(req.params.room);
    // console.log('server.js ==> GET:/api/users/:room = ', output);
    res.send(output);
});

/*================================================*/
/*================================================*/
module.exports = router;