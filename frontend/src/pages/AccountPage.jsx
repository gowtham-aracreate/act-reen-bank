import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout/Layout.jsx';
import Plus from '../assets/plus.svg';
import Add from '../assets/add.svg';
import Subtract from '../assets/subtract.svg';
import AccountCard from '../components/AccountCard.jsx';
import ArrowRightGreen from '../assets/arrow-right-green.svg';
import ModalLayout from '../components/ModalLayout.jsx';
import AddAccount from '../components/AddAccount.jsx';
import CreatedSuccess from '../components/CreatedSuccess'; // Import the CreatedSuccess component

// Sample account data
const initialAccounts = [
  { id: 1, title: 'Main Account', amount: 44500 },
  { id: 2, title: 'School Savings', amount: 44500 },
  { id: 3, title: 'Holiday Plan', amount: 44500 },
];

// Sample transactions data with account IDs for filtering
const transactions = [
  { id: Date.now() + 1, accountId: 1, name: 'Oluwaben Jamin', payment: 'Bank Transfer', date: '06.Mar.2023 - 09:39', amount: -10000, status: 'Completed' },
  { id: Date.now() + 2, accountId: 1, name: 'Oluwaben Jamin', payment: 'Direct Pay', date: '06.Mar.2023 - 09:39', amount: 10000, status: 'Completed' },
  { id: Date.now() + 3, accountId: 2, name: 'Oluwaben Jamin', payment: 'Bank Transfer', date: '06.Mar.2023 - 09:39', amount: 10000, status: 'Completed' },
  { id: Date.now() + 4, accountId: 1, name: 'Oluwaben Jamin', payment: 'Credit Card', date: '06.Mar.2023 - 09:39', amount: -10000, status: 'Completed' },
  { id: Date.now() + 5, accountId: 1, name: 'Oluwaben Jamin', payment: 'Direct Pay', date: '06.Mar.2023 - 09:39', amount: 10000, status: 'Completed' },
  { id: Date.now() + 6, accountId: 1, name: 'Oluwaben Jamin', payment: 'Bank Transfer', date: '06.Mar.2023 - 09:39', amount: -10000, status: 'Completed' },
  { id: Date.now() + 7, accountId: 1, name: 'Oluwaben Jamin', payment: 'Credit Card', date: '06.Mar.2023 - 09:39', amount: 10000, status: 'Completed' },
  { id: Date.now() + 8, accountId: 1, name: 'Oluwaben Jamin', payment: 'Direct Pay', date: '06.Mar.2023 - 09:39', amount: -10000, status: 'Completed' },
  { id: Date.now() + 9, accountId: 2, name: 'Oluwaben Jamin', payment: 'Bank Transfer', date: '06.Mar.2023 - 09:39', amount: -10000, status: 'Completed' },
  { id: Date.now() + 10, accountId: 2, name: 'Oluwaben Jamin', payment: 'Credit Card', date: '06.Mar.2023 - 09:39', amount: 10000, status: 'Completed' },
  { id: Date.now() + 11, accountId: 2, name: 'Oluwaben Jamin', payment: 'Direct Pay', date: '06.Mar.2023 - 09:39', amount: -10000, status: 'Completed' },
  { id: Date.now() + 12, accountId: 2, name: 'Oluwaben Jamin', payment: 'Bank Transfer', date: '06.Mar.2023 - 09:39', amount: 10000, status: 'Completed' },
  { id: Date.now() + 13, accountId: 3, name: 'Oluwaben Jamin', payment: 'Credit Card', date: '06.Mar.2023 - 09:39', amount: 10000, status: 'Completed' },
  { id: Date.now() + 14, accountId: 3, name: 'Oluwaben Jamin', payment: 'Direct Pay', date: '06.Mar.2023 - 09:39', amount: 10000, status: 'Completed' },
  { id: Date.now() + 15, accountId: 3, name: 'Oluwaben Jamin', payment: 'Bank Transfer', date: '06.Mar.2023 - 09:39', amount: -10000, status: 'Completed' },
  { id: Date.now() + 16, accountId: 2, name: 'Oluwaben Jamin', payment: 'Credit Card', date: '06.Mar.2023 - 09:39', amount: -10000, status: 'Completed' },
];

const AccountPage = ({ pageTitle }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/accounts").then((response) => {
      setAccounts(response.data);
      if (response.data.length > 0) {
        setSelectedAccount(response.data[0]._id);
      }
    }).catch((error) => {
      console.error("Error fetching accounts:", error);
    });
  }, []);

  const handleAddAccount = (data, openModal, closeModal) => {
    console.log("Sending Data:", data);
    
    axios.post("http://localhost:3001/add-accounts", data)
      .then((response) => {
        console.log("Response Data:", response.data);
        
        if (!response.data.newAccount) {
          throw new Error("newAccount is missing in the response");
        }
  
        setAccounts((prevAccounts) => [...prevAccounts, response.data.newAccount]);
        setSelectedAccount(response.data.newAccount._id);
        
        openModal(<CreatedSuccess key={response.data.newAccount._id} closeModal={closeModal} userData={data} />);
      })
      .catch((error) => {
        console.error("Error adding account:", error.response?.data || error.message);
      });
  };
  

  const filteredTransactions = transactions.filter(transaction => transaction.accountId === selectedAccount);

  return (
    <Layout pageTitle={pageTitle}>
      <ModalLayout>
        {({ openModal, closeModal }) => (
          <>
            <div className="pt-10 flex flex-row justify-between">
              <div className="ml-5 grid grid-cols-4 gap-4 mt-2">
                {accounts.map((account) => (
                  <div key={account._id} onClick={() => setSelectedAccount(account._id)} className={`cursor-pointer ${selectedAccount === account._id ? "border-l-7 border-blue-900" : ""}`}>
                    <AccountCard title={account.accountName} amount={account.amount} openModal={openModal} closeModal={closeModal}/>
                  </div>
                ))}
                <div className="bg-gray-300 text-white px-10 rounded-lg cursor-pointer">
                  <button
                    className="ml-6 mt- text-gray-600 font-bold"
                    onClick={() =>
                      openModal(
                        <AddAccount openModal={openModal} closeModal={closeModal} updateAccounts={handleAddAccount} />
                      )
                    }
                  >
                    <div className="flex items-center gap-5 cursor-pointer">
                      <img className="mt-9" src={Plus} alt="Plus Icon" />
                      <div className="mt-9 ">Add Account</div>
                    </div>
                    <div className="font-bold pb-5 cursor-pointer text-gray-600 text-xl pt-12">₦ 00,000.00</div>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 w-287 pr-10">
              <div className="pt-10">
                <div className="flex justify-between items-center">
                  <div className="font-bold text-2xl">Transactions</div>
                  <div className="flex items-center gap-4">
                    <button className="text-green-600">View All</button>
                    <img src={ArrowRightGreen} alt="Arrow Icon" />
                  </div>
                </div>
                <div className="pt-10 pb-6">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <div key={transaction.id} className="pb-2 flex items-center justify-between">
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full ${transaction.amount < 0 ? 'bg-red-500' : 'bg-green-500'}`}> 
                          <img src={transaction.amount < 0 ? Subtract : Add} alt="Transaction Icon" className="w-3 h-3" />
                        </div>
                        <div className="flex text-gray-400 justify-between flex-grow px-4">
                          <p>{transaction.name}</p>
                          <p>{transaction.payment}</p>
                          <p>{transaction.date}</p>
                          <p className={`font-bold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {transaction.amount < 0 ? `- ₦${Math.abs(transaction.amount).toLocaleString()}` : `+ ₦${transaction.amount.toLocaleString()}`}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-lg text-white font-bold ${transaction.status === 'Completed' ? (transaction.amount < 0 ? 'bg-red-500' : 'bg-green-500') : ''}`}>{transaction.status}</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No transactions for this account</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </ModalLayout>
    </Layout>
  );
};

export default AccountPage;