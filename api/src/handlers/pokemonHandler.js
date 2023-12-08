const getAllPokemons = require('../controllers/getAllPokemons');
const getPokemonByName = require('../controllers/getPokemonByName');
const getPokemonIdHandler = require('../controllers/getPokemonIdHandler');
const createPokemon = require('../controllers/createPokemon');


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
    const { name, hp, attack, defense, speed, types, height, weight, image } = req.body;
    try {
        const response = await createPokemon({ name, hp, attack, defense, speed, types, height, weight, image });
        res.status(200).json(response.message); // accedo a la propiedad message del objeto response { success: true, message: `Character ${name} was successfully created` }
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





//Este archivo contiene un handler en Express. Un handler es una función que maneja las solicitudes HTTP entrantes y las envía a las funciones o controladores adecuados para realizar la lógica del negocio. En este caso, createPokemonHandler es un handler para la ruta que se encarga de crear un nuevo Pokémon.
//Diferencia entre un handler y un controlador:
//Handler: En términos de Express u otros marcos web, un handler es una función que maneja las solicitudes HTTP. Este puede ser el encargado de determinar qué controlador se llama o puede incluir la lógica directamente.
//Controlador: Es una parte de la arquitectura MVC (Modelo-Vista-Controlador) y se encarga de manejar la lógica del negocio. Los controladores se utilizan para procesar datos, aplicar reglas de negocio, interactuar con la base de datos y preparar una respuesta para enviar de vuelta al cliente.
