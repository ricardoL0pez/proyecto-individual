const { Router } = require('express');
const getAllPokemons = require('../controllers/getAllPokemons');
const getPokemonByName = require('../controllers/getPokemonByName');
const createPokemon = require('../controllers/createPokemon')



const getPokemonHandler = async (req, res) => {
  
    const { name } = req.query;
    try { 
        const response = await name ? getPokemonByName(name) : await getAllPokemons();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message }) 
    }  
};



const getDetailPokemonIdHandler =  (req, res) => {

    res.status(200).send('getDetailPokemonIdHandler');

};

/*middleware*/
const validate = (req, res, next) => { //middleware para que mi require de createPokemonHandler pase primero por aqui y se valide 
    const { name, imagen, hp, attack, defense, types } = req.body;
    if (!name || !imagen || !hp || !attack || !defense || !types) {
        return res.status(400).json({ error: 'Missing data' })
    } else {
        next();//next libera la require
    }
};

/*Crear Pokemon*/
const createPokemonHandler = async (req, res) => { 
    const { name, imagen, hp, attack, defense, types } = req.body;
    try {
        const response = await createPokemon({ name, imagen, hp, attack, defense, types });
        res.status(200).json(`Tu personaje fue creado con exito ${response}`);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    getPokemonHandler,
    getDetailPokemonIdHandler,
    createPokemonHandler,
    validate,
}; 

