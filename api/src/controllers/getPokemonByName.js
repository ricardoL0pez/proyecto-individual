const axios = require('axios');
const { Pokemon } = require('../db');
const infoCleaner = require('../utils');

const URL_BASE = ('https://pokeapi.co/api/v2/pokemon/')

const getPokemonByName = async (name) => {

    const infoApi = (await axios.get(URL_BASE)).data.results;
    const pokemonsApi = await infoCleaner(infoApi);
    const usersFiltered = pokemonsApi.filter(user => user.name === name);

    const userDb = await Pokemon.findAll({ where: { name: name } });

    return [...usersFiltered, ...userDb]
    //return [...infoApi, ...userDb]

};

module.exports = getPokemonByName;