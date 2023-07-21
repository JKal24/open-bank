const { Configuration, PlaidApi, Products, PlaidEnvironments } = require('plaid');

const ENV = process.env.PLAID_ENV || "sandbox"
const CLIENT_ID = process.env.PLAID_CLIENT_ID
const SECRET = process.env.PLAID_SECRET
const PRODUCTS = (process.env.PLAID_PRODUCTS || "auth,transactions").split(",")
const COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || "US,CA").split(",")
const USER_ID = process.env.PLAID_USER || "user_good"

const config = new Configuration({
    basePath: PlaidEnvironments[ENV],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': CLIENT_ID,
            'PLAID-SECRET': SECRET,
            'Plaid-Version': '2020-09-14',
        },
    },
});

const client = new PlaidApi(config);

async function getLinkToken() {
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
                    account_subtypes: ["checking", "savings"],
                },
            },
        };
    
        const tokenResponse = await client.linkTokenCreate(linkTokenRequest)
        return tokenResponse.data.link_token
        
    } catch (err) {
        console.log(err)
    }
}

async function getAccessToken(publicToken) {
    const accessTokenRequest = {
        public_token: publicToken,
    };
    const response = await client.itemPublicTokenExchange(accessTokenRequest);
    return response.data.access_token;
}

async function getAccountBalance(publicToken) {
    const accessToken = getAccessToken(publicToken)

    const request = {
        access_token: accessToken,
    };
    try {
        const response = await client.accountsBalanceGet(request);
        return response.data.accounts;
    } catch (error) {

    }
}

module.exports = { getLinkToken, getAccessToken, getAccountBalance }