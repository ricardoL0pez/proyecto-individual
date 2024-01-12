const { Pokemon } = require('../db');

const deletePokemon = async (id) => { 
    try {
        const pokemonToDelete = await Pokemon.findByPk(id)

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


