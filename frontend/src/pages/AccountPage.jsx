import React, { useState } from 'react';
import Layout from '../layout/Layout.jsx';
import Plus from '../assets/plus.svg';
import Add from '../assets/add.svg';
import Subtract from '../assets/subtract.svg';
import AccountCard from '../components/AccountCard.jsx';
import ArrowRightGreen from '../assets/arrow-right-green.svg';

// Sample account data
const initialAccounts = [
  { id: 1, title: "Main Account", amount: 44500 },
  { id: 2, title: "School Savings", amount: 44500 },
  { id: 3, title: "Holiday Plan", amount: 44500 },
];

// Sample transactions data with account IDs for filtering
const transactions = [
  { id: 1, accountId: 1, name: "Oluwaben Jamin", payment: "Bank Transfer", date: "06.Mar.2023 - 09:39", amount: -10000, status: "Completed" },
  { id: 2, accountId: 1, name: "Oluwaben Jamin", payment: "Direct Pay", date: "06.Mar.2023 - 09:39", amount: 10000, status: "Completed" },
  { id: 3, accountId: 2, name: "Oluwaben Jamin", payment: "Bank Transfer", date: "06.Mar.2023 - 09:39", amount: 10000, status: "Completed" },
  { id: 4, accountId: 1, name: "Oluwaben Jamin", payment: "Credit Card", date: "06.Mar.2023 - 09:39", amount: -10000, status: "Completed" },
  { id: 5, accountId: 1, name: "Oluwaben Jamin", payment: "Direct Pay", date: "06.Mar.2023 - 09:39", amount: 10000, status: "Completed" },
  { id: 6, accountId: 1, name: "Oluwaben Jamin", payment: "Bank Transfer", date: "06.Mar.2023 - 09:39", amount: -10000, status: "Completed" },
  { id: 7, accountId: 1, name: "Oluwaben Jamin", payment: "Credit Card", date: "06.Mar.2023 - 09:39", amount: 10000, status: "Completed" },
  { id: 8, accountId: 1, name: "Oluwaben Jamin", payment: "Direct Pay", date: "06.Mar.2023 - 09:39", amount: -10000, status: "Completed" },
  { id: 9, accountId: 2, name: "Oluwaben Jamin", payment: "Bank Transfer", date: "06.Mar.2023 - 09:39", amount: -10000, status: "Completed" },
  { id: 10, accountId: 2, name: "Oluwaben Jamin", payment: "Credit Card", date: "06.Mar.2023 - 09:39", amount: 10000, status: "Completed" },
  { id: 11, accountId: 2, name: "Oluwaben Jamin", payment: "Direct Pay", date: "06.Mar.2023 - 09:39", amount: -10000, status: "Completed" },
  { id: 12, accountId: 2, name: "Oluwaben Jamin", payment: "Bank Transfer", date: "06.Mar.2023 - 09:39", amount: 10000, status: "Completed" },
  { id: 13, accountId: 3, name: "Oluwaben Jamin", payment: "Credit Card", date: "06.Mar.2023 - 09:39", amount: 10000, status: "Completed" },
  { id: 14, accountId: 3, name: "Oluwaben Jamin", payment: "Direct Pay", date: "06.Mar.2023 - 09:39", amount: 10000, status: "Completed" },
  { id: 15, accountId: 3, name: "Oluwaben Jamin", payment: "Bank Transfer", date: "06.Mar.2023 - 09:39", amount: -10000, status: "Completed" },
  { id: 16, accountId: 2, name: "Oluwaben Jamin", payment: "Credit Card", date: "06.Mar.2023 - 09:39", amount: -10000, status: "Completed" },
];

const AccountPage = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [selectedAccount, setSelectedAccount] = useState(accounts[0].id);

  const addAccount = () => {
    const newAccount = { id: accounts.length + 1, title: "New Account", amount: 0 };
    setAccounts([...accounts, newAccount]);
  };

  const filteredTransactions = transactions.filter(transaction => transaction.accountId === selectedAccount);

  return (
    <Layout>
      {/* Account Cards Section */}
      <div className='pt-10 flex flex-row justify-between'>
        <div className='ml-5 grid grid-cols-4 gap-4 mt-2'>
          {accounts.map((account) => (
            <div key={account.id} onClick={() => setSelectedAccount(account.id)} className={`cursor-pointer ${selectedAccount === account.id ? "border-l-7 border-blue-900" : ""}`}>
              <AccountCard title={account.title} amount={account.amount} />
            </div>
          ))}

          {/* Add Account Button */}
          <div className='bg-gray-300 text-white px-10 rounded-lg cursor-pointer' onClick={addAccount}>
            <div className='flex gap-12'>
              <img className='mt-8' src={Plus} alt="Plus Icon" />
              <button className='mt-7 text-gray-600 font-bold'>Add Account</button>
            </div>
            <div className='font-bold text-gray-600 text-xl pt-12'>₦ 00,000.00</div>
          </div>
        </div>
      </div>

      {/* Transactions Section */}
      <div className='p-6 w-287 pr-10'>
        <div className='pt-10'>
          <div className='flex justify-between items-center'>
            <div className='font-bold text-2xl'>Transactions</div>
            <div className='flex items-center gap-4'>
              <button className='text-green-600'>View All</button>
              <img src={ArrowRightGreen} alt="Arrow Icon" />
            </div>
          </div>

          {/* Transactions List */}
          <div className='pt-10 pb-6'>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <div key={transaction.id} className='pb-2 flex items-center justify-between'>

                  {/* Plus/Minus Icon */}
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full ${transaction.amount < 0 ? "bg-red-500" : "bg-green-500"}`}>
                    <img src={transaction.amount < 0 ? Subtract : Add} alt="Transaction Icon" className='w-3 h-3' />
                  </div>

                  {/* Transaction Details */}
                  <div className='flex text-gray-400 justify-between flex-grow px-4'>
                    <p>{transaction.name}</p>
                    <p>{transaction.payment}</p>
                    <p>{transaction.date}</p>
                    <p className={`font-bold ${transaction.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                      {transaction.amount < 0
                        ? `- ₦${Math.abs(transaction.amount).toLocaleString()}`
                        : `+ ₦${transaction.amount.toLocaleString()}`}
                    </p>
                  </div>

                  {/* Status */}
                  <div className={`px-3 py-1 rounded-lg text-white font-bold ${transaction.status === "Completed"
                      ? transaction.amount < 0
                        ? "bg-red-500"  // Red for negative amount
                        : "bg-green-500" // Green for positive amount
                      : ""
                    }`}>
                    {transaction.status === "Completed" ? "Completed" : ""}
                  </div>

                </div>
              ))
            ) : (
              <p className='text-gray-500'>No transactions for this account</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
