const express = require('express');
const routes = express.Router();

const tokenHandler = require('./controllers/token');
// const accountHandler;

routes.get('/GetLinkToken', tokenHandler.sendLinkToken);
routes.get('/AccessToken', tokenHandler.getExistingAccessToken);z
// routes.get('/Accounts', accountHandler.getAccounts);
// routes.get('/Balance', balanceHandler.getAccountBalance);
// routes.get('/Bank', bankHandler.getBank);
// routes.get('/Transactions', transactionHandler.getTransactions);

module.exports = routes