import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/logo.svg";
import overviewimg from "../assets/overviewimg.svg";
import accountimg from "../assets/accountimg.svg";
import transactionimg from "../assets/transactionimg.svg";
import profileimg from "../assets/profileimg.svg";
import arrowleft from "../assets/arrowleft.svg";
import overviewimg1 from "../assets/overviewimg1.svg";
import accountimg1 from "../assets/accountimg1.svg";
import transactionimg1 from "../assets/transactionimg1.svg";
import profileimg1 from "../assets/profileimg1.svg";

const Dashboard = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();// get current route path

    //to check if a menu item is action
    const isActive = (path) => location.pathname === path;

    return (
        <div>
            <div className="pt-0 ml-10 text-black-400 pl-2 p-11 min-h-screen flex flex-col justify-between">
                <div>
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="h-29 w-50 mr-2" />
                        <h2 className="text-lg text-black-500 font-bold"></h2>
                    </div>
                    <ul className="mt-15 space-y-2">
                        <li onClick={() => navigate("/overviewpage")} className={`text-xl flex items-center p-3 hover:bg-gray-200  rounded-md cursor-pointer w-45 
                        ${isActive("/overviewpage") ? 'font-semibold text-green-600'  : 'text-black-500'}`}
                        >
                            <img src = {isActive("/overviewpage") ? overviewimg1 : overviewimg} alt="Icon" className="h-6 w-6 mr-6 " />
                            Overview
                        </li>
                        <li onClick={() => navigate("/accountpage")} className={`text-xl flex items-center p-3 hover:bg-gray-200  rounded-md cursor-pointer w-45 
                        ${isActive("/accountpage") ? 'font-semibold text-green-600' : 'text-black-500'}`}
                        >
                            <img src = {isActive("/accountpage") ? accountimg1 : accountimg} alt="Icon" className="h-6 w-6 mr-6" />
                            Accounts
                        </li>
                        <li onClick={() => navigate("/transaction")} className={`text-xl flex items-center p-2 hover:bg-gray-200  rounded-md cursor-pointer w-45 
                        ${isActive("/transaction") ? 'font-semibold text-green-600' : 'text-black-500'}`}
                        >
                            <img src = {isActive("/transaction") ? transactionimg1 : transactionimg} alt="Icon" className="h-10 w-10 mr-3" />
                            Transactions
                        </li>
                        <li onClick={() => navigate("/profile")} className={`text-xl flex items-center p-3 hover:bg-gray-200  rounded-md cursor-pointer w-45 
                        ${isActive("/profile") ? 'font-semibold text-green-600' : 'text-black-500'}`}
                        >
                            <img src = {isActive("/profile") ? profileimg1 : profileimg} alt="Icon" className="h-6 w-6 mr-6" />
                            Profile
                        </li>
                    </ul>
                </div>
                <div className='pl-7 text-xl flex items-center'>
                    <img className='w-5 mt-1' src={arrowleft} alt="Left Arrow" />
                    <button className='px-6 cursor-pointer'>Logout</button>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Dashboard
