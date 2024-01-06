require('dotenv').config(); //Dependencia para leer las variables de entorno
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;//Variables de entorno

const sequelize = new Sequelize( //Creo una instancia de sequelize para interactuar con la base de datos PostgreSQL
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`, //Configuración de conexión a la base de datos
   {
      logging: false, 
      native: false, 
   }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades, para relacionarlos hacemos un destructuring
const { Pokemon, Type } = sequelize.models;

/* Definición de los modelos que queremos implementar dentro de nuestra aplicacion*/
//PokemonModel(sequalize); 
//TypeModel(sequalize);

//Asociaciones
Pokemon.belongsToMany(Type, {through: "pokemon_type"}); //al crear la asocacion se crea una columna que se conoce como la clave foranea forenkey
Type.belongsToMany(Pokemon, {through: "pokemon_type"});

module.exports = {
   ...sequelize.models, 
   conn: sequelize,
};

/*inicializa la conexión a la base de datos*/