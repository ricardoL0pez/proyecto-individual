const { Router } = require("express");
const getTypeHandler = require('../handlers/getTypeHandler')

const typeRouter = Router();

typeRouter.get('/', getTypeHandler);

module.exports = typeRouter;

