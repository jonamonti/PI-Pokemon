// Configuration
const express = require('express');
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Modularized endpoints
const pokemon = require('./pokemon');
const type = require('./type');


router.use('/pokemons', pokemon);
router.use('/type', type);

module.exports = router;

