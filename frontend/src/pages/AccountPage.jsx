import React from 'react'
import { useState } from 'react';
import Layout from '../layout/Layout.jsx';
import Plus from '../assets/plus.svg';
import AccountCard from '../components/AccountCard.jsx';
import ArrowRightGreen from '../assets/arrow-right-green.svg';

const AccountPage = () => {
  const [accounts, setAccounts] = useState([
    { title: "Main Account", amount: 44500 },
    { title: "School Savings", amount: 44500 },
    { title: "Holiday Plan", amount: 44500 },
  ]);


  // Function to add a new account card
  const addAccount = () => {
    setAccounts([...accounts, { title: "New Account", amount: "00,000.00" }]);
  };

  return (
    <Layout>

      <div></div>
      {/* Card Content */}
      <div className='pt-10 flex flex-row justify-between'>
        {/* Account Cards */}
        <div className='ml-5 grid grid-cols-4 gap-4 mt-2'>
          {accounts.map((account, index) => (
            <AccountCard key={index} title={account.title} amount={account.amount} />
          ))}

          {/* Adding Account Button */}
          <div className='bg-gray-300 text-white px-10 rounded-lg'>
            <div className='flex gap-12'>
              <div><img className='mt-8' src={Plus} alt="Plus Icon" /></div>
              <div><button onClick={addAccount} className='mt-7 text-gray-600 font-bold'>Add Account</button></div>
            </div>
            <div className='font-bold text-gray-600 text-xl pt-12'>₦ 00,000.00</div>
          </div>
        </div>

      </div>


      {/* Transaction History */}
      <div className='flex gap-220 gap-50 mt-12'>
        <div className='pl-4 font-bold text-xl text-black'>Tansactions</div>
        <div className='flex gap-5'>
          <div><button className='text-green-600'>View All</button></div>
          <div><img className='' src={ArrowRightGreen} alt="Arrow Icon" /></div>
        </div>
      </div>


    </Layout>
  )
}

export default AccountPage
