const { Pokemon } = require('../db');

const deletePokemon = async (id) => { //recibe el ID  como argumentos desde donde se invoca esta función
    try {
        const pokemonToDelete = await Pokemon.findByPk(id)//metodo de sequelize buscar un registro en la base de datos por su clave primaria (Primary Key)

        if (!pokemonToDelete) {
            throw new Error('Pokemon not found 🫥')
        }else {
            await pokemonToDelete.destroy();

            return {
                success: true,
                message: `Pokemon with ID ${id} successfully deleted 🤪`
            };
        }
    } catch (error) {
        throw new Error(error.message)
    }
};

module.exports = deletePokemon;


