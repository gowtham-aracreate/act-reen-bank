import React from 'react'
import { useState } from 'react';
import EyeOpen from '../assets/eyeopen.svg';
import EyeClose from '../assets/eyeclosed.svg';

const AccountCard = ({title, amount}) => {
    const [isHidden, setIsHidden] = useState(true);
    return (
        
        //Adding Account Card Content
        <div className='bg-green-100 p-7 rounded-lg text-center shadow-md'>
            <div className='flex flex-row justify-between'>
                <div>
                    <p className='text-indigo-900'>{title}</p>
                    <p className='text-xl font-bold'>{isHidden ? "XXXXX" : `₦ ${amount.toLocaleString()}`}</p>
                </div>
                <div>
                    <button onClick={() => setIsHidden(!isHidden)} className='flex items-center justify-center'>
                        <img className='w-5 h-5 rounded-lg cursor-pointer' src={isHidden ? EyeClose : EyeOpen} alt="Toggle Balance Icon" />
                    </button>
                </div>
            </div>

            <div className='flex flex-row justify-between mt-5 gap-5'>
                <button className='w-19  text-white bg-green-400 rounded-lg'>Fund</button>
                <button className='w-27 h-8 text-gray-700 bg-gray-300 rounded-lg'>Withdraw</button>
            </div>
        </div>

        
        
    )
}

export default AccountCard
