function validation(input) {
    const errors = {};

    if (!input.hp) {
        errors.hp = "Campo obbligatorio";
    } else if (isNaN(input.hp)) {
        errors.hp = "HP deve essere un numero";
    } else {
        const hpValue = parseInt(input.hp);

        if (hpValue <= 0) {
            errors.hp = "HP deve essere superiore a a 0";
        } else if (hpValue > 250) {
            errors.hp = "HP non può essere superiore a 250"; // Mensaje de error cuando es mayor a 250
        }
    }

    return errors;
}

export default validation;