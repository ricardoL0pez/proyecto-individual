const axios = require('axios');
const { Pokemon, Type } = require('../db');
const infoCleaner = require('../utils');

const URL_BASE = ('https://pokeapi.co/api/v2/pokemon/?limit=10')

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

const getAllPokemon = async () => {
    const pokemonsDB = await getAllDB();

    const infoApi = ( await axios.get(URL_BASE)).data.results;
    const pokemonsApi = infoCleaner(infoApi); 

    return [...pokemonsDB, ...pokemonsApi]
};

module.exports = getAllPokemon;










/* const getAllApi = async () => {
    
    const requests = (await axios.get(`${URL_BASE}?limit=1`))
    .data.results.map(item => axios.get(`${URL_BASE}${item.url.split('/')[6]}`));

    let response = []

    await Promise.all(requests)
        .then(values => response = values.map(item => {
            return {
                id: item.data.id,
                nombre: item.data.name,
                ataque: item.data.stats.find(s => s.stat.name === 'attack').base_stat,
                hp: item.data.stats.find(s => s.stat.name === 'hp').base_stat,
                defense: item.data.stats.find(s => s.stat.name === 'defense').base_stat,
                speed: item.data.stats.find(s => s.stat.name === 'speed').base_stat,
                imagen: item.data.sprites.other['official-artwork'].front_shiny,
                types: item.data.types.map(type => { return { id: Number(type.type.url.split('/')[6]), slot: type.slot, nombre: type.type.name } }),
                
            }
        }))
        .catch(error => console.log(error))
        
    return response;

}; */

/* const getAllApi = async () => {
    try {
        const respuesta = await axios(`${URL_BASE}?limit=1`);
        const resultados = respuesta.data.results;

        const listaDePokemon = [];

        for (const pokemon of resultados) {
            const respuestaPokemon = await axios(pokemon.url);
            const infoFromApi = respuestaPokemon.data;

            const infoPokemon = {
                id: infoFromApi.id,
                name: infoFromApi.name,
                types: infoFromApi.types.map((t) => t.type.name),
                img: infoFromApi.sprites.other['official-artwork'].front_default,
                hp: infoFromApi.stats[0].base_stat,
                attack: infoFromApi.stats[1].base_stat,
                defense: infoFromApi.stats[2].base_stat,
                speed: infoFromApi.stats[5].base_stat,
                weight: infoFromApi.weight,
                height: infoFromApi.height,
            };

            console.log("BOM DIA!!!", listaDePokemon);
            listaDePokemon.push(infoPokemon);
        }

        return listaDePokemon;
    } catch (error) {
        throw error;
    }
} */


/* 
const getAllDB = async () => {
    //hay que ver uales son los atributos que tengoque traer
    const items = await Pokemon.findAll({
        attributes: ['id', 'nombre', 'ataque', 'imagen'],
        include: {
            model: Type,
        }
    }); */

    //Hola chicos! Todos pudieron encontrar los atributos hp, attac, defense y speed para crear el endpoit details?











    
      
      // Obtener todos los objetos con las propiedades 'name' y 'url'
      /* const pokemons = data.results.map(pokemon => ({ name: pokemon.name, url: pokemon.url }));
      const pokemonns = data.results.map(pokemon => (URL_BASE));
      
      console.log(pokemons); */
      