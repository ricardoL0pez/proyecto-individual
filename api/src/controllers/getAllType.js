const axios = require('axios'); 
const { Type } = require('../db');
const { URL_TYPE } = require('../utils/config'); 

const getAllType = async () => {
    try {
        const infoDB = await Type.findAll();

        if (infoDB.length === 0) {
            const infoApi = (await axios.get(URL_TYPE)).data.results.map((nameTypeApi) => {
                return { name: nameTypeApi.name };
            });

            await Type.bulkCreate(infoApi);
            const infoDBAfterInsert = await Type.findAll();

            return {
                message: 'Data inserted successfully 🤩',
                insertedData: infoDBAfterInsert
            };
        } else {
            console.log('Types Loaded from the Database.');
            return infoDB;
        }
    } catch (error) {
        console.error('Error while processing data:', error);
        throw Error('Error while processing data:', error);
    }
};

module.exports = getAllType;