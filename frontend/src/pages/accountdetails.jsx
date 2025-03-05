import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../layout/leftsection";
import AccountIcon from "../assets/account.svg";
import GenderIcon from "../assets/gender.svg";
import PhoneIcon from "../assets/phone.svg";

const AccountDetails = () => {
  const navigate = useNavigate();
  
  // State for input fields
  const [accountNo, setAccountNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});

  // Function to validate phone number
  const validatePhoneNumber = (number) => {
    const phonePattern = /^[0-9]{10}$/; // Only numbers, exactly 10 digits
    return phonePattern.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validate Account Number
    if (!accountNo || isNaN(accountNo)) {
      newErrors.accountNo = "Enter a valid account number";
    }

    // Validate Phone Number
    if (!validatePhoneNumber(phoneNo)) {
      newErrors.phoneNo = "Enter a valid 10-digit phone number";
    }

    // Validate gender
    if(!gender) {
      newErrors.gender = "Please select a gender";
    }

    //If any validdation error, stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try{
      const response = await axios.post("http://localhost:3001/acc_details", { 
       acc_no: accountNo, 
       phone_no: phoneNo,
       gender,
      });
      if(response.data.success){
        console.log("Account Info Submitted:", { accountNo, phoneNo, gender });
        navigate("/create-account");
      }
    } catch (error) {
      console.error("Error submitting account details:", error);
      setErrors({ server: "Failed to save account details. Try again." });
    }
  };

  return (
    <Layout>
      <div className="relative bg-white p-10 rounded-3xl shadow-lg w-[590px] z-10">
        <h2 className="text-green-600 text-3xl font-bold mb-6">Account Information</h2>
        <form onSubmit={handleSubmit}>

          {/* Account Number Input */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Account Number</label>
            <div className="relative">
              <input type="text" placeholder="Enter account number" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} className="border w-full p-3 pr-10 rounded-lg text-gray-700" required />
              <img src={AccountIcon} alt="Account Icon" className="absolute right-3 top-3 w-5 h-5" />
            </div>
          </div>

          {/* Phone Number Input with Validation */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
            <div className="relative">
              <input 
                type="tel" 
                placeholder="Enter phone number" 
                value={phoneNo} 
                onChange={(e) => setPhoneNo(e.target.value)} 
                className={`border w-full p-3 pr-10 rounded-lg text-gray-700 ${errors.phoneNo ? 'border-red-500' : ''}`} 
                required 
              />
              <img src={PhoneIcon} alt="Phone Icon" className="absolute right-3 top-3 w-5 h-5" />
            </div>
            {errors.phoneNo && <p className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>}
          </div>

          {/* Gender Selection */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Gender</label>
            <div className="relative">
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="border w-full p-3 pr-10 rounded-lg text-gray-700" required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <img src={GenderIcon} alt="Gender Icon" className="absolute right-3 top-3 w-5 h-5" />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300">Save Information</button>
        </form>
      </div>
    </Layout>
  );
};

export default AccountDetails;
