import { Request, Response, NextFunction } from 'express';
import { getLinkToken, getAccessToken } from '../services/token.js'

export async function sendLinkToken(req: Request, res: Response, next: NextFunction) {
    try {
        const linkToken = await getLinkToken();
        res.json(linkToken);
    } catch (err) {
        next(err);
    }
}

export async function sendAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
        const publicToken: string = Object.values<string>(req.body)[0];
        const accessToken = await getAccessToken(publicToken);
        res.json(accessToken);
    } catch (err) {
        next(err);
    }
}

export async function getExistingAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
    
    } catch (err) {
        next(err);
    }
}