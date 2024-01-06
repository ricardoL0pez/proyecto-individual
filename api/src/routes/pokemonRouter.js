const { Router } = require("express");
const { getPokemonHandler, getDetailPokemonIdHandler, createPokemonHandler, validate, deletePokemonHandler, putPokemonHandler } = require("../handlers/pokemonHandler");

const pokemonRouter = Router();

pokemonRouter.get('/', getPokemonHandler);
pokemonRouter.get('/:id', getDetailPokemonIdHandler);
pokemonRouter.post('/', validate, createPokemonHandler); //indico que quiero que mi require pase primero por el middleware validate  y valide que la info este completa 
pokemonRouter.delete('/:id', deletePokemonHandler);
pokemonRouter.put('/:id', putPokemonHandler);

module.exports = pokemonRouter;