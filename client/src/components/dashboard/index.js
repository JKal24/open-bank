import React, { useCallback, useState, useEffect } from 'react';
import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOptions,
} from 'react-plaid-link';
import { getLinkToken } from '../../data/plaid';

export default function Dashboard() {

    const [linkToken, setLinkToken] = useState(null);

    useEffect(() => {
        const createLinkToken = async () => {
            const tokenResponse = await getLinkToken();
            setLinkToken(tokenResponse);
        }
        createLinkToken();
    }, []);

    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: (publicToken, metadata) => {
            console.log(publicToken, metadata);
        },
    });
    
    return (
        <button onClick={ () => open() }  disabled={!ready}>
            Read Account
        </button>
    );
}