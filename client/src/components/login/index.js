import React, { useState } from 'react';
import cityImage from '../../assets/city.jpg'
import '../../spreadsheets/login.css'

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className='login-container'>
            <img className='background-image' src={cityImage}/>
            <div className='login-form'>
                <h3>Please log in!</h3>
                <h3>Please log in!</h3>
                <h3>Please log in!</h3>
                <h3>Please log in!</h3>
                <h3>Please log in!</h3>
                <h3>Please log in!</h3>
            </div>
        </div>
    )

}