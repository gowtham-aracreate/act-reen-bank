import React, { useState } from 'react';
import axios from 'axios';
import WithdrawSuccess from '../components/WithdrawSuccess';

const Withdraw = ({ openModal, closeModal, userData, setUserData }) => {
  const [accountName, setAccountName] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    let newErrors = {};

      const user_id = localStorage.getItem("user_id"); 
      const account_id = localStorage.getItem("account_id");
  
      if (!user_id || !account_id) {
        alert("User or Account not found!");
        return;
      }

    // Validate inputs
    if (!accountName.trim()) {
      newErrors.accountName = "Account Name is required.";
    }
    if (!withdrawAmount || isNaN(withdrawAmount) || Number(withdrawAmount) <= 0) {
      newErrors.withdrawAmount = "Enter a valid withdrawal amount.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
   
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/withdraw", {
        user_id,
        account_id,
        accountName,
        amount: Number(withdrawAmount),
      });

      // Update user balance if withdrawal is successful
      setUserData?.((prev) => ({
        ...prev,
        balance: response.data.newBalance, // Ensure backend sends `newBalance`
      }));

      openModal(<WithdrawSuccess withdrawAmount={withdrawAmount} closeModal={closeModal} />);
    } catch (error) {
      setErrors({ api: error.response?.data?.message || "Withdrawal failed. Try again later." });
    }
    setLoading(false);
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
