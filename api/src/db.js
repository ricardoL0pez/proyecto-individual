require('dotenv').config(); //dependecnia que me ayuda a leer los datos guardados en .env
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, BDD } = process.env;  // variables de entorno
/*importacion de los modelos */
//const PokemonModel = require('./models/Pokemon');
//const TypeModel = require('./models/Type');

const sequelize = new Sequelize( //creamos una instancia de sequelize
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`, //configuarcion sequelize
   {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
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

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pokemon, Type } = sequelize.models;

/* Definición de los modelos que queremos implementar dentro de nuestra aplicacion*/
//PokemonModel(sequalize); 
//TypeModel(sequalize);

/* Asociaciones*/
Pokemon.belongsToMany(Type, {through: "Pokemon-Type"}); //al crear la asocacion se crea una columna que se conoce como la clabe foranea forenkey
Type.belongsToMany(Pokemon, {through: "Pokemon-Type"});
//Product.hasMany(Reviews);

module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
