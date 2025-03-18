import React, { useState } from 'react';
import WithdrawSuccess from '../components/WithdrawSuccess';

const Withdraw = ({ openModal, closeModal, userData, setUserData }) => {
  const [accountName, setAccountName] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [errors, setErrors] = useState({});

  const handleWithdraw = () => {
    let newErrors = {};

    // Validate inputs
    if (!accountName.trim()) {
      newErrors.accountName = "Account Name is required.";
    }
    if (!withdrawAmount || isNaN(withdrawAmount) || Number(withdrawAmount) <= 0) {
      newErrors.withdrawAmount = "Enter a valid withdrawal amount.";
    }

    // If errors exist, show messages
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Deduct amount from user's balance
    setUserData?.((prev) => ({
      ...prev,
      amount: Number(prev.amount) - Number(withdrawAmount),
    }));

    // Show success modal
    openModal(<WithdrawSuccess withdrawAmount={withdrawAmount} closeModal={closeModal} />);
  };

  return (
    <div className="bg-white p-6 w-[330px]">
      <h2 className="text-3xl flex justify-center pb-4 text-green-600 font-semibold mb-2">Withdraw Funds</h2>

      {/* Account Name Input */}
      <label className="block mb-1">Account Name</label>
      <input 
        type="text" 
        placeholder="Account Name" 
        className="border-2 border-gray-400 rounded-lg shadow-md p-2 w-full mb-2" 
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
      />
      {errors.accountName && <p className="text-red-600 text-sm">{errors.accountName}</p>}

      {/* Withdraw Amount Input */}
      <label className="block pt-2 mb-1">Amount</label>
      <input 
        type="number" 
        placeholder="100,000" 
        className="border-2 border-gray-400 shadow-md rounded-lg p-2 w-full mb-2" 
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
      />
      {errors.withdrawAmount && <p className="text-red-600 text-sm">{errors.withdrawAmount}</p>}

      {/* Buttons */}
      <div className='flex justify-between mt-4'>
        <button className="bg-gray-300 font-semibold text-black px-4 py-2 w-30 rounded-lg" onClick={closeModal}>
          Cancel
        </button>
        <button className="bg-green-700 font-semibold text-white px-4 w-30 py-2 rounded-lg" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
