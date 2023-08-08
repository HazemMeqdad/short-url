const express = require('express');

const redirectController = require('../controllers/redirect');

const redirectRouter = express.Router();

redirectRouter.get('/:codeId', redirectController.redirectRoute);

module.exports = redirectRouter;