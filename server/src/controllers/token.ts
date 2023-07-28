import { getLinkToken, getAccessToken } from '../services/token.js'

export async function sendLinkToken(req, res) {
    const linkToken = await getLinkToken();
    res.json(linkToken);
}

export async function sendAccessToken(req, res) {
    console.log(req.body);
    const accessToken = await getAccessToken(req.body);
    console.log(accessToken);
    res.json(accessToken);
}

export async function getExistingAccessToken(req, res) {
    
}