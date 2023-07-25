'use client'

import { useState } from 'react';
import loginBackground from '@/assets/login-background.png';
import business1 from '@/assets/business1.jpeg';
import joinUsToday from '@/assets/login-left.png';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signUp, setSignUp] = useState(true);

    return (
        <div className='relative'>
            <img className='h-full w-100% px-20% z-[-5] relative' src={loginBackground.src}/>
                <div className='w-100% h-fit absolute px-20% top-40% flex justify-center'>
                <img className='left-10% z-[-4] absolute' src={joinUsToday.src}/>
                <img className='right-10% w-[15rem] h-[20rem] z-[-4] absolute' src={business1.src}/>
                {signUp ? 
                        <form className="flex flex-col bg-white p-4 w-fit">
                            <div>Sample Card</div>
                            <label className="block text-center" htmlFor="register-email">Email address</label>
                            <input type="email" name="register-email" placeholder="Enter email" onChange={ e => setEmail(e.target.value) }/>

                            <label className="block text-center" htmlFor="register-password">Email address</label>
                            <input type="password" name="register-password" placeholder="Enter password" onChange={ e => setEmail(e.target.value) }/>
                            <button className="pt-2">Register</button>
                        </form>
                :
                <form className="flex flex-col bg-white p-4 w-fit">
                    <div>Sample Card</div>
                    <label className="block text-center" htmlFor="register-email">Email address</label>
                    <input type="email" name="register-email" placeholder="Enter email" onChange={ e => setEmail(e.target.value) }/>

                    <label className="block text-center" htmlFor="register-password">Email address</label>
                    <input type="password" name="register-password" placeholder="Enter password" onChange={ e => setEmail(e.target.value) }/>
                    <button className="pt-2">Login</button>
                </form>
                }
            </div>
        </div>
    )

}