const axios = require('axios'); 
const { Type } = require('../db');
const { URL_TYPE } = require('../utils/config'); 


const getAllType = async () => { /**Obtengo informacion de la BD, lee archivos, llama API externa y la retorna, por lo tanto debe ser ASYNC*/
    const infoDB = await Type.findAll();
    const infoApi = (await axios.get(URL_TYPE)).data.results.map((nameTypeApi) => {
        return { name: nameTypeApi.name };
    });

    if (infoDB.length === 0) {
        try {
            await Type.bulkCreate(infoApi); //método de Sequelize, creo múltiples registros en la BD
            const infoDBAfterInsert = await Type.findAll(); //método de Sequelize

            return {
                message: 'Data inserted successfully.',
                insertedData: infoDBAfterInsert
            };

        } catch (error) {
            console.error(error);
            throw Error('Error while inserting data:', error);
        }
    } else {
        console.error(error);
        throw Error('Non-empty "Type" table during data insertion.');
    }
};

module.exports = getAllType;

//res.send

/* GET | /types

-  Obtiene un arreglo con todos los tipos de pokemones.✅
-  En una primera instancia, cuando la base de datos este vacía, 
deberás guardar todos los tipos que encuentres en la API.✅
-  Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). 
Luego de obtenerlos de la API, deben ser guardados en la base de datos 
para su posterior consumo desde allí. ✅*/


//module.exports es un objeto que se utiliza para exponer variables, funciones u objetos desde un archivo de Node.js. Puede contener cualquier tipo de datos: objetos, funciones, cadenas, números, etc. Al exportar algo con module.exports, estamos permitiendo que otros archivos de Node.js accedan a esos datos.
//Las funciones asíncronas o async functions M3
//try...catch es una estructura de control en JavaScript que se utiliza para manejar errores de manera controlada. Permite controlar las excepciones que pueden ocurrir durante la ejecución de un bloque de código y tomar acciones específicas cuando se produce un error.