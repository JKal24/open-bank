import { Router } from 'express';
const router = Router()

import {sendLinkToken, getExistingAccessToken} from './controllers/token.js'
// const accountHandler;

router.get('/GetLinkToken', sendLinkToken);
router.get('/AccessToken', getExistingAccessToken);
// routes.get('/Accounts', accountHandler.getAccounts);
// routes.get('/Balance', balanceHandler.getAccountBalance);
// routes.get('/Bank', bankHandler.getBank);
// routes.get('/Transactions', transactionHandler.getTransactions);

export default router;