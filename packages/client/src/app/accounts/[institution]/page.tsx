'use client'

import { selectItems } from '@/libs/redux/bank/bankSlice';
import { useAppSelector } from '@/libs/redux/hooks';
import { selectUserId } from '@/libs/redux/user/userSlice';
import { parseJSONReadableStream, parseReadableStream } from '@/libs/requests/stream';
import { AbstractedItem } from '@/types/items';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Account({ params }: { params: { institution: string } }) {

    const institution = decodeURI(params.institution);
    const items = useAppSelector(selectItems);
    const userId = useAppSelector(selectUserId);
    const router = useRouter();

    const [item, setItem] = useState<AbstractedItem>({institution_id: "", institution_name: "", accounts: []});
    const [couldNotRemoveError, setCouldNotRemoveErorr] = useState(false);

    useEffect(() => {
        items.forEach(item => {
            if (item.institution_name === institution) {
                setItem(item);
            }
        })
    }, []);

    const handleRemove = async () => {
        const status = await parseReadableStream(await fetch('/api/account/remove', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({institution, user_id: userId})
        }))
        
        if (status === '200') {
            router.replace('/summary');
        } else {
            setCouldNotRemoveErorr(true);
        }
    }

    return (
        <div className="flex flex-col">
            <div className="p-4 my-6 mx-25% rounded-lg shadow font-bold bg-slate-300 text-center">
                <h1>{item.institution_name}</h1>
                <div className="flex flex-row justify-between">
                    <h1 className="text-red-600 flex flex-col justify-end">{couldNotRemoveError ? "Unable to remove account!" : ""}</h1>
                    <button className="bg-red-600 hover:bg-red-700 p-2 rounded-md font-bold" onClick={handleRemove}>Remove Bank</button>
                </div>
            </div>
            
            <div className="flex flex-row mx-10%">
                {
                    item.accounts.map((account, index) => (
                        <div key={index} className="p-4 my-6 mx-4 rounded-lg shadow font-bold bg-slate-100 text-center basis-100%">
                            <div className="p-4 my-6 mx-10% rounded-lg shadow flex justify-between bg-slate-300">
                                <h1>{`${account.account_subtype.charAt(0).toUpperCase() + account.account_subtype.slice(1)} account`}</h1>
                                <p>{`Current balance: ${account.balance} ${account.currency_code}`}</p>
                            </div>
                            <div>
                                <h1>Transactions</h1>
                                <div className="grid grid-cols-5 gap-1 px-6">
                                    <h1 className="font-semibold bg-slate-300">Date</h1>
                                    <h1 className="font-semibold bg-slate-300">Amount</h1>
                                    <h1 className="font-semibold bg-slate-300">Merchant</h1>
                                    <h1 className="font-semibold bg-slate-300">Payment Type</h1>
                                    <h1 className="font-semibold bg-slate-300">Transaction Type</h1>
                                </div>
                                <div>
                                    {
                                        account.transactions.map((transaction, tIndex) => (
                                            <div key={tIndex} className="grid grid-cols-5 gap-1 px-6">
                                                <h4 className="bg-slate-200 px-1 text-ellipsis overflow-hidden">
                                                    {transaction.payment_date}
                                                </h4>
                                                <h4 className="bg-slate-200 px-1 text-ellipsis overflow-hidden">
                                                    {`${transaction.amount} ${transaction.currency_code}`}
                                                </h4>
                                                <h4 className="bg-slate-200 px-1 text-ellipsis overflow-hidden">
                                                    {transaction.merchant_name === "" ? "N/A" : transaction.merchant_name}
                                                </h4>
                                                <h4 className="bg-slate-200 px-1 text-ellipsis overflow-hidden">
                                                    {transaction.payment_channel}
                                                </h4>
                                                <h4 className="bg-slate-200 px-1 text-ellipsis overflow-hidden">
                                                    {transaction.transaction_type}
                                                </h4>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}