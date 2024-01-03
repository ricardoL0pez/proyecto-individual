const { Router } = require('express'); //objeto router
const pokemonRouter = require('./pokemonRouter')
const typeRouter = require('./typeRouter')
// Ejemplo: const authRouter = require('./auth.js');

const routes = Router(); //metodo Router()

// signación de routers a las rutas principales
routes.use('/pokemons', pokemonRouter);//Asigna el router pokemonRouter a la ruta /pokemons
routes.use('/types', typeRouter);

module.exports = routes;
