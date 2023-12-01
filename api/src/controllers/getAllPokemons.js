const axios = require('axios');
const { Pokemon, Type } = require('../db');
const infoCleaner = require('../utils');

const URL_BASE = ('https://pokeapi.co/api/v2/pokemon/?limit=5')

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
return items;
};


const getPokemonDetails = async (url) => {
    try {
        const response = await axios.get(url);
        const { height, id, name, sprites, stats, types, weight } = response.data;
        const filteredStats = stats.filter(stat => stat.stat.name === 'hp' || stat.stat.name === 'attack' || stat.stat.name === 'speed');
        const pokemonInfo = {
            height,
            id,
            name,
            sprites: sprites.other['official-artwork'].front_default,
            stats: filteredStats.map(stat => ({ name: stat.stat.name, base_stat: stat.base_stat })),
            types: types.map(type => type.type.name),
            weight
        };
        return pokemonInfo;
    } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        throw new Error('Failed to fetch Pokemon details');
    }
};

const getAllPokemonFormatted = async () => {
    try {
        const pokemonsApi = (await axios.get(URL_BASE)).data.results;
        const pokemonsDetails = await Promise.all(pokemonsApi.map(pokemon => getPokemonDetails(pokemon.url)));
        
        const formattedPokemon = pokemonsDetails.map(pokemonInfo => ({
            id: pokemonInfo.id,
            nombre: pokemonInfo.name,
            vida: pokemonInfo.stats.find(stat => stat.name === 'hp').base_stat,
            ataque: pokemonInfo.stats.find(stat => stat.name === 'attack').base_stat,
            velocidad: pokemonInfo.stats.find(stat => stat.name === 'speed').base_stat,
            tipo: pokemonInfo.types,
            altura: pokemonInfo.height,
            peso: pokemonInfo.weight,
            imagen: pokemonInfo.sprites
        }));
        
        return formattedPokemon;
    } catch (error) {
        console.error('Error fetching all formatted Pokemons:', error);
        throw new Error('Failed to fetch all formatted Pokemons');
    }
};


const removeDuplicatePokemonByID = (getAllPokemonFormatted) => {
    try {
        const pokemonArray = getAllPokemonFormatted();
        const uniquePokemonArray = pokemonArray.filter((pokemon, index, self) =>
            index === self.findIndex((p) => (  //findIndex busca un elemento dentro del array y devuelve el índice de la primera ocurrencia que cumple con una condición específica proporcionada por la función de prueba. Este método retorna -1 si no encuentra ningún elemento que cumpla con la condición.
                p.id === pokemon.id
            ))
        );
        return uniquePokemonArray;
    } catch (error) {
        console.error('Error removing duplicate Pokémon:', error);
        throw new Error('Failed to remove duplicate Pokémon');
    }
};

const getAllApi = async () => {
    try {
        const formattedPokemonArray = await getAllPokemonFormatted();
        const uniquePokemonArray = removeDuplicatePokemonByID(() => formattedPokemonArray);
        return uniquePokemonArray;
    } catch (error) {
        console.error('Error getting all API Pokémon:', error);
        throw new Error('Failed to get all API Pokémon');
    }
};



const getAllPokemons = async () => {
    const pokemonsDb = await getAllDB();
    const pokemonsApi = await getAllApi();

    return [...pokemonsDb, ...pokemonsApi]

    /* const infoApi = ( await axios.get(URL_BASE)).data.results;
    const pokemonsApi = infoCleaner(infoApi); 
    return [...pokemonsDB, ...pokemonsApi] */
};

module.exports = getAllPokemons;




/* En la función getAllApi, se usa una función anónima para pasar formattedPokemonArray como argumento a removeDuplicatePokemonByID.
Esta estructura permite que removeDuplicatePokemonByID acepte una función que devuelva formattedPokemonArray cuando sea invocada. */