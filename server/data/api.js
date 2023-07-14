const { Configuration, PlaidApi, Products, PlaidEnvironments} = require('plaid');

const ENV = process.env.PLAID_ENV || "sandbox"
const CLIENT_ID = process.env.PLAID_CLIENT_ID
const SECRET = process.env.PLAID_SECRET
const PRODUCTS = (process.env.PLAID_PRODUCTS || "auth,transactions").split(",")
const COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || "US,CA").split(",")

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

let ACCESS_TOKEN = null;
let ITEM_ID = null;
let PAYMENT_ID = null;
let TRANSFER_ID = null;

async function getLinkToken() {
    try {
        const request = {
            user: {
                client_user_id: CLIENT_ID,
            },
            client_name: 'Bank1',
            products: PRODUCTS,
            country_codes: COUNTRY_CODES,
            language: 'en',
            account_filters: {
                depository: {
                    account_subtypes: ["checking", "savings"],
                },
            },
        };
    
        const tokenResponse = await client.linkTokenCreate(request)
        return tokenResponse.data.link_token
    } catch (err) {
        console.log(err)
    }
    
}

async function postRequest(request, args) {
    const linkToken = getLinkToken()


}

module.exports = { getLinkToken }