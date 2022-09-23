// CONFIGURATION
const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

// DATA MODELS
const { Pokemon, Type } = require('../db.js');

//UTILS
const { getPokemonById } = require('../utils/getPokemonById.js');
const { getPokemonByName } = require('../utils/getPokemonByName.js');
const { getAllPokemons } = require('../utils/getAllPokemons.js');


// GET /pokemons
router.get('/', async (req, res) => {
    const { name } = req.query;

    if (!name) {
        try {
            let fnResult = await getAllPokemons();
            return res.status(201).json({msg: 'success', data: fnResult });
        } catch (error) {
            return res.status(404).json(error);    
        }
    }

    try {
        let fnResult = await getPokemonByName(name);
        res.status(201).json({msg: 'success', data: fnResult });
    } catch (error) {
        res.status(404).json(`Did not found a pokemon with this name: ${name}`);
    }
})

// GET /pokemons/{idPokemon}
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        let fnResult = await getPokemonById(id);
        res.status(201).json({msg: 'success', data: fnResult });
    } catch (error) {
        res.status(404).json(error.name + ' ' + error.message)
    }
})


// POST /pokemons
router.post('/', async (req, res) => {
    let { name, hp, attack, defense, speed, height, weight, type, img } = req.body;
    type = type.split(' '); 

    if (!name) return res.status(404).json('Name must exist');

    const queryCondition = { where: { name: { [Op.in]: type}}};
    const queryResult = await Type.findAll(queryCondition);
    const dbTypes = queryResult.map(e => e.dataValues.id);

    if (!dbTypes.length) return res.status(404).send('Type not valid');

    try {
        const newPokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            img
        });
        await newPokemon.addType(dbTypes);
        res.status(200).json({...newPokemon.dataValues, type: type});
    } catch (error) {
        res.status(404).json(error);
    }
})

module.exports = router; 