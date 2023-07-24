'use client'

import { useState } from 'react';
import cityImage from '../../assets/city.jpg'

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signUp, setSignUp] = useState(true);

    return (
        <div className='relative'>
            <img className='h-full w-100% px-20%' src={cityImage.src}/>
            {signUp ? 
                <form className="flex flex-col absolute">
                    <label htmlFor="register-email">Email address</label>
                    <input type="email" name="register-email" placeholder="Enter email" onChange={ e => setEmail(e.target.value) }/>

                    <label htmlFor="register-password">Email address</label>
                    <input type="password" name="register-password" placeholder="Enter password" onChange={ e => setEmail(e.target.value) }/>
                    <input type="button" />
                </form> 
            :
                <div className='absolute bottom-50% bg-white'>
                    <h3>Please log in!</h3>
                    <h3>Please log in!</h3>
                    <h3>Please log in!</h3>
                    <h3>Please log in!</h3>
                    <h3>Please log in!</h3>
                    <h3>Please log in!</h3>
                </div>
            }
        </div>
    )

}