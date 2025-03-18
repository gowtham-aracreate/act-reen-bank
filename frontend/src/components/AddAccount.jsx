import React, { useState } from "react";
import CreatedSuccess from "../components/CreatedSuccess"; // Import the CreatedSuccess component

const AddAccount = ({ openModal, closeModal, setUserData }) => {
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});

  const handleAdd = () => {
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

    // If validation passes, call setUserData with the new account
    const newAccount = { accountName, amount: Number(amount) };
    setUserData(newAccount);

    // Close the AddAccount modal
    closeModal();

    // Open the CreatedSuccess modal
    openModal(
      <CreatedSuccess
        closeModal={closeModal}
        userData={newAccount} // Pass the new account data
      />
    );

    // Clear the form fields
    setAccountName("");
    setAmount("");
    setErrors({});
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
          onChange={(e) => setAmount(e.target.value)}
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
          onClick={handleAdd} // Only saves data when this button is clicked
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddAccount;