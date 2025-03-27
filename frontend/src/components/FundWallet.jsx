import React, { useState } from "react";
import FundSuccess from "../components/FundSuccess";
import axios from "axios"; // Import Axios for API calls

const FundWallet = ({ openModal, closeModal, setUserData }) => {
  const [fundAmount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Direct Pay");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    holderName: "",
    expiryDate: "",
    cvv: "",
  });

  const validateInputs = () => {
    let newErrors = {};
    if (!fundAmount || isNaN(fundAmount) || Number(fundAmount) <= 0) {
      newErrors.fundAmount = "Please enter a valid amount.";
    }
    if (paymentMethod === "Credit Card") {
      if (!cardDetails.cardNumber) newErrors.cardNumber = "Card number is required.";
      if (!cardDetails.holderName) newErrors.holderName = "Card holder name is required.";
      if (!cardDetails.expiryDate) newErrors.expiryDate = "Expiry date is required.";
      if (!cardDetails.cvv) newErrors.cvv = "CVV is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFund = async () => {
    if (!validateInputs()) return;

    const user_id = localStorage.getItem("user_id"); 
    const account_id = localStorage.getItem("account_id");

    if (!user_id || !account_id) {
      alert("User or Account not found!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/fund-wallet", {
        user_id,
        account_id,
        amount: Number(fundAmount),
        payment_method: paymentMethod,
      });
      
      console.log("Response:", response.data);
      if (response.data.success) {
        setUserData?.((prev) => ({
          ...prev,
          balance: response.data.newBalance,
        }));
        openModal(<FundSuccess fundAmount={fundAmount} closeModal={closeModal} />);
      } else {
        alert(response.data.message || "Failed to fund wallet");
      }
    } catch (error) {
      alert("Error funding wallet. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 w-[330px]">
      <h2 className="text-green-600 text-3xl font-semibold text-center mb-4 pb-4">Fund Wallet</h2>
      <p className="mb-2">Select Payment Method</p>

      {/* Payment Method Selection */}
      <div className="flex gap-4 mb-4">
        {["Direct Pay", "Credit Card"].map((method) => (
          <label key={method} className="border-2 border-gray-400 shadow-md p-2 rounded-lg w-1/2 flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={paymentMethod === method}
              onChange={() => setPaymentMethod(method)}
            />
            {method}
          </label>
        ))}
      </div>

      {/* Amount Input */}
      <label className="block mb-2">Amount</label>
      <input 
        type="number"
        className="border-2 border-gray-400 shadow-md p-2 w-full rounded-lg mb-1"
        placeholder="100,000"
        value={fundAmount}
        onChange={(e) => setAmount(e.target.value)}
      />
      {errors.fundAmount && <p className="text-red-600 text-sm">{errors.fundAmount}</p>}

      {/* Credit Card Fields */}
      {paymentMethod === "Credit Card" && (
        <div className="mb-4">
          {["Card Number", "Card Holder Name", "Expiry Date", "CVV"].map((field, index) => (
            <div key={index}>
              <label className="block mb-1 mt-3">{field}</label>
              <input
                type={field === "CVV" ? "password" : "text"}
                className="border-2 border-gray-400 shadow-md p-2 w-full rounded-lg mb-1"
                placeholder={field}
                value={cardDetails[field.toLowerCase().replace(/ /g, "")]}
                onChange={(e) => setCardDetails({ ...cardDetails, [field.toLowerCase().replace(/ /g, "")]: e.target.value })}
              />
              {errors[field.toLowerCase().replace(/ /g, "")] && <p className="text-red-600 text-sm">{errors[field.toLowerCase().replace(/ /g, "")]}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button onClick={closeModal} className="bg-gray-300 font-semibold text-black px-4 py-2 w-30 rounded-lg">Cancel</button>
        <button onClick={handleFund} className={`bg-green-700 font-semibold text-white px-4 w-30 py-2 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loading}>
          {loading ? "Processing..." : "Fund"}
        </button>
      </div>
    </div>
  );
};

export default FundWallet;