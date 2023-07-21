import { useState } from 'react';
import cityImage from '../../assets/city.jpg'

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signUp, setSignUp] = useState(false);

    return (
        <div className='login-container'>
            <img className='background-image' src={cityImage.src}/>
            {signUp ? 
                <form>
                    <label htmlFor="register-email">Email address</label>
                    <input type="email" name="register-email" placeholder="Enter email" onChange={ e => setEmail(e.target.value) }/>

                    <label htmlFor="register-password">Email address</label>
                    <input type="password" name="register-password" placeholder="Enter password" onChange={ e => setEmail(e.target.value) }/>
                    <input type="button" />
                </form> 
            :
                <div className='login-form'>
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