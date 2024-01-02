const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { URL_BASE } = require('../utils/config'); 
const { Op } = require('sequelize');

const getPokemonByName = async (name) => {
    try {
        const pokemonInfoDb = await Pokemon.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        });

        if (pokemonInfoDb.length > 0) {
            const typesArray = pokemonInfoDb[0].types.map((type) => type.name);

            const pokemonInfoDatabase = {
                id: pokemonInfoDb[0].id,
                name: pokemonInfoDb[0].name,
                hp: pokemonInfoDb[0].hp,
                attack: pokemonInfoDb[0].attack,
                defense: pokemonInfoDb[0].defense,
                speed: pokemonInfoDb[0].speed,
                types: typesArray,
                height: pokemonInfoDb[0].height,
                weight: pokemonInfoDb[0].weight,
                image: pokemonInfoDb[0].image,
            };

            return pokemonInfoDatabase;
        } else {
            const responseApi = await axios.get(`${URL_BASE}${name.toLowerCase()}`);
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
                sprites: dataApi.sprites.other['official-artwork'].front_default,
            };

            return pokemonInfoApi;
        }
    } catch (error) {
        console.error('Error fetching Pokemon by name:', error);
        throw new Error('Failed to fetch Pokemon by name');
    }
};

module.exports = getPokemonByName;









//consulta con Sequelize en Node.js que buscará un Pokémon por su nombre en la tabla Pokemon e incluirá información del modelo Type, seleccionando solamente el atributo name y excluyendo los atributos a través de through.
//El uso de findOne en lugar de findAll indica que estás buscando un solo registro que coincida con el nombre proporcionado en la variable name. Esto es útil si se espera que exista solo un Pokémon con ese nombre en la base de datos.
//En este código, estamos utilizando sequelize.fn para aplicar la función LOWER a las columnas name tanto en la base de datos como al valor que se está buscando, convirtiendo ambos a minúsculas antes de hacer la comparación. Esto permite que la búsqueda sea insensible a mayúsculas y minúsculas, encontrando registros independientemente de la forma en que se ingresen las letras.



