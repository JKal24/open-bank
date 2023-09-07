import { Router } from 'express';
const router = Router();
import { sendLinkToken, getExistingAccessToken, sendAccessToken } from './controllers/token.js';
import { addUser, getUser } from './controllers/user.js';
import { addNewBank, getAllBanks, removeBank } from './controllers/bank.js';
router.get('/GetLinkToken', sendLinkToken);
router.post('/GetAccessToken', sendAccessToken);
router.get('/AccessToken', getExistingAccessToken);
router.post('/AddUser', addUser);
router.post('/GetUserId', getUser);
router.post('/AddBank', addNewBank);
router.post('/RemoveBank', removeBank);
router.post('/GetBank', getAllBanks);
// routes.get('/Accounts', accountHandler.getAccounts);
// routes.get('/Balance', balanceHandler.getAccountBalance);
// routes.get('/Bank', bankHandler.getBank);
// routes.get('/Transactions', transactionHandler.getTransactions);
export default router;
//# sourceMappingURL=routes.js.map