import logo from '@/assets/header-logo.png'
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {

    const isLoggedIn = true; //TO-DO: Replace with Redux

    return (
        <div className='w-full py-2 h-fit bg-footer'>
            {
                isLoggedIn ? (
                    <div className="flex flex-row mx-5">
                        <img src={logo.src} className="rounded-full mr-6" />
                        <div className="flex flex-col justify-center">
                            <div className="flex flex-row w-10 space-x-6">
                                <Link href="/Accounts" className="">Accounts</Link>
                                <Link href="/Transactions" className="">Transactions</Link>
                                <Link href="/Services" className="">Services</Link>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex m-auto w-100% justify-between px-20%'>
                        <a href="#"><img src={logo.src}/></a>
                        <div className='table'> 
                            <a className='font-bold align-bottom table-cell pr-3' href="#">About Us</a>
                            <a className='font-bold align-bottom table-cell' href="#">Resources</a>
                        </div>
                    </div>
                )
            }
        </div>
    )
}