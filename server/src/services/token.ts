import { CountryCode, Products, DepositoryAccountSubtype, AccountsBalanceGetRequest } from 'plaid'
import { client } from './client.js'

const PRODUCTS = [Products.Auth, Products.Transactions];
const COUNTRY_CODES: CountryCode[] = [CountryCode.Ca, CountryCode.Us];
const ACCOUNT_SUBTYPES = [DepositoryAccountSubtype.Checking, DepositoryAccountSubtype.Savings];
const USER_ID = process.env.PLAID_USER || "user_good"

export async function getLinkToken() {
    try {
        const linkTokenRequest = {
            user: {
                client_user_id: USER_ID,
            },
            client_name: USER_ID,
            products: PRODUCTS,
            country_codes: COUNTRY_CODES,
            language: 'en',
            account_filters: {
                depository: {
                    account_subtypes: ACCOUNT_SUBTYPES,
                },
            },
        };
    
        const tokenResponse = await client.linkTokenCreate(linkTokenRequest)
        return tokenResponse.data.link_token
        
    } catch (err) {
        console.log(err)
    }
}

export async function getAccessToken(publicToken) {
    const accessTokenRequest = {
        public_token: publicToken,
    };
    const response = await client.itemPublicTokenExchange(accessTokenRequest);
    return response.data.access_token;
}