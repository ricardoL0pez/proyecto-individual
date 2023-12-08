const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { URL_BASE } = require('../utils/config'); 


const getPokemonIdHandler = async (id, source) => {
    try {
        if (source === 'api') {
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
                // Mapear la información obtenida de la base de datos
                const pokemonInfoDbMapped = {
                    id: pokemonInfoDb.id,
                    name: pokemonInfoDb.name,
                    hp: pokemonInfoDb.hp,
                    attack: pokemonInfoDb.attack,
                    defense: pokemonInfoDb.defense,
                    speed: pokemonInfoDb.speed,
                    types: pokemonInfoDb.types.map((type) => type.type.name),
                    height: pokemonInfoDb.height,
                    weight: pokemonInfoDb.weight,
                    image: pokemonInfoDb.image
                    
                };

                return pokemonInfoDbMapped;
            } else {
                throw new Error('ID inexistente 👻');
            }
        }
    } catch (error) {
        console.error('Error fetching Pokemon by ID:', error);
        throw new Error('Failed to fetch Pokemon by ID');
    }
};

module.exports = getPokemonIdHandler;
