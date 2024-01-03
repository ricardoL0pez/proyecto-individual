const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {// Exporta una función que define el modelo 'pokemon' y recibe la conexión a sequelize como parámetro
  sequelize.define('pokemon', {  //Definicion del modelo pokemon
    id: {
      type: DataTypes.UUID, // (Identificador Único Universal)dato que representa un identificador único de forma alfanumérica, longitud fija de 128 bits
      primaryKey: true, //ID se designa como la clave primaria
      defaultValue: DataTypes.UUIDV4, //genera automaticamnete un UUID
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true, // Validación para asegurar que el valor sea una URL
      },
    },
    created: { // con este atributo puedo luego filtrar los usuarios creados con mi BDD que estan en true o de la Api que estan en false o undefine, puesto en el controllador 
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    timestamps: false, //deshabilitar la creación automática de campos createdAt y updatedAt en la BDD asociada a ese modelo.
  });
};