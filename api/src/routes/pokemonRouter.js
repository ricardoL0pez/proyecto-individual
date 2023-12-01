const { Router } = require("express");
const { getPokemonHandler, getDetailPokemonIdHandler, createPokemonHandler, validate } = require("../handlers/pokemonHandler");

const pokemonRouter = Router();

pokemonRouter.get('/', getPokemonHandler);
pokemonRouter.get('/:id', getDetailPokemonIdHandler);
pokemonRouter.post('/', validate, createPokemonHandler); //indico que quiero que mi require pase primero por el middleware validate  y valide que la info este completa 

module.exports = pokemonRouter;


