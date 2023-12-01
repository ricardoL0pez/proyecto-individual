const { Pokemon } = require('../db');
const axios = require('axios');

const URL_BASE = ('https://pokeapi.co/api/v2/pokemon/?limit=10')

const validateNameApi = async (nombre) => {
    try {
        // Consulta a la base de datos para verificar si el nombre existe
        const pokemonsDB = await Pokemon.findAll({ where: { nombre: nombre.toLowerCase() } });
        if (pokemonsDB.length > 0) {
            throw new Error('Ya existe un Pokémon en la base de datos con ese nombre.');
        }

        // Consulta a la API para verificar si el nombre existe
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
        if (response.data) {
            throw new Error('Ya existe un Pokémon en la API con ese nombre.');
        }

        return true;

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return false; // No se encontró un Pokémon con ese nombre en la API
        }
        throw error; // Lanza cualquier otro error que se haya producido
    }
};


const createPokemon = async ({ name, imagen, hp, attack, defense, types }) => {
    try {
        const isValid = await validateNameApi(name);

        if (isValid) {
            const newPokemon = await Pokemon.create({ name, imagen, hp, attack, defense });
            await newPokemon.addTypes(types);
            return newPokemon;
        } 
    } catch (error) {
        throw Error('El nombre del Pokémon ya existe en la base de datos o en la API.');
    }
};

module.exports = createPokemon;




/* const newPokemon = await Pokemon.create({ name, imagen, vida, ataque, defensa });//El create crea un objeto que tiene las especificaciones ddel prototipo del modelo de ususario
newPokemon.addTypes(types);
return newPokemon; */