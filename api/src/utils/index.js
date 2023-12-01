const infoCleaner = arr => {
    if (!arr || !Array.isArray(arr)) {
        // Manejar el caso en que arr es undefined o no es un array
        return [];
    }

    return arr.map(user => {
        return {
            id: user.id,
            name: user.name,
            /* imagen: user.imagen,
            hp: user.hp,
            attack: user.attack,
            defense: user.defense,
            speed: user.speed,
            altura: user.altura,
            peso: user.peso, */
        };
    });
}

module.exports = infoCleaner;