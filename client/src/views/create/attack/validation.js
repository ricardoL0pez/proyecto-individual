function validation(input) {
    const errors = {};

    if (!input.attack) {
        errors.attack = "Campo obbligatorio";
    } else if (isNaN(input.attack)) {
        errors.attack = "Attaco deve essere un numero";
    } else {
        const attackValue = parseInt(input.attack);

        if (attackValue <= 0) {
            errors.attack = "Attaco deve essere superiore a a 0";
        } else if (attackValue > 250) {
            errors.attack = "Attaco non può essere superiore a 250"; // Mensaje de error cuando es mayor a 250
        }
    }

    return errors;
}

export default validation;







/* if (input.attack <= 0) {
    errors.attack = "El ataque deber ser menor a 0";
};

if (input.attack >= 251) {
    errors.attack = "El ataque no puede ser mayor a 250"
};

if (input.defense <= 0) {
    errors.defense = "La defensa deber ser menor a 0";
};

if (input.defense >= 251) {
    errors.defense = "La defensa no puede ser mayor a 250"
};

if (input.speed <= 0 && input.speed.length) {
    errors.speed = "La velocidad deber ser menor a 0";
};

if (input.speed >= 251) {
    errors.speed = "La velocida no puede ser mayor a 250"
};

if (input.heigth <= 0) {
    errors.heigth ="La altura debe ser mayor a 0"
}

if (input.heigth >= 251) {
    errors.heigth = "El peso no puede ser mayor a 250"
};

if (input.weight <= 0) {
    errors.weight ="La altura debe ser mayor a 0"
}

if (input.weight >= 251) {
    errors.weight = "El peso no puede ser mayor a 250"
};

if (input.types.length === 0) {        
    errors.types ="Selecciona 1 o 2 tipos";
}; */


