import React from 'react'
import { useState } from 'react';
import Layout from '../layout/Layout'
import EyeOpen from '../assets/eyeopen.svg';
import EyeClose from '../assets/eyeclosed.svg';


const transactions = {
  main:[

  { id: 1, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000,status: "Canceled" },
  { id: 2, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000,status: "Completed" },
  { id: 3, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000,status: "Canceled" },
  { id: 4, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000,status: "Completed" },
  { id: 5, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000,status: "Canceled" },
  { id: 6, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000,status: "Completed" },
  { id: 7, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000,status: "Canceled" },
  
],
school:[
  { id: 1, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000,status: "Canceled" },
  { id: 2, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000,status: "Completed" },
  { id: 3, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000,status: "Canceled" },
  { id: 4, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000,status: "Completed" },
  { id: 5, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000,status: "Canceled" },
  { id: 6, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000,status: "Completed" },
],
holiday:[
  { id: 1, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000,status: "Canceled" },
  { id: 2, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000,status: "Completed" },
  { id: 3, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000,status: "Canceled" },
  { id: 4, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000,status: "Completed" },
]
}
export const TransactionPage = () => {
  const [isMainAccountHidden, setIsMainAccountHidden] = useState(true);
  const [isSchoolSavingsHidden, setIsSchoolSavingsHidden] = useState(true);
  const [isHolidayPlanHidden, setIsHolidayPlanHidden] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState('main');



  return (
    <Layout>
      <div className='flex mt-17'>
        <div className='flex bg-green-200 border-2 border-l-indigo-500  w-xs rounded-lg ml-5 px-4 py-6 justify-between items-center cursor-pointer' onClick={() => setSelectedAccount('main')}>
          <div>
            <h3>Main Account</h3>
            <p className="text-xl font-bold">{isMainAccountHidden ? "XXXXX" : "₦ 44,500.00"}</p>
          </div>
          <div className=' justify-between items-top'>
            <button onClick={() => setIsMainAccountHidden(!isMainAccountHidden)} className='w-10 h-10 mx-6 bg-gray-200 rounded-lg flex items-center justify-center'>
              <img className='w-5 h-5 bg-gray-200 rounded-lg cursor-pointer' src={isMainAccountHidden ? EyeClose : EyeOpen} alt="Toggle Balance Icon" />
            </button>
          </div>
        </div>

        <div className='flex bg-green-200 w-xs rounded-lg ml-15 px-4 py-6 justify-between items-center cursor-pointer' onClick={() => setSelectedAccount('school')}>
          <div>
            <h3>School Savings</h3>
            <p className="text-xl font-bold">{isSchoolSavingsHidden ? "XXXXX" : "₦ 44,500.00"}</p>
          </div>
          <div>
            <button onClick={() => setIsSchoolSavingsHidden(!isSchoolSavingsHidden)} className='w-10 h-10 mx-6 bg-gray-200 rounded-lg flex items-center justify-center'>
              <img className='w-5 h-5 bg-gray-200 rounded-lg cursor-pointer' src={isSchoolSavingsHidden ? EyeClose : EyeOpen} alt="Toggle Balance Icon" />
            </button>
          </div>
        </div>

        <div className='flex bg-green-200 w-xs rounded-lg ml-15 px-4 py-6 justify-between items-center cursor-pointer' onClick={() => setSelectedAccount('holiday')}>
          <div>
            <h3>Holiday Plan</h3>
            <p className="text-xl font-bold">{isHolidayPlanHidden ? "XXXXX" : "₦ 44,500.00"}</p>
          </div>
          <div>
            <button onClick={() => setIsHolidayPlanHidden(!isHolidayPlanHidden)} className='w-10 h-10 mx-6 bg-gray-200 rounded-lg flex items-center justify-center'>
              <img className='w-5 h-5 bg-gray-200 rounded-lg cursor-pointer' src={isHolidayPlanHidden ? EyeClose : EyeOpen} alt="Toggle Balance Icon" />
            </button>
          </div>
        </div>
      </div>

      <div>
      <div className='mt-15'>
        {transactions[selectedAccount].map(transaction => (
          <div key={transaction.id} className='flex justify-between  p-4 border-b-2 border-gray-300'>

            <p>{transaction.name}</p>
            <p>{transaction.date}</p>
            <p className={`font-bold ${transaction.amount < 0 ? "text-red-600" : "text-green-600"}`}>
              {transaction.amount < 0 ? `- ₦${Math.abs(transaction.amount).toLocaleString()}` : `+ ₦${transaction.amount.toLocaleString()}`}
            </p>
            <button className={`px-4 py-2 rounded-lg ${transaction.status === "Completed" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
              {transaction.status}
            </button>
          </div>
        ))}
      </div>
      </div>
    </Layout>
  )
}
