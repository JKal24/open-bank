'use client'

import Link from 'next/link';
import diagonal from '@/assets/diagonal.png';
import handshake from '@/assets/businessmen-handshake-handshake.gif';
import personComputer from '@/assets/person-computer.jpg';
import { useAppDispatch } from '@/libs/redux/hooks';
import { switchDefaultSignup } from '@/libs/redux/signup/signupSlice';

export default function LandingPage() {

    const dispatch = useAppDispatch();

    return (
        <div className="w-100% pt-6">
            <img src={diagonal.src} className='absolute z-[-1] top-0% right-0'/>
            <div className="flex flex-row justify-center">
                <div className="w-35% pr-6 flex flex-col flex-nowrap p-6">
                    <p className="text-3xl font-bold text-center">Your <em className="text-3xl text-blue-900">solution</em> to managing your banking accounts in one secure and easy to access location</p>
                    <p className="my-8">We provide a free platform available to anyone around the globe! Sign up to our newsletter to find out more</p>
                    <div className="w-100% flex flex-row justify-evenly">
                        <input placeholder="Enter Email" className="mr-2"></input>
                        <button className="bg-blue-950 text-white p-2">Keep me Posted</button>
                    </div>
                </div>
                <img src={handshake.src} className="rounded-md border-black border-4"/>
            </div>

            <div className="flex flex-row justify-center mt-24 mb-8">
                <img src={personComputer.src} className="w-96 rounded-md border-black border-4"/>
                <div className="flex flex-col justify-center w-35% pl-6">
                    <p className="text-4xl pb-6">Register and link your bank accounts now!</p>
                    <p>Managing your banking has never been easier with direct access to transactions, balances & other useful information for all of your bank in one convenient location.</p>
                    <div className="flex flex-row justify-center mt-4">
                        <Link href={{pathname: '/entry'}}><button onClick={() => dispatch(switchDefaultSignup(true))} className="bg-blue-950 text-white p-2 w-fit">Register</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}