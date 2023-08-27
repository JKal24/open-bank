'use client'

import logo from '@/assets/header-logo.png'
import Link from 'next/link';
import { useAppSelector } from '@/libs/redux/hooks';
import { selectUserId } from '@/libs/redux/user/userSlice';
import { purge } from '@/libs/redux/store';

export default function Header() {

    const user_id: string = useAppSelector(selectUserId);

    return (
        <div className='w-full py-2 h-fit bg-footer'>
            {
                user_id !== "" ? (
                    <div className="flex flex-row justify-between px-10">
                        <div className="flex flex-row mx-5">
                            <img src={logo.src} className="rounded-full mr-6" />
                            <div className="flex flex-col justify-center">
                                <div className="flex flex-row space-x-6">
                                    <Link href="/Accounts" className="">Accounts</Link>
                                    <Link href="/Transactions" className="">Transactions</Link>
                                    <Link href="/Services" className="">Services</Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center mr-10">
                            <Link href="/entry" className="" onClick={() => purge()}>Log Out</Link>
                        </div>
                    </div>
                ) : (
                    <div className='flex m-auto w-100% justify-between px-20%'>
                        <a href="#"><img src={logo.src}/></a>
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