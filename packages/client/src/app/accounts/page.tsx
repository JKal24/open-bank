'use client';

import { selectItems } from "@/libs/redux/bank/bankSlice"
import { useAppSelector } from "@/libs/redux/hooks"
import { useEffect, useState } from "react";

export default function Accounts() {
    
    const items = useAppSelector(selectItems)
    const [itemInfo, setItemInfo] = useState<ItemInfo>({balance:0, numInstitutions:0, currency_code:"", itemFinancials:[], transactionCategories:[]});
    
    interface ItemInfo {
        balance: number,
        numInstitutions: number,
        currency_code: string,
        itemFinancials: ItemFinancials[],
        transactionCategories: TransactionCategories[]
    }

    interface ItemFinancials {
        name: string,
        balance: number
    }

    interface TransactionCategories {
        name: string,
        occurences: number,
        totalSpent: number
    }

    useEffect(() => {
        const getItemInfo = () => {
            let balance = 0;
            let numInstitutions = 0;
            let currency_code = items[0]?.accounts[0]?.currency_code || "";
            const itemFinancials: ItemFinancials[] = [];
            const transactionCategories: TransactionCategories[] = [];
            const types: string[] = [];

            items.forEach((item, index) => {
                itemFinancials[index] = { name: item.institution_name, balance: 0 };
                item.accounts.forEach(account => {
                    balance += account.balance;
                    itemFinancials[index].balance += account.balance;

                    account.transactions.forEach(transaction => {
                        transaction.transaction_type.split(",").forEach(type => {

                            if (types.includes(type)) {
                                transactionCategories.forEach((category, index) => {
                                    if (category.name == type) {
                                        transactionCategories[index].occurences++;
                                        transactionCategories[index].totalSpent += transaction.amount;
                                    }
                                })
                            } else if (type != "") {
                                types.push(type);
                                transactionCategories.push({name: type, occurences:0, totalSpent:0});
                            }
                            
                        })
                    })
                })
                numInstitutions++;
            })
            
            return {
                balance,
                numInstitutions,
                currency_code,
                itemFinancials,
                transactionCategories
            };
        }
        setItemInfo(getItemInfo());
    }, [])

    return (
        <div className="flex flex-row">
            <div id="default-sidebar" className="z-40 w-fit h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-scroll bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">
                        <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                        </svg>
                        <span className="ml-3">Accounts Summary</span>
                    </div>
                    {
                        items.map((item, index) => (
                            <div key={index} className={`block min-w-[20rem] p-6 mr-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-slate-300 ${index % 3 == 0 ? 'bg-blue-50' : index % 3 == 1 ? 'bg-cyan-50' : 'bg-teal-50'}`}>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-white">{item.institution_name}</h5>
                                <div className="font-normal text-gray-700 dark:text-gray-400 flex flex-row justify-evenly">
                                    {
                                        item.accounts.map((account, accountIndex) => (
                                            <div key={accountIndex} className="mx-2 bg-slate-100 rounded-lg p-2">
                                                <h3 className="font-bold">{account.account_subtype.slice(0,1).toUpperCase()+account.account_subtype.slice(1) + " Account"}</h3>
                                                <div className="flex flex-row justify-between">
                                                    <h1>Balance</h1>
                                                    <h5>${account.balance}</h5>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="p-8 flex flex-col justify-center w-100% text-center bg-slate-100">
                <div className="flex flex-row w-100% justify-between px-20% mb-8">
                    <h1 className="ml-4 text-lg font-bold p-4 rounded-lg shadow bg-slate-300">{'Institutions Registered: ' + itemInfo.numInstitutions}</h1>
                    <h1 className="ml-4 text-lg font-bold p-4 rounded-lg shadow bg-slate-300">{'Total Balance: ' + itemInfo.balance + " " + itemInfo.currency_code}</h1>
                </div>
                <div>
                    {
                        itemInfo.itemFinancials.map((itemFinancial, index) => (
                            <div key={index} className="mx-2 rounded-lg px-25%">
                                <div className="flex flex-row justify-between">
                                    <h1>{itemFinancial.name}</h1>
                                    <div className="flex flex-row">
                                        <h1 className="px-2">Balance</h1>
                                        <h5>{"$" + itemFinancial.balance + " " + itemInfo.currency_code}</h5>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="p-4 my-6 mx-4 rounded-lg shadow font-bold bg-slate-100 text-center basis-100%">
                    <div>
                        <h1>Transactions</h1>
                        <div className="grid grid-cols-5 gap-1 px-6">
                            <h1 className="font-semibold bg-slate-300">Category</h1>
                            <h1 className="font-semibold bg-slate-300">Occurences</h1>
                            <h1 className="font-semibold bg-slate-300">Total Amount Spent</h1>
                        </div>
                            {
                                itemInfo.transactionCategories.map((category, index) => (
                                    <div key={index} className="grid grid-cols-5 gap-1 px-6">
                                        <h4 className="bg-slate-200 px-1 text-ellipsis overflow-hidden">
                                            {category.name}
                                        </h4>
                                        <h4 className="bg-slate-200 px-1 text-ellipsis overflow-hidden">
                                            {category.occurences}
                                        </h4>
                                        <h4 className="bg-slate-200 px-1 text-ellipsis overflow-hidden">
                                            {"$" + category.totalSpent}
                                        </h4>
                                    </div>
                                )
                            )}
                    </div>
                </div>
            </div>
            
        </div>
    )
}