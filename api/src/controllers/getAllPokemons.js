const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { URL_BASE } = require('../utils/config');

const getAllDB = async () => {
    const items = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
    const transformedItems = items.map(item => ({
        ...item.toJSON(), //método toJSON() de Sequelize para obtener una representación en forma de objeto JSON del elemento actual (item)
        types: item.types.map(type => type.name), //Asi obtengo solo el valor del name del type
    }));

    return transformedItems;
};

const getPokemonDetails = async (url) => {
    try {
        const response = await axios.get(url);
        const { height, id, name, sprites, stats, types, weight } = response.data;
        const pokemonInfo = {
            id,
            name,
            hp: stats[0].base_stat,
            attack: stats[1].base_stat,
            defense: stats[2].base_stat,
            speed: stats[5].base_stat,
            types: types.map(type => type.type.name),
            sprites: sprites.other['official-artwork'].front_default,
            height,
            weight,
        };
        return pokemonInfo;
    } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        throw new Error('Failed to fetch Pokemon details 😓');
    }
};

const getAllPokemonFormatted = async () => {
    try {
        const pokemonsApi = (await axios.get(`${URL_BASE}?limit=50`)).data.results;
        const pokemonsDetails = await Promise.all(pokemonsApi.map(pokemon => getPokemonDetails(pokemon.url))); // Promise.all metodo para manejar múltiples promesas al mismo tiempo

        const formattedPokemon = pokemonsDetails.map(pokemonInfo => ({
            id: pokemonInfo.id,
            name: pokemonInfo.name,
            hp: pokemonInfo.hp,
            attack: pokemonInfo.attack,
            defense: pokemonInfo.defense,
            speed: pokemonInfo.speed,
            types: pokemonInfo.types,
            height: pokemonInfo.height,
            weight: pokemonInfo.weight,
            image: pokemonInfo.sprites,
        }));

        return formattedPokemon;
    } catch (error) {
        console.error('Error fetching all formatted Pokemons:', error);
        throw new Error('Failed to fetch all formatted Pokemons 😓');
    }
};

const removeDuplicatePokemonByID = (getAllPokemonFormatted) => {
    try {
        const pokemonArray = getAllPokemonFormatted();
        const uniquePokemonArray = pokemonArray.filter((pokemon, index, self) =>
            index === self.findIndex((p) => (  
                p.id === pokemon.id
            ))
        );
        return uniquePokemonArray;
    } catch (error) {
        console.error('Error removing duplicate Pokémon:', error);
        throw new Error('Failed to remove duplicate Pokémon 😓');
    }
};

const getAllApi = async () => {
    try {
        const formattedPokemonArray = await getAllPokemonFormatted();
        const uniquePokemonArray = removeDuplicatePokemonByID(() => formattedPokemonArray);
        return uniquePokemonArray;
    } catch (error) {
        console.error('Error getting all API Pokémon:', error);
        throw new Error('Failed to get all API Pokémon 😓');
    }
};

const getAllPokemons = async () => {
    const pokemonsDb = await getAllDB();
    const pokemonsApi = await getAllApi();

    return [...pokemonsDb, ...pokemonsApi]

};

module.exports = getAllPokemons;



