const dbQuery = require('../db/root.query.js');
const express = require('express');
const router = express.Router();
/*================================================*/
/*================================================*/
// ROUTE: => GET messages
router.get('/', async function (req, res) {
    try {
        console.log('GET: messages');
        let results = await dbQuery.messages.getMessages();
        res.status(200).json(results);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});
/*================================================*/
/*================================================*/
// ROUTE: => POST message
router.post('/', async function (req, res) {
    try {
        console.log('POST: message');
        const result = await dbQuery.messages.insertMessage(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
    res.status(400).end('Message creation is done with the "/register" route');
});
/*================================================*/
/*================================================*/
// ROUTE: => DELETE message (name||id)
router.delete('/:value', async function (req, res) {
    try {
        console.log('DELETE: message:name||id');
        const result = await dbQuery.messages.deleteMessage(req.params.value);
        res.status(204).json(result);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});
/*================================================*/
/*================================================*/
module.exports = router;
