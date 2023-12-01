const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
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
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
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
    altura: {
      type: DataTypes.INTEGER,
    },
    peso: {
      type: DataTypes.INTEGER,
    },
    created: { // con este atributo puedo luego filtrar los usuarios creados con mi BDD que estan en true o de la Api que estan en false, puesto en el controllador 
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    timestamps: false, //deshabilitar la creación automática de campos createdAt y updatedAt en la BDD asociada a ese modelo.
  });
};