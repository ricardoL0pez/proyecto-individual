function validation(input) {
    const errors = {};

    if (!input.speed) {
        errors.speed = "Campo obbligatorio";
    } else if (isNaN(input.speed)) {
        errors.speed = "Velocita deve essere un numero";
    } else {
        const speedValue = parseInt(input.speed);

        if (speedValue <= 0) {
            errors.speed = "Velocita deve essere superiore a 0";
        } else if (speedValue > 250) {
            errors.speed = "Velocita non può essere superiore a 250"; 
        }
    }

    return errors;
}

export default validation;