const express = require('express');

const apiRouter = express.Router();
const apiController = require('../controllers/apiController');

apiRouter.get('/users', apiController.users);
apiRouter.get('/tweets', apiController.tweets);

module.exports = apiRouter;
