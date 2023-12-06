const getAllPokemons = require('../controllers/getAllPokemons');
const getPokemonByName = require('../controllers/getPokemonByName');
const createPokemon = require('../controllers/createPokemon');
const getPokemonIdHandler = require('../controllers/getPokemonIdHandler');



const getPokemonHandler = async (req, res) => {
  
    const { name } = req.query;
    try { 
        const response =  name ? await getPokemonByName(name) : await getAllPokemons();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message }) 
    }  
};


const getDetailPokemonIdHandler = async (req, res) => { 
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api" //isNan() si es un valor numerico me devuelve false si es un diferente true // hdge54-hsvc65-hd54gd-64g5hf 
    try {
        const response = await getPokemonIdHandler(id, source); //le paso como segundo parametro source para decirle a mi cnrolador donde buscar el ID dependiendo del tipo de dato que llegue //pide una respuesta que va a provenir de la invocacion del controlador
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}





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

