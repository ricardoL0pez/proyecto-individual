const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { URL_BASE } = require('../utils/config');

const getPokemonId = async (id, source) => { //recibe el ID y source como argumentos desde donde se invoca esta función
    try { // Comienza un bloque try-catch para manejar errores
        if (source === 'api') {
            // Comprueba si la fuente es 'api'
            const responseApi = await axios.get(`${URL_BASE}${id}`);
            const dataApi = responseApi.data;

            const pokemonInfoApi = {
                id: dataApi.id,
                name: dataApi.name,
                hp: dataApi.stats[0].base_stat,
                attack: dataApi.stats[1].base_stat,
                defense: dataApi.stats[2].base_stat,
                speed: dataApi.stats[5].base_stat,
                types: dataApi.types.map((type) => type.type.name),
                height: dataApi.height,
                weight: dataApi.weight,
                image: dataApi.sprites.other['official-artwork'].front_default,
            };

            return pokemonInfoApi;
        } else {
            const pokemonInfoDb = await Pokemon.findByPk(id, {
                include: {
                    model: Type,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                },
            });

            if (pokemonInfoDb) {
                // Mapear la información de los tipos a un array de nombres
                const typesArray = pokemonInfoDb.types.map((type) => type.name);

                // Construir la estructura de datos similar a la de la API
                const pokemonInfoDatabase = {
                    id: pokemonInfoDb.id,
                    name: pokemonInfoDb.name,
                    hp: pokemonInfoDb.hp,
                    attack: pokemonInfoDb.attack,
                    defense: pokemonInfoDb.defense,
                    speed: pokemonInfoDb.speed,
                    types: typesArray, // Utilizar el array creado
                    height: pokemonInfoDb.height,
                    weight: pokemonInfoDb.weight,
                    image: pokemonInfoDb.image,
                };

                return pokemonInfoDatabase;
            } else {
                throw new Error('Pokémon not found in the database 😿');
            }
        }
    } catch (error) {
        console.error('Error fetching Pokémon by ID:', error);
        throw new Error('Failed to fetch Pokémon by ID 😓');
    }
};

module.exports = getPokemonId;


/* getPokemonId es una función asincrónica que recibe dos parámetros: id (ID del Pokémon) y source (fuente de los datos, en este caso, se espera que sea 'api'). */