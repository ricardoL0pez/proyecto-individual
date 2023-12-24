const validation = (input) => {
    const errors = {}

    if (!input.name.trim()) {
        errors.name = "Campo obligatorio";
    } else {
        if (input.name.length > 10) {
            errors.name = "Debe ser menor a 10 caracteres";
        }

        if (!/^[a-zA-Z]+$/.test(input.name)) {
            errors.name = "El nombre solo puede contener letras";
        }
    }
    return errors;
};

export default validation;