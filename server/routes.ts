import { Router } from 'express';
const router = Router()

const tokenHandler = require('./controllers/token');
// const accountHandler;

router.get('/GetLinkToken', tokenHandler.sendLinkToken);
router.get('/AccessToken', tokenHandler.getExistingAccessToken);
// routes.get('/Accounts', accountHandler.getAccounts);
// routes.get('/Balance', balanceHandler.getAccountBalance);
// routes.get('/Bank', bankHandler.getBank);
// routes.get('/Transactions', transactionHandler.getTransactions);

export default router;