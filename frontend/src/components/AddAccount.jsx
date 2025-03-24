import React, { useState } from "react";
import CreatedSuccess from "../components/CreatedSuccess"; // Import the CreatedSuccess component

const AddAccount = ({ openModal, closeModal, setUserData }) => {
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
  
    // Create new account data
    const newAccount = {
      accountName: accountName.trim(),
      amount: Number(amount),
    };
  
    try {
      // Send the new account data to the backend
      const response = await fetch("http://localhost:3001/add-accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAccount),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add account: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Account added successfully:", data);
  
      // ✅ Close the AddAccount modal and then open CreatedSuccess
      closeModal();
      setTimeout(() => {
        openModal(
          <CreatedSuccess closeModal={closeModal} userData={newAccount} />
        );
      }, 300); // Small delay to ensure smooth transition
  
      // Update the account list in the parent component (if setUserData is provided)
      if (setUserData) {
        setUserData((prevData) =>
          Array.isArray(prevData) ? [...prevData, newAccount] : [newAccount]
        );
      }
  
      // Clear the form fields
      setAccountName("");
      setAmount("");
      setErrors({});
    } catch (error) {
      console.error("Error adding account:", error);
      setErrors({ submit: "Failed to add account. Please try again." });
    }
  };
  

  return (
    <div className="bg-white p-6 w-[300px] rounded-lg">
      <h2 className="text-green-600 text-3xl font-semibold text-center mb-4">
        Add Account
      </h2>

      {/* Account Name */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">
          Account Name
        </label>
        <input
          type="text"
          placeholder="Enter name"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          className="w-full border-2 border-gray-400 shadow-md rounded-lg px-3 py-2"
        />
        {errors.accountName && (
          <p className="text-red-600 text-sm mt-1">{errors.accountName}</p>
        )}
      </div>

      {/* Amount */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value || "")} // Handle empty input
          className="w-full border-2 border-gray-400 shadow-md rounded-lg px-3 py-2"
        />
        {errors.amount && (
          <p className="text-red-600 text-sm mt-1">{errors.amount}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="pt-4 flex justify-between">
        <button
          className="bg-gray-300 font-semibold text-black px-4 py-2 w-30 rounded-lg"
          onClick={closeModal} // Only closes the modal, no data is saved
        >
          Cancel
        </button>
        <button
          className="bg-green-700 font-semibold text-white px-4 py-2 w-30 rounded-lg"
          onClick={handleAdd} // Fixed: handleAdd now uses the correct values
        >
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
