import React from 'react'
import logo from "../assets/logo.svg"; 
import overviewimg from "../assets/overviewimg.svg";
import accountimg from "../assets/accountimg.svg";
import transactionimg from "../assets/transactionimg.svg";
import profileimg from "../assets/profileimg.svg";
import arrowleft from "../assets/arrowleft.svg";

const Dashboard = ({ children }) => {
    return (
        <div>
            <div className="pt-0 ml-10 text-black-400 pl-2 p-11 min-h-screen flex flex-col justify-between">
                <div>
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="h-29 w-50 mr-2" />
                        <h2 className="text-lg text-black-500 font-bold"></h2>
                    </div>
                    <ul className="mt-15 space-y-2">
                        <li className="text-xl flex items-center p-3 font-bold hover:bg-gray-200 text-green-500 rounded-md text-black-500">
                            <img src={overviewimg} alt="Icon" className="h-6 w-6 mr-6" />
                            Overview
                        </li>
                        <li className="text-xl flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500">
                            <img src={accountimg} alt="Icon" className="h-6 w-6 mr-6" />
                            Accounts
                        </li>
                        <li className="text-xl flex items-center p-2 hover:bg-gray-200 rounded-md text-black-500">
                            <img src={transactionimg} alt="Icon" className="h-10 w-10 mr-3" />
                            Transactions
                        </li>
                        <li className="text-xl flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500">
                            <img src={profileimg} alt="Icon" className="h-6 w-6 mr-6" />
                            Profile
                        </li>
                    </ul>
                </div>
                <div className='pl-7 pb-6 flex items-center'>
                    <img className='w-5' src={arrowleft} alt="Left Arrow" />
                    <button className='px-6'>Logout</button>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Dashboard
