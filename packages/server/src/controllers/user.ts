import { Response } from 'express';
import { getUserDb } from '../services/db/user.js';
import { addUniqueUser, createAbstractedUser } from '../services/user.js';

export async function addUser(req, res) {
    const user = await addUniqueUser(req.body.email, req.body.password)
    if (user === null) {
        res.status(401).send({status: "Not a unique email!"});
    } else {
        res.json(user);
    }
}

export async function getUser(req, res: Response) {
    const user = await getUserDb(req.body.email, req.body.password);
    if (user) {
        res.json(createAbstractedUser(user));
    } else {
        res.status(401).send({status: "Wrong username or password!"});
    }
}