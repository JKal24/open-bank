import { addUserDb, checkIfUserExistsDb, getUserIdDb } from '../services/db/user.js';
export async function addUser(req, res) {
    res.json(await addUserDb(req.body.email, req.body.password));
}
export async function getUser(req, res) {
    res.json(await getUserIdDb(req.body.email));
}
export async function checkIfUserExists(req, res) {
    res.json(await checkIfUserExistsDb(req.body.email));
}
//# sourceMappingURL=user.js.map