import { addBank } from '../services/bank.js';
export async function addNewBank(req, res, next) {
    try {
        const email = req.body.email;
        const userAccountInfo = req.body.info;
        const output = await addBank(userAccountInfo, email);
        res.json(output);
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=bank.js.map