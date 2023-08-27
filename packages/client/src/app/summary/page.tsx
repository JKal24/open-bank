'use client'

import { useState, useEffect } from 'react';
import {
    usePlaidLink
} from 'react-plaid-link';
import { useAppSelector, useAppDispatch } from '@/libs/redux/hooks';
import { selectUserId } from '@/libs/redux/user/userSlice';
import { selectItems, addItem } from '@/libs/redux/bank/bankSlice';
import { AbstractedBank, AbstractedItem, AbstractedTransaction } from '@openbank/types';
import { parseJSONReadableStream } from '@/libs/requests/stream';
import Link from 'next/link';

export default function Dashboard() {

    const [linkToken, setLinkToken] = useState<string|null>(null);
    const user_id = useAppSelector(selectUserId)

    const items = useAppSelector(selectItems);
    const [itemsIndex, setItemsIndex] = useState(0);
    const carouselSize = 3;

    const dispatch = useAppDispatch();

    const createLinkToken = async () => {
        const tokenResponse = await fetch('http://localhost:5000/GetLinkToken');
        const response = await tokenResponse.json();
        setLinkToken(response);
    }

    useEffect(() => {
        createLinkToken();

        const getItems = async () => {
            await parseJSONReadableStream<AbstractedBank>(fetch('api/account', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_id})
            })).then(bank => {
                bank.items.forEach(element => {
                    dispatch(addItem(element));
                });
            });
        }

        getItems();
    }, []);

    const shiftShownItemsRight = () => {
        setItemsIndex(Math.min(itemsIndex + 1, items.length - carouselSize));
    }

    const shiftShownItemsLeft = () => {
        setItemsIndex(Math.max(itemsIndex - 1, 0));
    }

    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: async (publicToken, metadata) => {

            const institutionName = metadata.institution?.name
            
            const newItemData: AbstractedItem = await fetch('/api/account/new', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({publicToken, user_id, institutionName})
            }).then(res => {
                return res.json()
            });

            createLinkToken();
            dispatch(addItem(newItemData));
        },
    });

    interface TransactionalItem {
        payment_date: string,
        amount: number,
        merchant_name: string,
        payment_channel: string,
        currency_code: string,
        transaction_type: string,
        institution_name: string,
        account_type: string
    }

    const buildTransactionsItems = (items: AbstractedItem[]): TransactionalItem[] => {

        const transactionalItems = items.flatMap(item => {

            return item.accounts.flatMap(account => {
                
                return account.transactions.flatMap(transaction => {

                    return {
                        payment_date: transaction.payment_date,
                        amount: transaction.amount,
                        merchant_name: transaction.merchant_name||"N/A",
                        payment_channel: transaction.payment_channel||"N/A",
                        currency_code: transaction.currency_code,
                        transaction_type: transaction.transaction_type||"N/A",
                        institution_name: item.institution_name,
                        account_type: account.account_subtype
                    }
                })
            }) 
        })
        transactionalItems.sort((transaction1, transaction2) => Date.parse(transaction2.payment_date) - Date.parse(transaction1.payment_date))
        return transactionalItems;
    }

    return (
        <div className="w-100%">
            <div className="p-4 my-6 mx-25% rounded-lg shadow flex justify-between bg-slate-300">
                <h1 className="flex flex-col justify-center ml-4 text-lg font-bold">Access Your Banks</h1>
                <button className="bg-slate-600 hover:bg-slate-700 text-white p-2 border-1 border-black rounded-md" onClick={ () => open() }  disabled={!ready}>
                    Add Institution +
                </button>
            </div>
            <div className="flex flex-row justify-center">
                <div className="flex flex-col justify-center">
                    <button type="button" onClick={shiftShownItemsLeft} className="text-white h-min bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span className="sr-only">Icon description</span>
                    </button>
                </div>
                <div className="flex flex-row overflow-x-auto pb-2">
                    {
                        items.slice(itemsIndex, itemsIndex + carouselSize).map((item, index) => (
                            <Link key={index} href={`/accounts/${item.institution_name}`} className={`block min-w-[20rem] p-6 mr-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-slate-300 ${index % 3 == 0 ? 'bg-blue-50' : index % 3 == 1 ? 'bg-cyan-50' : 'bg-teal-50'}`}>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-white">{item.institution_name}</h5>
                                <div className="font-normal text-gray-700 dark:text-gray-400 flex flex-row justify-evenly">
                                    {
                                        item.accounts.map((account, accountIndex) => (
                                            <div key={accountIndex} className="">
                                                <h1>{account.account_type}</h1>
                                                <h3>{account.account_subtype}</h3>
                                                <h5>{account.balance}</h5>
                                            </div>
                                        ))
                                    }
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <div className="flex flex-col justify-center">
                    <button type="button" onClick={shiftShownItemsRight} className="text-white h-min bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                        <span className="sr-only">Icon description</span>
                    </button>
                </div>
            </div>
            <div className='mx-10% flex flex-col text-center pb-8'>
                <h1 className="m-2 font-bold text-lg p-2 my-4 mx-40% rounded-lg shadow bg-slate-300">
                    Recent Transactions
                </h1>
                <div className="grid grid-cols-7 gap-1 px-6">
                    <h1 className="font-semibold bg-slate-300">Date</h1>
                    <h1 className="font-semibold bg-slate-300">Amount</h1>
                    <h1 className="font-semibold bg-slate-300">Merchant</h1>
                    <h1 className="font-semibold bg-slate-300">Payment Type</h1>
                    <h1 className="font-semibold bg-slate-300">Transaction Type</h1>
                    <h1 className="font-semibold bg-slate-300">Institution</h1>
                    <h1 className="font-semibold bg-slate-300">Account</h1>
                </div>
                {
                    buildTransactionsItems(items).slice(0, 10).map((transactionalItem, index) => (
                        <div key={index} className="grid grid-cols-7 gap-1 px-6">
                            <h4 className="bg-slate-200 px-1">
                                {transactionalItem.payment_date}
                            </h4>
                            <h4 className="bg-slate-200 px-1">
                                {`${transactionalItem.amount} ${transactionalItem.currency_code}`}
                            </h4>
                            <h4 className="bg-slate-200 px-1">
                                {transactionalItem.merchant_name}
                            </h4>
                            <h4 className="bg-slate-200 px-1">
                                {transactionalItem.payment_channel}
                            </h4>
                            <h4 className="bg-slate-200 px-1">
                                {transactionalItem.transaction_type}
                            </h4>
                            <h4 className="bg-slate-200 px-1">
                                {transactionalItem.institution_name}
                            </h4>
                            <h4 className="bg-slate-200 px-1">
                                {transactionalItem.account_type}
                            </h4>
                        </div>
                    ))
                }
            </div>
            
        </div>
    );
}