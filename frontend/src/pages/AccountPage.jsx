import React, { useState,useEffect } from 'react';
import Layout from '../layout/Layout.jsx';
import Plus from '../assets/plus.svg';
import Add from '../assets/add.svg';
import Subtract from '../assets/subtract.svg';
import AccountCard from '../components/AccountCard.jsx';
import ArrowRightGreen from '../assets/arrow-right-green.svg';
import ModalLayout from '../components/ModalLayout.jsx';
import AddAccount from '../components/AddAccount.jsx';
import CreatedSuccess from '../components/CreatedSuccess'; // Import the CreatedSuccess component

const AccountPage = ({ pageTitle }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Fetch accounts from backend
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('/add-accounts');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setAccounts(data);
        if (data.length > 0) setSelectedAccount(data[0]._id);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  }, []);

  const handleAddAccount = async (data, openModal, closeModal) => {
    try {
      const response = await fetch('/add-accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountName: data.accountName,
          amount: data.amount
        }),
      });

      const result = await response.json();
      setAccounts([...accounts, result.newAccount]);
      setSelectedAccount(result.newAccount._id);
      openModal(<CreatedSuccess closeModal={closeModal} userData={data} />);
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };

  return (
    <Layout pageTitle={pageTitle}>
      <ModalLayout>
        {({ openModal, closeModal }) => (
          <>
            {/* Account Cards Section */}
            <div className='pt-10 flex flex-row justify-between'>
              <div className='ml-5 grid grid-cols-4 gap-4 mt-2'>
                {accounts.map((account) => (
                  <div key={account._id} onClick={() => setSelectedAccount(account._id)} className={`cursor-pointer ${selectedAccount === account._id ? "border-l-7 border-blue-900" : ""}`}>
                    <AccountCard title={account.accountName} amount={account.amount} openModal={openModal} closeModal={closeModal} />
                  </div>
                ))}

                {/* Add Account Button */}
                
                <div className="bg-gray-300 text-white px-10 rounded-lg cursor-pointer">
                  <button
                    className="ml-6 mt- text-gray-600 font-bold"
                    onClick={() =>
                      openModal(
                        <AddAccount
                          openModal={openModal}
                          closeModal={closeModal}
                          updateAccounts={(data) => handleAddAccount(data, openModal, closeModal)}
                        />
                      )
                    }
                  >
                    <div className='flex items-center gap-5'>
                      <img className='mt-9 flex-col' src={Plus} alt="Plus Icon" />
                      <div className='mt-9'>Add Account</div>
                    </div>
                    <div className='font-bold pb-5 text-gray-600 text-xl pt-12'>₦ 00,000.00</div>
                  </button>
                </div>
              </div>
            </div>

            
          </>
        )}
      </ModalLayout>
    </Layout>
  );
}

export default AccountPage;
