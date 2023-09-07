'use client'

import { selectItems } from "@/libs/redux/bank/bankSlice"
import { useAppSelector } from "@/libs/redux/hooks"
import { AbstractedTransaction } from "@/types/transactions";
import { useEffect, useState } from "react";


export default function Transactions() {

    const [transactions, setTransactions] = useState<AbstractedTransaction[]>([]);
    const [transactionCategories, setTransactionCategories] = useState<TransactionCategories[]>([]);
    const items = useAppSelector(selectItems)

    useEffect(() => {
        const allTransactions: AbstractedTransaction[] = [];
        const transactionCategories: TransactionCategories[] = [];
        const types: string[] = [];
        
        items.forEach(item => {
            item.accounts.forEach(account => {
                account.transactions.forEach(transaction => {

                    allTransactions.push(transaction);

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
        })

        setTransactionCategories(transactionCategories);
        setTransactions(allTransactions);
    },[])

    interface TransactionCategories {
        name: string,
        occurences: number,
        totalSpent: number
    }

    return (
        <div className="p-4 my-6 mx-16 rounded-lg shadow font-bold bg-slate-100 text-center flex flex-col justify-center">
            <div>
                <h1>Transactions By Type</h1>
                <div className="grid grid-cols-3 gap-1 px-6">
                    <h1 className="font-semibold bg-slate-300">Category</h1>
                    <h1 className="font-semibold bg-slate-300">Occurences</h1>
                    <h1 className="font-semibold bg-slate-300">Total Amount Spent</h1>
                </div>
                    {
                        transactionCategories.map((category, index) => (
                            <div key={index} className="grid grid-cols-3 gap-1 px-6">
                                <h4 className="bg-slate-200 px-1 text-ellipsis overflow-hidden">
                                    {category.name}
                                </h4>
                                <h4 className="bg-slate-200 px-1 text-ellipsis overflow-hidden">
                                    {category.occurences}
                                </h4>
                                <h4 className="bg-slate-200 px-1 text-ellipsis overflow-hidden">
                                    {(category.totalSpent < 0 ? "-$" + Math.abs(category.totalSpent) : "$" + category.totalSpent)}
                                </h4>
                            </div>
                        ))
                    }
            </div>
            <div className="mt-8">
                <h1>All Transactions</h1>
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
    )
}