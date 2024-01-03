const getAllType = require('../controllers/getAllType');

const getTypeHandler = async (req, res) => {
  try {
    const response = await getAllType(); // Llama a la función getAllType para obtener todos los tipos de Pokémon
    res.status(200).json(response); // Devuelve una respuesta exitosa con los tipos obtenidos en formato JSON
  } catch (error) {
    res.status(404).json({ error: error.message }); 
  }
};

module.exports = getTypeHandler;