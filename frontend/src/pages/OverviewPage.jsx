import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EyeOpen from '../assets/eyeopen.svg';
import EyeClose from '../assets/eyeclosed.svg';
import DropDown from '../assets/dropdown.svg';
import Plus from '../assets/plus.svg';
import Calendar from '../assets/calendar.svg';
import Layout from '../layout/Layout.jsx';
import Transactions from '../components/Transactions.jsx';
import BalanceCard from '../components/BalanceCard.jsx';
import Income from '../assets/income.svg';
import Expense from '../assets/expense.svg';
import DropTop from '../assets/droptop.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";


const OverviewPage = ({ pageTitle }) => {
    const navigate = useNavigate();
    const [isHidden, setIsHidden] = useState(true);
    const [isDropdownOpenDate, setIsDropdownOpenDate] = useState(false);
    const [isDropdownOpenMonth, setIsDropdownOpenMonth] = useState(false);
    // const [selectedDate, setSelectedDate] = useState("Feb 22 - Mar 25, 2023");
    const [selectedMonth, setSelectedMonth] = useState("This Month")
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(dayjs().add(1, "month").toDate());

    const [accounts, setAccounts] = useState([
        { title: "Main Account", amount: 44500 },
        { title: "School Savings", amount: 44500 },
        { title: "Holiday Plan", amount: 44500 },
    ]
    );

    // Function to add a new account card
    const addAccount = () => {
        setAccounts([...accounts, { title: "New Account", amount: 0 }]);
    };

    const monthRange = [
        "This Month",
        "February",
        "January",
    ]

    return (
        <Layout pageTitle={pageTitle}>
            {/* pass pageTitle to layout */}

            <div className='mt-0 flex items-top'>

                {/* Overview Content */}
                <div className=' flex flex-grow gap-6'>
                    <div className=' flex-1 w-1/2 p-6 min-w-[350px]'>

                        {/* Current Account Balance Section */}
                        <div>
                            <div className='flex'>
                                <h3 className="pt-10 pb-7 text-2xl font-semibold">Current Account Balance</h3>

                                {/* Eye Toggle and Date Picker */}
                                <div className="pt-5 pl-13 flex items-center gap-3">
                                    {/* Eye Toggle */}
                                    <button onClick={() => setIsHidden(!isHidden)} className='w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center'>
                                        <img className='w-5 h-5 bg-gray-200 rounded-lg cursor-pointer' src={isHidden ? EyeClose : EyeOpen} alt="Toggle Balance Icon" />
                                    </button>

                                    {/* Data Picker with Dropdown */}
                                    <div className='flex items-center gap-1 h-10 bg-gray-200 px-1 rounded-lg cursor-pointer' onClick={() => setIsDropdownOpenDate(!isDropdownOpenDate)}>
                                        <img className='w-5 h-5 pl-1 ' src={Calendar} alt="Calendar Icon" />

                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            className="outline-none border-none bg-transparent pl-2 w-32 cursor-pointer"
                                            dateFormat="MMM dd, yyyy"
                                            
                                        />


                                        {/* <span className='text-sm'>{selectedDate}</span> */}
                                        <img className='w-5 h-5' src={DropDown} alt="Drop Down Icon" />
                                    </div>
                                </div>
                            </div>


                            <div className="bg-green-100 p-8 rounded-xl shadow-md">

                                {/* Account details */}
                                <div className="flex items-center justify-between mt-2">
                                    <div>
                                        <img src={Income} alt="Income Icon" />
                                    </div>
                                    <div>
                                        <p className="text-indigo-900">Current Balance</p>
                                        <p className="text-xl font-bold">{isHidden ? "XXXXX" : "₦ 44,500.00"}</p>
                                    </div>
                                    <div>
                                        <p className="text-indigo-900">Income</p>
                                        <p className="text-xl font-bold">{isHidden ? "XXXXX" : "₦ 54,500.00"}</p>
                                    </div>
                                    <div>
                                        <p className="text-indigo-900">Expense</p>
                                        <p className="text-xl font-bold">{isHidden ? "XXXXX" : "₦ 10,000.00"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Accounts Section */}
                        <div className='pt-10'>
                            <div className='flex items-center justify-between'>
                                <h3 className="text-2xl pb-5 font-semibold">Accounts</h3>

                                {/* Square Plus Icon Button */}
                                <button className='bg-gray-200 w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer'>
                                    <img className='w-4 h-4' src={Plus} alt="Plus Icon" />
                                </button>
                            </div>


                            {/* Account Cards */}
                            <div className="grid grid-cols-3 gap-4 mt-2">
                                {accounts.map((account, index) => (
                                    <BalanceCard key={index} title={account.title} amount={account.amount} isHidden={isHidden} />
                                ))}
                            </div>
                        </div>

                        {/* Statistics Section */}
                        <div className='pt-10'>
                            <div className='flex gap-93'>
                                <h3 className="pb-3 text-2xl font-semibold">Statistics</h3>

                                {/* Data Picker with Dropdown */}
                                <div className='flex items-center gap-1 bg-gray-200 px-1 rounded-lg cursor-pointer' onClick={() => setIsDropdownOpenMonth(!isDropdownOpenMonth)}>
                                    <span className='text-sm'>{selectedMonth}</span>
                                    <img className='w-5 h-5' src={DropDown} alt="Drop Down Icon" />
                                </div>

                                {/* Dropdown for month*/}
                                {isDropdownOpenMonth && (
                                    <div className="absolute left-0 w-32 bg-white shadow-lg rounded-lg ml-187 mt-11 ">

                                        {/* DropTop Icon to Close Dropdown */}
                                        <div onClick={() => setIsDropdownOpenMonth(false)}>
                                            <img className='w-5 h-5 ml-25  cursor-pointer' src={DropTop} alt="Drop top Icon" />
                                        </div>

                                        {monthRange.map((range, index) => (
                                            <div key={index} className={`p-3 text-sm rounded-lg cursor-pointer ${selectedMonth === range ? "bg-gray-300" : "hover:bg-gray-200"
                                                }`}
                                                onClick={() => {
                                                    setSelectedMonth(range);
                                                    setIsDropdownOpenMonth(false);
                                                }}
                                            >
                                                {range}

                                            </div>

                                        ))}

                                    </div>
                                )}
                            </div>



                            <div className='mt-2'>
                                <div className="pb-6 flex items-center mt-1">
                                    <div><img className='w-10' src={Income} alt="" /></div>
                                    <div><span className="pl-5 font-bold text-gray-500">Income</span></div>
                                    <div className="ml-7 bg-green-500 h-3 rounded-sm" style={{ width: "40%" }}></div>
                                    <div> <span className="pl-27 font-bold">₦ 54,500.00</span></div>
                                </div>


                                <div className="flex items-center mt-1">
                                    <div><img className='w-10' src={Expense} alt="" /></div>
                                    <div><span className="pl-5 font-bold text-gray-500">Expense</span></div>
                                    <div className="ml-5 bg-red-400 h-3 rounded-sm" style={{ width: "30%" }}></div>
                                    <div><span className="pl-42 justify-end font-bold">₦ 10,000.00</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction Content */}
                <div className='w-1/2 p-6 min-w-[300px] pr-10'>
                    <Transactions />
                </div>
            </div>


        </Layout >
    )
}

export default OverviewPage

