'use client';

import { selectItems } from "@/libs/redux/bank/bankSlice"
import { useAppSelector } from "@/libs/redux/hooks"
import { AbstractedItem } from "@/types/items";
import { AbstractedTransaction } from "@/types/transactions";
import { useEffect, useState } from "react";

export default function Accounts() {
    
    const items = useAppSelector(selectItems)
    const [itemInfo, setItemInfo] = useState<ItemInfo>({balance:0, numInstitutions:0, currency_code:"", itemFinancials:[]});
    
    interface ItemInfo {
        balance: number,
        numInstitutions: number,
        currency_code: string,
        itemFinancials: ItemFinancials[],
    }

    interface ItemFinancials {
        name: string,
        balance: number
    }

    useEffect(() => {
        const getItemInfo = () => {
            let balance = 0;
            let numInstitutions = 0;
            let currency_code = items[0]?.accounts[0]?.currency_code || "";
            const itemFinancials: ItemFinancials[] = [];
            const types: string[] = [];

            items.forEach((item, index) => {
                itemFinancials[index] = { name: item.institution_name, balance: 0 };
                item.accounts.forEach(account => {
                    balance += account.balance;
                    itemFinancials[index].balance += account.balance;
                })
                numInstitutions++;
            })
            
            return {
                balance,
                numInstitutions,
                currency_code,
                itemFinancials
            };
        }
        setItemInfo(getItemInfo());
    }, [items])

    return (
        <div className="flex flex-row">
            <div className="p-8 flex flex-col justify-center w-100% text-center bg-slate-100">
                <div className="flex flex-row w-100% justify-between px-20% mb-8">
                    <h1 className="ml-4 text-lg font-bold p-4 rounded-lg shadow bg-slate-300">{'Institutions Registered: ' + itemInfo.numInstitutions}</h1>
                    <h1 className="ml-4 text-lg font-bold p-4 rounded-lg shadow bg-slate-300">{'Total Balance: $' + itemInfo.balance + " " + itemInfo.currency_code}</h1>
                </div>

                <div className="flex flex-col justify-center mt-8">
                    <div className=" flex w-100% flex-row justify-center p-2 text-gray-900 rounded-lg dark:text-white group">
                        <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                        </svg>
                        <span className="ml-3 font-bold">Accounts Summary</span>
                    </div>

                    {
                        items.map((item, index) => (
                            <div key={index} className={`block p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow ${index % 3 == 0 ? 'bg-blue-100 hover:bg-blue-200' : index % 3 == 1 ? 'bg-sky-100 hover:bg-sky-200' : 'bg-cyan-100 hover:bg-cyan-200'}`}>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-white">{item.institution_name}</h5>
                                <div className="font-normal text-gray-700 dark:text-gray-400 flex flex-row justify-evenly">
                                    <BankSummary item={item} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            
        </div>
    )
}

const BankSummary = (props: { item: AbstractedItem }) => {

    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState<AbstractedTransaction[]>([]);
    const [currencyCode, setCurrencyCode] = useState<string>("");

    useEffect(() => {
        setBalance(totalBalance());
        setTransactions(totalTransactions());
        setCurrencyCode(getCurrencyCode());
    }, [])

    const totalBalance = () => {
        let sumBalance = 0;
        props.item.accounts.forEach(account => sumBalance += account.balance);
        return sumBalance;
    }

    const totalTransactions = () => {
        const transactions: AbstractedTransaction[] = [];
        props.item.accounts.forEach(account => {
            account.transactions.forEach(transaction => transactions.push(transaction));
        })
        return transactions;
    }

    const getCurrencyCode = () => {
        let currencyCode = "";
        props.item.accounts.forEach(account => {
            if (account.currency_code != null) currencyCode = account.currency_code;
        })
        return currencyCode;
    }

    return (
        <div>
            <h1>{'Accounts Balance: $' + balance + " " + currencyCode || ""}</h1>
            <div className="p-4 my-6 mx-4 rounded-lg shadow font-bold bg-slate-100 text-center basis-100%">
                <div>
                    <h1>Transactions</h1>
                    <div className="grid grid-cols-5 gap-1 px-6">
                        <h1 className="font-semibold bg-slate-300">Date</h1>
                        <h1 className="font-semibold bg-slate-300">Amount</h1>
                        <h1 className="font-semibold bg-slate-300">Merchant</h1>
                        <h1 className="font-semibold bg-slate-300">Payment Type</h1>
                        <h1 className="font-semibold bg-slate-300">Transaction Type</h1>
                    </div>
                        {
                            transactions.map((transaction, index) => (
                                <div key={index} className="grid grid-cols-5 gap-1 px-6">
                                    <h4 className="bg-slate-200 px-1 text-ellipsis overflow-hidden">
                                        {transaction.payment_date}
                                    </h4>
                                    <h4 className="bg-slate-200 px-1 text-ellipsis overflow-hidden">
                                        {`${transaction.amount} ${transaction.currency_code}`}
                                    </h4>
                                    <h4 className="bg-slate-200 px-1 text-ellipsis overflow-hidden">
                                        {transaction.merchant_name}
                                    </h4>
                                    <h4 className="bg-slate-200 px-1 text-ellipsis overflow-hidden">
                                        {transaction.payment_channel}
                                    </h4>
                                    <h4 className="bg-slate-200 px-1 text-ellipsis overflow-hidden">
                                        {transaction.transaction_type.replace(",", ", ")}
                                    </h4>
                                </div>
                            )
                        )}
                </div>
            </div>
        </div>
    )
}