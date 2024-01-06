const { Pokemon } = require('../db');
const axios = require('axios');
const { URL_BASE } = require('../utils/config');

const validateNameApi = async (name) => {
    try {
        // Consulto a la base de datos para verificar si el name existe
        const pokemonsDB = await Pokemon.findAll({ where: { name: name.toLowerCase() } });//findALL() metodo de sequelize
        if (pokemonsDB.length > 0) {
            return false; // Retorna falso si el Pokémon existe en la base de datos
        }

        // Consulto a la API para verificar si el name existe
        const response = await axios.get(`${URL_BASE}${name.toLowerCase()}`);
        if (response.status === 200) {
            return false; // Retorna falso si el Pokémon existe en la API
        }

        return true; // Retorna verdadero si el Pokémon no existe ni en la base de datos ni en la API

    } catch (error) {
         if (error.response && error.response.status === 404) { //En Axios, cuando ocurre un error en la solicitud, la respuesta de la API se almacena en la propiedad response del objeto de error.
            return true; // Retorna verdadero si el Pokémon no se encuentra en la API
        }
        throw error; // Lanza cualquier otro error que se haya producido 
    }
};

const createPokemon = async ({ name, hp, attack, defense, speed, types, height, weight, image }) => {
    try {
        const isValid = await validateNameApi(name);

        if (isValid) {
            const newPokemon = await Pokemon.create({ name, hp, attack, defense, speed, height, weight, image });
            await newPokemon.addTypes(types);//asocio types al nuevo Pokémon en la bd
            return { success: true, message: `Character ${name} was successfully created 😻` };
        } else {
            throw new Error(`A Pokémon with the name ${name} already exists 😿`);
        }
    } catch (error) {
        throw new Error(`Error creating Pokémon: ${error.message} 🙀`);
    }
}; 

module.exports = createPokemon;


