import React from 'react';
import FundWallet from '../components/FundWallet';
import AddAccount from '../components/AddAccount';

const CreatedSuccess = ({ openModal, closeModal, userData }) => {
  const handleGoBack = () => {
    closeModal(); // Close the current modal
    openModal(<AddAccount openModal={openModal} closeModal={closeModal} />); // Open the AddAccount modal
  };

  const handleFundAccount = () => {
    closeModal(); // Close the current modal
    openModal(<FundWallet openModal={openModal} closeModal={closeModal} />); // Open the FundWallet modal
  };

  return (
    <div className="bg-white pt-40 h-80 pl-6 p-3 w-[390px] items-center">
      <p className='flex items-center text-gray-500 font-semibold'>
        <span className="text-green-600 font-bold">{userData?.accountName || "Account Name "}</span>  has been created successfully!
      </p>

      {/* Go Back Button */}
      <button
        className="bg-gray-300 text-white px-36 py-2 rounded-lg mt-4"
        onClick={handleGoBack} // Close current modal and open AddAccount modal
      >
        Go Back
      </button>

      {/* Fund Account Button */}
      <button
        className="bg-green-700 text-white px-31 py-2 rounded-lg mt-4"
        onClick={handleFundAccount} // Close current modal and open FundWallet modal
      >
        Fund Account
      </button>
    </div>
  );
};

export default CreatedSuccess;