import { addUserDb, checkIfUserExistsDb, validateUserDb } from '../services/db/user.js';

export async function addUser(req, res) {
    await addUserDb(req.body.email, req.body.password);
}

export async function getUserId(req, res) {
    const user_id = await validateUserDb(req.body.email, req.body.password);
    res.json(user_id);
}

export async function checkIfUserExists(req, res) {
    res.json(await checkIfUserExistsDb(req.body.email));
}