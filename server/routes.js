const express = require('express');
const routes = express.Router();

const plaidHandler = require('./controllers/plaid');

routes.get('/GetLinkToken', plaidHandler.sendLinkToken);

module.exports = routes