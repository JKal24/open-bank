'use client'

import { useState, useEffect } from 'react';
import {
    usePlaidLink
} from 'react-plaid-link';
import { useAppSelector, useAppDispatch } from '@/libs/hooks';
import { UserAccountInfo } from '@/libs/account/accountSlice';
import { AccountInfo, addAccount } from '@/libs/account/accountSlice';

export default function Dashboard() {

    const [linkToken, setLinkToken] = useState<string|null>(null);
    const userAccounts = useAppSelector(state => state.accounts.UserAccounts)

    useEffect(() => {
        const createLinkToken = async () => {
            const tokenResponse = await fetch('http://localhost:5000/GetLinkToken');
            const response = await tokenResponse.json();
            setLinkToken(response);
        }
        createLinkToken();
    }, []);

    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: async (publicToken, metadata) => {
            const accessTokenRequest = await fetch('http://localhost:5000/GetAccessToken', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({publicToken})
            });

            const newAccessToken = await accessTokenRequest.json();

            const accounts: AccountInfo[] = metadata.accounts.map(plaidAccount => {
                const accountInfo: AccountInfo = {
                    accountId: plaidAccount.id,
                    accountName: plaidAccount.name,
                    accountType: plaidAccount.type,
                    accountSubtype: plaidAccount.subtype,
                    accountMask: plaidAccount.mask
                }
                return accountInfo;
            })

            const userAccount: UserAccountInfo = {
                accessToken: newAccessToken,
                institution: metadata.institution? metadata.institution.name : "",
                institution_id: metadata.institution? metadata.institution.name : "",
                accounts: accounts
            }

            addAccount(userAccount);

            await fetch('http://localhost:5000/AddAccount', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userAccount)
            });
        },
    });
    
    return (
        <div>
            <div>
                <h2>All Accounts</h2>
                <div>

                </div>
            </div>
            <button onClick={ () => open() }  disabled={!ready}>
                Add Account
            </button>
        </div>
    );
}