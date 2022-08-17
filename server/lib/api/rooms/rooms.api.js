const dbQuery = require('../../db/root.query.js');
const express = require('express');
const router = express.Router();
/*================================================*/
/*================================================*/

// ROUTE: => GET rooms (all - use with caution)
router.get('/', async function (req, res) {
    try {
        console.log('GET: rooms');
        let output = await dbQuery.rooms.getRooms();
        res.status(200).json(output);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});

/*================================================*/
/*================================================*/
module.exports = router;