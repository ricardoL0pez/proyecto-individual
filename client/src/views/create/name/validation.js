const validation = (input, pokemons) => {
    const errors = {};

    if (!input.name.trim()) {
        errors.name = "Campo obbligatorio";
    } else {
        if (input.name.length > 10) {
            errors.name = "Il nome deve essere inferiore a 10 caratteri";
        }

        if (!/^[a-zA-Z]+$/.test(input.name)) {
            errors.name = "Il nome può contenere solo lettere";
        }

        // Verificar si el nombre del Pokémon ya existe en el conjunto de datos
        const isNameExists = pokemons.some(
            (pokemon) => pokemon.name.toLowerCase() === input.name.toLowerCase()
        );

        if (isNameExists) {
            errors.name = "Il nome del Pokémon esiste già.";
        }
    }

    return errors;
};

export default validation;