import { addUserDb, getUserIdDb } from '../services/db/user.js';
export async function addUser(req, res) {
    res.json(await addUserDb(req.params.email, req.params.pass));
}
export async function getUser(req, res) {
    res.json(await getUserIdDb(req.params.email));
}
//# sourceMappingURL=user.js.map