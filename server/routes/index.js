const express = require('express');
const router = express.Router();
const db = require('../db');

// List All countries
router.get('/countries', async (req, res) => {
    try {
        let results = await db.all();
        res.json(results);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    } 
});

// Find One Country
router.get('/countries/:id', async (req, res) => {
    try {
        let results = await db.one(req.params.id);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    } 
});

module.exports = router;