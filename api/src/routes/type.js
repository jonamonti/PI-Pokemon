// CONFIGURATION
const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

// DATA MODELS
const { Type } = require('../db.js');

// GET /types
router.get('/', async (req, res) => {

    const queryCondition = {};
    const queryResult = await Type.findAll(queryCondition);

    const dbTypes = queryResult.map(el => el.dataValues.name);

    try {
        if (!queryResult.length) {

            const resp =  await axios.get('https://pokeapi.co/api/v2/type');
            await resp.data.results.forEach(e => Type.create({name: e.name}));
            return res.send('Pokemon types updated on types table from pokeApi using axios.get');
        }
        return res.json(dbTypes);

    } catch (error) {
        res.status(404).json(error);
    }
})

module.exports = router;
