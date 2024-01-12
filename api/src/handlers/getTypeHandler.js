const getAllType = require('../controllers/getAllType');

const getTypeHandler = async (req, res) => {
  try {
    const response = await getAllType(); 
    res.status(200).json(response); 
  } catch (error) {
    res.status(404).json({ error: error.message }); 
  }
};

module.exports = getTypeHandler;