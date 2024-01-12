const getAllPokemons = require('../controllers/getAllPokemons');
const getPokemonByName = require('../controllers/getPokemonByName');
const getPokemonId = require('../controllers/getPokemonId');
const createPokemon = require('../controllers/createPokemon');
const deletePokemon = require('../controllers/deletePokemon');
const putPokemon = require('../controllers/putPokemon');


const getPokemonHandler = async (req, res) => {
    const { name } = req.query; 
    try {
        const response = name ? await getPokemonByName(name) : await getAllPokemons();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const getDetailPokemonIdHandler = async (req, res) => { 
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api" //isNan() si es un valor numerico me devuelve false si es un diferente true // hdge54-hsvc65-hd54gd-64g5hf 
    try {
        const response = await getPokemonId(id, source); 
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

/*Middleware*/
const validate = (req, res, next) => { 
    const { name, hp, attack, defense, speed, types, height, weight, image } = req.body;
    if (!name || !hp || !attack || !defense || !speed || !types || !height || !weight || !image) {
        return res.status(400).json({ error: 'Missing data' })
    } else {
        next();//next libera la require
    }
};

/*Crear Pokemon*/
const createPokemonHandler = async (req, res) => {
    const { name, hp, attack, defense, speed, types, height, weight, image } = req.body; 
    try {
        const response = await createPokemon({ name, hp, attack, defense, speed, types, height, weight, image }); 
        res.status(200).json(response.message); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deletePokemonHandler = async (req, res) => {
    const { id } = req.params; 
    try {
        const response = await deletePokemon(id); 
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const validPokemonType = (type) => {
    const validTypes = [
        "normal", "fighting", "flying", "poison", "ground", "rock",
        "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic"
    ];
    return validTypes.includes(type);
};


const putPokemonHandler = async (req, res) => {
    const { id } = req.params;

    const { name, attack, hp, defense, speed, height, weight, types, image } = req.body

    if (
        (typeof name !== undefined && typeof name !== 'string') ||
        (typeof hp !== undefined && (typeof hp !== 'number' || hp <= 0 || hp > 250)) ||
        (typeof attack !== undefined && (typeof attack !== 'number' || attack <= 0 || attack > 250)) ||
        (typeof defense !== undefined && (typeof defense !== 'number' || defense <= 0 || defense > 250)) ||
        (typeof speed !== undefined && (typeof speed !== 'number' || speed <= 0 || speed > 250)) ||
        (typeof height !== undefined && (typeof height !== 'number' || height <= 0 || height > 250)) ||
        (typeof weight !== undefined && (typeof weight !== 'number' || weight <= 0 || weight > 250)) ||
        (typeof image !== undefined && (typeof image !== 'string' || !validator.isURL(image))) ||
        (types !== undefined && (!Array.isArray(types) || types.length > 3 || types.some(type => !validPokemonType(type))))

    ) {
        res.status(400).json({ message: "Invalid data format." })
        return
    }
    try {
        const response = await putPokemon(id, name, attack, hp, defense, speed, height, weight, types, image)

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    getPokemonHandler,
    getDetailPokemonIdHandler,
    createPokemonHandler,
    validate,
    deletePokemonHandler,
    putPokemonHandler
};





