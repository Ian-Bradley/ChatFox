const dbQuery = require('../db/root.query.js');
const express = require('express');
const router = express.Router();
/*================================================*/
/*================================================*/
// ROUTE: => GET user
router.get('/:name', async function (req, res) {
    try {
        console.log('GET: user:name');
        let output = await dbQuery.users.getUser(req.params.name);
        res.status(200).json(output);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});
/*================================================*/
/*================================================*/
// ROUTE: => GET users
router.get('/', async function (req, res) {
    try {
        console.log('GET: users');
        let results = await dbQuery.users.getUsers();
        res.status(200).json(results);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});
/*================================================*/
/*================================================*/
// ROUTE: => POST user - DISABLED, use /register
router.post('/', async function (req, res) {
    // try {
    //     console.log('POST: user');
    //     const result = await dbQuery.users.insertUser(req.body);
    //     res.status(201).json(result);
    // } catch (err) {
    //     res.status(400).send(err);
    //     console.log(err);
    // }
    res.status(400).end('User creation is done with the "/register" route');
});
/*================================================*/
/*================================================*/
// ROUTE: => PUT user
router.put('/:name', async function (req, res) {
    try {
        console.log('PUT: user:name');
        const result = await dbQuery.users.updateUser(req.params.name, req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});
/*================================================*/
/*================================================*/
// ROUTE: => DELETE user
router.delete('/:name', async function (req, res) {
    try {
        console.log('DELETE: user:name');
        const result = await dbQuery.users.deleteUser(req.params.name);
        res.status(204).json(result);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});
/*================================================*/
/*================================================*/
module.exports = router;
