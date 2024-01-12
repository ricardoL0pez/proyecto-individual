


const { Pokemon } = require('../db');

const putPokemon = async (id, name, attack, hp, defense, speed, height, weight, types, image) => {
    try {
        const pokemonToPut = await Pokemon.findByPk(id);

        if (!pokemonToPut) {
            throw new Error('Pokemon not found');
        } else {
            // Actualización de los campos según lo proporcionado
            const updatedPokemon = await Pokemon.update(
                {
                    name: name,
                    hp: hp,
                    defense: defense,
                    attack: attack,
                    speed: speed,
                    height: height,
                    weight: weight,
                    types: types,
                    image: image
                },
                {
                    where: {
                        id: id
                    }
                }
            );

            if (updatedPokemon[0] === 1) {
                return {
                    success: true,
                    message: `Pokemon with ID ${id} successfully updated`,
                };
            } else {
                throw new Error('Failed to update Pokemon');
            }
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = putPokemon;