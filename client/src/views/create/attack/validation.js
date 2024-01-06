function validation(input) {
    const errors = {};

    if (!input.attack) {
        errors.attack = "Campo obbligatorio";
    } else if (isNaN(input.attack)) {
        errors.attack = "Attaco deve essere un numero";
    } else {
        const attackValue = parseInt(input.attack);

        if (attackValue <= 0) {
            errors.attack = "Attaco deve essere superiore a 0";
        } else if (attackValue > 250) {
            errors.attack = "Attaco non può essere superiore a 250"; 
        }
    }

    return errors;
}

export default validation;