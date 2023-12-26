function validation(input) {
    const errors = {};

    if (!input.weight) {
        errors.weight = "Campo obbligatorio";
    } else if (isNaN(input.weight)) {
        errors.weight = "Peso deve essere un numero";
    } else {
        const weightValue = parseInt(input.weight);

        if (weightValue <= 0) {
            errors.weight = "Peso deve essere superiore a a 0";
        } else if (weightValue > 250) {
            errors.weight = "Peso non può essere superiore a 250"; // Mensaje de error cuando es mayor a 250
        }
    }

    return errors;
}

export default validation;