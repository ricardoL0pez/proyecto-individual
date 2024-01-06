const getAllPokemons = require('../controllers/getAllPokemons');
const getPokemonByName = require('../controllers/getPokemonByName');
const getPokemonId = require('../controllers/getPokemonId');
const createPokemon = require('../controllers/createPokemon');
const deletePokemon = require('../controllers/deletePokemon');
const putPokemon = require('../controllers/putPokemon');


const getPokemonHandler = async (req, res) => {
    const { name } = req.query; //extraigo el valor de la propiedad name del objeto req.query utilizando la sintaxis de desestructuración
    try {
        const response = name ? await getPokemonByName(name) : await getAllPokemons();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const getDetailPokemonIdHandler = async (req, res) => { //objeto "request" representa la solicitud HTTP entrante y contiene diferentes propiedades, como el cuerpo de la solicitud.
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api" //isNan() si es un valor numerico me devuelve false si es un diferente true // hdge54-hsvc65-hd54gd-64g5hf 
    try {
        const response = await getPokemonId(id, source); //le paso como segundo parametro source para decirle a mi controlador donde buscar el ID dependiendo del tipo de dato que llegue //pide una respuesta que va a provenir de la invocacion del controlador
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

/*Middleware*/
const validate = (req, res, next) => { //middleware para que mi require de createPokemonHandler pase primero por aqui y se valide 
    const { name, hp, attack, defense, speed, types, height, weight, image } = req.body;
    if (!name || !hp || !attack || !defense || !speed || !types || !height || !weight || !image) {
        return res.status(400).json({ error: 'Missing data' })
    } else {
        next();//next libera la require
    }
};

/*Crear Pokemon*/
const createPokemonHandler = async (req, res) => {
    const { name, hp, attack, defense, speed, types, height, weight, image } = req.body; //Obtengo los datos del Pokémon desde el cuerpo de la solicitud (req.body).
    try {
        const response = await createPokemon({ name, hp, attack, defense, speed, types, height, weight, image }); //Llamo a createPokemon() pasando los datos del Pokémon como argumento.
        res.status(200).json(response.message); // accedo a la propiedad message del objeto response { success: true, message: `Character ${name} was successfully created` }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deletePokemonHandler = async (req, res) => {
    const { id } = req.params; //obtengo id
    try {
        const response = await deletePokemon(id); // Llamo a la función deletePokemon y se pasa el id obtenido de la solicitud como argumento
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

/* const putPokemonHandler1 = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await putPokemon(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).jason({ error: error.message })
    }
} */
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







//Este archivo contiene un handler en Express. Un handler es una función que maneja las solicitudes HTTP entrantes y las envía a las funciones o controladores adecuados para realizar la lógica del negocio. En este caso, createPokemonHandler es un handler para la ruta que se encarga de crear un nuevo Pokémon.
//Diferencia entre un handler y un controlador:
//Handler: En términos de Express u otros marcos web, un handler es una función que maneja las solicitudes HTTP. Este puede ser el encargado de determinar qué controlador se llama o puede incluir la lógica directamente.
//Controlador: Es una parte de la arquitectura MVC (Modelo-Vista-Controlador) y se encarga de manejar la lógica del negocio. Los controladores se utilizan para procesar datos, aplicar reglas de negocio, interactuar con la base de datos y preparar una respuesta para enviar de vuelta al cliente.
