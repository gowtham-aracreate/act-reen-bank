import React, { useState} from "react";
import axios from "axios";
import CreatedSuccess from "../components/CreatedSuccess";

const AddAccount = ({ openModal, closeModal, updateAccounts }) => {
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});
  const handleAdd = async () => {
    let newErrors = {};
  
    // Validate account name
    if (!accountName.trim()) {
      newErrors.accountName = "Account name is required.";
    }
  
    // Validate amount
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount.";
    }
  
    // If there are errors, stop here
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
   
    // Create a new account object
    const newAccount = { accountName, amount: Number(amount) };

    try {
      // Send data to the backend API
      const response = await axios.post("http://localhost:3001/add-accounts", newAccount, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // localStorage.setItem("accountName",response.data.newAccount.accountName);
      // localStorage.setItem("amount",response.data.newAccount.amount);
      localStorage.setItem("account_id",response.data.newAccount._id);
      console.log("Response:", response.data);

      // Update the account list on the AccountPage
      updateAccounts((prevAccounts) => [...prevAccounts, response.data.newAccount]);
      console.log("Response Data:", response.data);

      // Close the AddAccount modal
      closeModal();

      // Open the CreatedSuccess modal
      openModal(<CreatedSuccess closeModal={closeModal} userData={response.data} />);

      // Clear form fields
      setAccountName("");
      setAmount("");
      setErrors({});
    } catch (error) {
      console.error("Error adding account:", error);
    }
  };
  

  return (
    <div className="bg-white p-6 w-[300px] rounded-lg">
      <h2 className="text-green-600 text-3xl font-semibold text-center mb-4">Add Account</h2>

      {/* Account Name Input */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Account Name</label>
        <input
          type="text"
          placeholder="Enter name"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          className="w-full border-2 border-gray-400 shadow-md rounded-lg px-3 py-2"
        />
        {errors.accountName && <p className="text-red-600 text-sm mt-1">{errors.accountName}</p>}
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value || "")} // Handle empty input
          className="w-full border-2 border-gray-400 shadow-md rounded-lg px-3 py-2"
        />
        {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount}</p>}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex justify-between">
        <button className="bg-gray-300 font-semibold text-black px-4 py-2 w-30 rounded-lg" onClick={closeModal}>
          Cancel
        </button>
        <button className="bg-green-700 font-semibold text-white px-4 py-2 w-30 rounded-lg" onClick={handleAdd}>
          Add
        </button>
      </div>

      {errors.submit && (
        <p className="text-red-600 text-sm mt-3">{errors.submit}</p>
      )}
    </div>
  );
};

export default AddAccount;
