import React, { useState } from "react";
import FundSuccess from "../components/FundSuccess";
import axios from "axios"; // Import Axios for API calls

const FundWallet = ({ openModal, closeModal, setUserData }) => {
  const [fundAmount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Direct Pay");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    holderName: "",
    expiryDate: "",
    cvv: "",
  });


  const handleFund = async () => {
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const user_id = localStorage.getItem("user_id"); 
    if (!user_id) {
    alert("User not logged in!");
    return;
    }

    setLoading(true);//Start loading before making the request

    try {
      const response = await axios.post("http://localhost:3001/fund-wallet", {
        user_id,  // Get the user ID from localStorage
        amount: fundAmount, // Ensure the amount is a number
        payment_method: paymentMethod, // Include the selected payment method
      });
      console.log("Response:", response.data); 
      
      if (response.data.success) {
        setUserData?.((prev) => ({
          ...prev,
          balance: response.data.balance,
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

      {/* Payment Method Radio Buttons */}
      <div className="flex gap-4 mb-4">
        <label className="border-2 border-gray-400 shadow-md p-2 rounded-lg w-1/2 flex items-center gap-2 cursor-pointer">
          <input className="w-3 h-3 accent-red-500"
            type="radio"
            name="paymentMethod"
            value="Direct Pay"
            checked={paymentMethod === "Direct Pay"}
            onChange={() => setPaymentMethod("Direct Pay")}/>
          Direct Pay
        </label>

        <label className="border-2 border-gray-400 shadow-md w-1/2 p-2 rounded-lg flex items-center gap-2 cursor-pointer">
          <input className="w-3 h-3 accent-red-500"
            type="radio"
            name="paymentMethod"
            value="Credit Card"
            checked={paymentMethod === "Credit Card"}
            onChange={() => setPaymentMethod("Credit Card")}/>
          Credit Card
        </label>
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

      {/* Show Credit Card Fields if 'Credit Card' is selected */}
      {paymentMethod === "Credit Card" && (
        <div className="mb-4">
          <label className="block mb-1">Card Number</label>
          <input
            type="number"
            className="border-2 border-gray-400 shadow-md p-2 w-full rounded-lg mb-1"
            placeholder="0000 0000 0000 0000"
            value={cardDetails.cardNumber}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, cardNumber: e.target.value })
            }
          />
          {errors.cardNumber && <p className="text-red-600 text-sm">{errors.cardNumber}</p>}

          <label className="block mb-1 mt-3">Card Holder Name</label>
          <input
            type="text"
            className="border-2 border-gray-400 shadow-md p-2 w-full rounded-lg mb-1"
            placeholder="Enter card holder name"
            value={cardDetails.holderName}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, holderName: e.target.value })
            }
          />
          {errors.holderName && <p className="text-red-600 text-sm">{errors.holderName}</p>}

          <div className="flex gap-4">
            <div>
              <label className="block mb-1 mt-3">Expiry Date</label>
              <input
                type="text"
                className="border-2 border-gray-400 shadow-md p-2 w-full rounded-lg mb-1"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiryDate: e.target.value })
                }
              />
              {errors.expiryDate && <p className="text-red-600 text-sm">{errors.expiryDate}</p>}
            </div>

            <div>
              <label className="block mb-1 mt-3">CVV</label>
              <input
                type="password"
                className="border-2 border-gray-400 shadow-md p-2 w-full rounded-lg mb-1"
                placeholder="000"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
              />
              {errors.cvv && <p className="text-red-600 text-sm">{errors.cvv}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={closeModal}
          className="bg-gray-300 font-semibold text-black px-4 py-2 w-30 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleFund}
          className="bg-green-700  font-semibold text-white px-4 w-30 py-2 rounded-lg"
        >
          Fund
        </button>
      </div>
    </div>
  );
};

export default FundWallet;

