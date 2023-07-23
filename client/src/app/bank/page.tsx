'use client'

import { useState, useEffect } from 'react';
import {
    usePlaidLink
} from 'react-plaid-link';

export default function Dashboard() {

    const [linkToken, setLinkToken] = useState<string|null>(null);

    useEffect(() => {
        const createLinkToken = async () => {
            // const tokenResponse = await fetch('http://localhost:5000/GetLinkToken');
            // const response = await tokenResponse.json();
            const response = "xd";
            setLinkToken(response);
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
        <main>
            <button onClick={ () => open() }  disabled={!ready}>
                Add Account
            </button>
        </main>
    );
}