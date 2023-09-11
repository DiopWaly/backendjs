const express = require('express');
const routes = express.Router();
const userCtrl = require('../controllers/User')

routes.post('/signup', userCtrl.signup);
routes.post('/login', userCtrl.login);

module.exports = routes;