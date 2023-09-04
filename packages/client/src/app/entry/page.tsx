'use client'

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import { selectSignup, switchDefaultSignup } from '@/libs/redux/signup/signupSlice';
import { useRouter } from 'next/navigation';
import { AuthService } from "@/services/authService";
import { addUserId } from '@/libs/redux/user/userSlice';

export default function Entry() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailTakenError, setEmailTakenError] = useState(false);
    const [wrongLoginError, setWrongLoginError] = useState(false);
    const signUp = useAppSelector(selectSignup);
    const authService: AuthService = new AuthService();

    const router = useRouter();

    const dispatch = useAppDispatch();

    const emailRegex = new RegExp("\w{3,24}@\w{3,16}\.\w{2,5}");

    const handleKeyDownRegister = async (eventKey: string) => {
        if (eventKey == 'Enter' && email != "" && password != "" && confirmPassword != "") {
            await handleRegister();
        }
    }

    const handleRegister = async () => {
        if (emailRegex.test(email) && checkPassword()) {
            const response = await fetch('http://localhost:5000/AddUser', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.status === 401 || !response.ok) {
                setEmailTakenError(true);
            }
        }
    }

    const checkPassword = (): boolean => {
        return password != "" && password === confirmPassword;
    }

    const handleKeyDownLogin = async (eventKey: string) => {
        if (eventKey == 'Enter' && email != "" && password != "") {
            await handleLogin();
        }
    }

    const handleLogin = async () => {
        const user = await authService.login(email, password);
        if (user != null) {
            dispatch(addUserId(user.user_id));
            router.push("/summary");
        } else {
            setWrongLoginError(true);
        }
    }

    return (
        <div className='relative bg-gray-100 w-100% h-100% flex justify-center items-center'>
            <div className='h-fit'>
                {signUp ? 
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={e => e.preventDefault()}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input onKeyDown={(e) => handleKeyDownRegister(e.key)} onChange={ e => setEmail(e.target.value) } type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true}/>
                                </div>
                                {
                                    emailTakenError ? (
                                        <h6 className="text-red-600 m-0">
                                            This email is already taken!
                                        </h6>
                                    ) : (
                                        <></>
                                    )
                                }
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input onKeyDown={(e) => handleKeyDownRegister(e.key)} onChange={ e => setPassword(e.target.value) } type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true}/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input onKeyDown={(e) => handleKeyDownRegister(e.key)} onChange={ e => setConfirmPassword(e.target.value) } type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true}/>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={true}/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                            </form>
                            <button type="submit" onClick={handleRegister} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <button onClick={() => dispatch(switchDefaultSignup(false))} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</button>
                            </p>
                        </div>
                    </div>
                :
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={e => e.preventDefault()}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input onKeyDown={(e) => handleKeyDownLogin(e.key)} onChange={ e => setEmail(e.target.value) } type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true}/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input onKeyDown={(e) => handleKeyDownLogin(e.key)} onChange={ e => setPassword(e.target.value) } type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true}/>
                                </div>
                                <div className="flex items-center justify-center">
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                {
                                    wrongLoginError ? (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex flex-nowrap flex-row" role="alert">
                                            <strong className="font-bold text-sm pr-1">Error</strong>
                                            <span className="sm:inline text-sm">Wrong username or password entered.</span>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }
                            </form>
                            <button onClick={handleLogin} type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <button onClick={() => dispatch(switchDefaultSignup(true))} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</button>
                            </p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}