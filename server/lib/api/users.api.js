const dbQuery = require('../db/root.query.js');
const express = require('express');
const router = express.Router();
/*================================================*/
/*================================================*/
// ROUTE: => GET user
router.get('/:id', async function (req, res) {
    try {
        console.log('GET: user:id');
        let output = await dbQuery.users.getUser(req.params.id);
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
router.put('/:id', async function (req, res) {
    try {
        console.log('PUT: user:id');
        const result = await dbQuery.users.updateUser(req.params.id, req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});
/*================================================*/
/*================================================*/
// ROUTE: => DELETE user
router.delete('/:id', async function (req, res) {
    try {
        console.log('DELETE: user:id');
        const result = await dbQuery.users.deleteUser(req.params.id);
        res.status(204).json(result);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});
/*================================================*/
/*================================================*/
module.exports = router;
