function validation(input) {
    const errors = {};

    if (!input.defense) {
        errors.defense = "Campo obbligatorio";
    } else if (isNaN(input.defense)) {
        errors.defense = "Difesa deve essere un numero";
    } else {
        const defenseValue = parseInt(input.defense);

        if (defenseValue <= 0) {
            errors.defense = "Difesa deve essere superiore a 0";
        } else if (defenseValue > 250) {
            errors.defense = "Difesa non può essere superiore a 250";
        }
    }

    return errors;
}

export default validation;