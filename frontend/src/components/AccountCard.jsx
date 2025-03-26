import React, {useState,useEffect } from 'react';
import EyeOpen from '../assets/eyeopen.svg';
import EyeClose from '../assets/eyeclosed.svg';
import Withdraw from '../components/Withdraw';
import FundWallet from '../components/FundWallet';

const AccountCard = ({ openModal, closeModal }) => {
    const [isHidden, setIsHidden] = useState(true);
    const[accountName, setAccountName] = useState('');
    const[amounts, setAmounts] = useState(0);

    useEffect(() => {
        const storedAccountName = localStorage.getItem("accountName")
        const storedAmount = localStorage.getItem("amounts") 

        if (storedAccountName && storedAmount) {
            setAccountName(storedAccountName);
            setAmounts(storedAmount);
        }
    }, []);
    

    return (
        <div className='bg-green-100 p-7 rounded-lg text-center shadow-md'>
            {/* Account Info */}
            {/* {title?(
            <div className='flex flex-row justify-between'>
                <div>
                    <p className='text-indigo-900'>{title}</p>
                    <p className='text-xl font-bold'>{isHidden ? "XXXXX" : `₦ ${Number(amount).toLocaleString()}`}</p>
                </div>
                <div>
                    <button onClick={() => setIsHidden(!isHidden)} className='flex items-center justify-center'>
                        <img className='w-5 h-5 rounded-lg cursor-pointer' src={isHidden ? EyeClose : EyeOpen} alt="Toggle Balance Icon" />
                    </button>
                </div>
            </div>
            ):( */}
            <div className='flex flex-row justify-between'>
                <div>
                    <p className='text-indigo-900'>{accountName}</p>
                    <p className='text-xl font-bold'>{isHidden ? "XXXXX" : `₦ ${Number(amounts).toLocaleString()}`}</p>
                </div>
                <div>
                    <button onClick={() => setIsHidden(!isHidden)} className='flex items-center justify-center'>
                        <img className='w-5 h-5 rounded-lg cursor-pointer' src={isHidden ? EyeClose : EyeOpen} alt="Toggle Balance Icon" />
                    </button>
                </div>
            </div>
            
        

            {/* Action Buttons */}
            <div className='flex flex-row justify-between mt-5 gap-5'>
                <button
                    className='w-20 cursor-pointer text-white bg-green-400 rounded-lg py-2'
                    onClick={() => openModal(<FundWallet openModal={openModal} closeModal={closeModal} />)}
                >
                    Fund
                </button>
                <button
                    className='w-28 cursor-pointer text-gray-700 bg-gray-300 rounded-lg py-2'
                    onClick={() => openModal(<Withdraw openModal={openModal} closeModal={closeModal} />)}
                >
                    Withdraw
                </button>
            </div>
        </div>
    );
};

export default AccountCard;
