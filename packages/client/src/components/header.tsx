'use client'

import logo from '@/assets/logo.png'
import Link from 'next/link';
import { useAppSelector } from '@/libs/redux/hooks';
import { selectUserToken } from '@/libs/redux/user/userSlice';
import { purge } from '@/libs/redux/store';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {

    const [loggedIn, setLoggedIn] = useState(false);
    const user_token: string = useAppSelector(selectUserToken);
    const url = usePathname()
    const searchParams = useSearchParams();

    useEffect(() => {
        const publicPaths = ['/entry', '/', '/auth'];
        const path = url.split('?')[0];

        if (user_token != "" && !publicPaths.includes(path)) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [url, searchParams])

    return (
        <div className='w-full py-4 h-fit bg-footer'>
            {
                loggedIn ? (
                    <div className="flex flex-row justify-between px-10">
                        <div className="flex flex-row mx-5">
                            <a href="/summary">
                                <img src={logo.src} className="rounded-full mr-6" />
                            </a>
                            <div className="flex flex-col justify-center">
                                <div className="flex flex-row space-x-6">
                                    <Link href="/accounts" className="">Accounts</Link>
                                    <Link href="/transactions" className="">Transactions</Link>
                                    <Link href="/transfers" className="">Transfers</Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center mr-10">
                            <Link href="/entry" className="" onClick={() => purge()}>Log Out</Link>
                        </div>
                    </div>
                ) : (
                    <div className='flex m-auto w-100% justify-between px-20%'>
                        <a href="/">
                            <img src={logo.src} className="rounded-full mr-6" />
                        </a>
                        <div className='table'> 
                            <Link className='font-bold align-bottom table-cell pr-3' href="#">About Us</Link>
                            <Link className='font-bold align-bottom table-cell' href="#">Resources</Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}