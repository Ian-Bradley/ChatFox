const dbQuery = require('../../db/root.query.js');
const express = require('express');
const router = express.Router();
/*================================================*/
/*================================================*/

// ROUTE: => GET users (all - use with caution)
router.get('/', async function (req, res) {
    try {
        console.log('GET: users');
        let output = await dbQuery.users.getUsers();
        res.status(200).json(output);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});

/*================================================*/
/*================================================*/

// ROUTE: => GET users for room (room_id - FOREIGN KEY)
router.get('/:id', async function (req, res) {
    try {
        console.log('GET: users:id');
        let output = await dbQuery.users.getUsersByRoomID(req.params.id);
        res.status(200).json(output);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});

/*================================================*/
/*================================================*/
module.exports = router;