const dbQuery = require('../db/root.query.js');
const express = require('express');
const router = express.Router();
/*================================================*/
/*================================================*/
// ROUTE: => GET channels
router.get('/', async function (req, res) {
    try {
        console.log('GET: channels');
        let results = await dbQuery.channels.getChannels();
        res.status(200).json(results);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});
/*================================================*/
/*================================================*/
// ROUTE: => POST channel
router.post('/', async function (req, res) {
    try {
        console.log('POST: channel');
        const result = await dbQuery.channels.insertChannel(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
    res.status(400).end('Channel creation is done with the "/register" route');
});
/*================================================*/
/*================================================*/
// ROUTE: => PUT channel (name||id)
router.put('/:value', async function (req, res) {
    try {
        console.log('PUT: channel:name||id');
        const result = await dbQuery.channels.updateChannel(req.params.value, req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});
/*================================================*/
/*================================================*/
// ROUTE: => DELETE channel (name||id)
router.delete('/:value', async function (req, res) {
    try {
        console.log('DELETE: channel:name||id');
        const result = await dbQuery.channels.deleteChannel(req.params.value);
        res.status(204).json(result);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});
/*================================================*/
/*================================================*/
module.exports = router;
