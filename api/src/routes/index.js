const { Router } = require('express');
const pokemonRouter = require('./pokemonRouter')
const typeRouter = require('./typeRouter')

const routes = Router(); //metodo Router()

// Asignación de routers a las rutas principales
routes.use('/pokemons', pokemonRouter);//Asigna el router pokemonRouter a la ruta /pokemons
routes.use('/types', typeRouter);

module.exports = routes;