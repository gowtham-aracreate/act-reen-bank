// import React from 'react'

// function login() {
//     return (
//         <div>
//             <h3>Reen Bank</h3>
//         </div>

//     )
// }

// export default login;


import React, { useState } from 'react';
import bank_logo from '../assets/logo.png';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import twitter from '../assets/twitter.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/Login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                setMessage('Login successful!');
            } else {
                setMessage('Invalid email or password.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
       
        <div className=" flex bg-blue-100 pb-25">
            
           <div className='ml-20'>
            <img  className="pt-30" src={bank_logo}></img>
            <h3 className="pt-15 text-green-500">Reen Bank</h3>
            <h1 className='pt-4 font-bold text-4xl w-120'> Welcome Back</h1>
            <p className='pt-4'> Enter Your Details to login to your Banking Dashboard again!</p>
            <div className='pt-20 flex space-x-4'>
            <img src={facebook}></img>
            <img src={instagram}></img>
            <img src={twitter}></img>
            </div>
            </div>

           
                  <div className=" bg-white p-8 ml-50 mr-30 mt-30 w-200 h-100 roumded shadow-md">  
                    <h2 className="text-2xl font-bold mb-4 text-green-600">Login</h2>
                    
                    <form onSubmit={handleLogin}>
                        <div className="mb-4 relative ">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                           
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your email"/>
                               <div className='absolute right-0 top-0 mt-8 mr-2 '>
                                <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>

                                </button>
                                 
                                </div>
                                
                            
                        </div>
                        <div className="mb-6 relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your password"
                                required
                            />
                            <div className='absolute right-0 top-0 mt-8 mr-2'>
                                <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>
                                </button></div>
                                <div className='absolute right-7 top-0 mt-7 mr-2 pt-2 text-sm text-green-500'>
                                    <a href='./ForgotPassword'>Forgot?</a>
                                </div>
                            
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                        >
                            Login
                        </button>
                        <div className='flex'>
                        <input
                         className='pt-5'
                         placeholder="Don't Have an Account?"/>
                         <div className='pt-5 text-green-500'> 
                         <a href ='./register'>Register </a> 
                         </div>
                        </div>

                         
                    </form>
                    {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                </div>
            
        </div>
    );
};

export default Login;


