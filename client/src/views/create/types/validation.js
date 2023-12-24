const validation = ({ type }) => {
    let errors = {};

    if (!type || type.length === 0) {
        errors = {
            type: "Seleziona minimo un tipo.",
        };
    } 

    return errors;
};

export default validation;
