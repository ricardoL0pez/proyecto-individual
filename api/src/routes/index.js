const { Router } = require('express');
// Importar todos los routers;
const pokemonRouter = require('./pokemonRouter')
const typeRouter = require('./typeRouter')
// Ejemplo: const authRouter = require('./auth.js');


const routes = Router();

// Configurar los routers
routes.use('/pokemons', pokemonRouter);
routes.use('/types', typeRouter);
// Ejemplo: router.use('/auth', authRouter);


module.exports = routes;
