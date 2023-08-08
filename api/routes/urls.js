const express = require('express');
const urlsController = require('../controllers/urls');

const urlsRouter = express.Router();

urlsRouter.get('/:codeId', urlsController.getAll);

module.exports = urlsRouter;