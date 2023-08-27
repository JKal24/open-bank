'use client'

import { selectItems } from '@/libs/redux/bank/bankSlice';
import { useAppSelector } from '@/libs/redux/hooks';
import { AbstractedItem } from '@openbank/types';
import { useState, useEffect } from 'react';

export default function Account({ params }: { params: { institution: string,  } }) {

    const items = useAppSelector(selectItems);

    const institution = decodeURI(params.institution);
    const [item, setItem] = useState<AbstractedItem>({institution_id: "", institution_name: "", accounts: []});

    useEffect(() => {
        items.forEach(item => {
            if (item.institution_name === institution) {
                setItem(item);
            }
        })
    }, []);

    return (
        <div className="flex flex-col">
            <h1>{item.institution_name}</h1>
            <div className="flex flex-row">
                {
                    item.accounts.map(account => (
                        <div>
                            {account.account_subtype}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}