const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
    sequelize.define('type', {// defino el modelo de datos type
        id: {
            type: DataTypes.UUID, // (Identificador Único Universal)dato que representa un identificador único de forma alfanumérica, longitud fija de 128 bits
            primaryKey: true, //ID se designa como la clave primaria
            defaultValue: DataTypes.UUIDV4, //genera automaticamnete un UUID
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created: { // con este atributo puedo luego filtrar los usuarios creados con mi BDD que estan en true o de la Api que estan en false, puesto en el controllador 
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }, {
        timestamps: false, //deshabilitar la creación automática de campos createdAt y updatedAt en la BDD asociada a ese modelo.
    });
};