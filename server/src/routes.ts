import { Router } from 'express';
const router = Router()

import {sendLinkToken, getExistingAccessToken, sendAccessToken} from './controllers/token.js'
// const accountHandler;

router.get('/GetLinkToken', sendLinkToken);
router.post('/GetAccessToken', sendAccessToken);
router.get('/AccessToken', getExistingAccessToken);
// routes.get('/Accounts', accountHandler.getAccounts);
// routes.get('/Balance', balanceHandler.getAccountBalance);
// routes.get('/Bank', bankHandler.getBank);
// routes.get('/Transactions', transactionHandler.getTransactions);

export default router;