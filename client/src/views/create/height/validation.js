function validation(input) {
    const errors = {};

    if (!input.height) {
        errors.height = "Campo obbligatorio";
    } else if (isNaN(input.height)) {
        errors.height = "Altezza deve essere un numero";
    } else {
        const heightValue = parseInt(input.height);

        if (heightValue <= 0) {
            errors.height = "Altezza deve essere superiore a a 0";
        } else if (heightValue > 250) {
            errors.height = "Altezza non può essere superiore a 250"; // Mensaje de error cuando es mayor a 250
        }
    }

    return errors;
}

export default validation;



