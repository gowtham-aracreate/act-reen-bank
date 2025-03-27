import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../layout/leftsection";
import AccountIcon from "../assets/account.svg";
import GenderIcon from "../assets/gender.svg";
import PhoneIcon from "../assets/phone.svg";
import Close from "../assets/close.svg";

const AccountDetails = () => {
  const navigate = useNavigate();

  // State for input fields
  const [accountNo, setAccountNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const [modalStep, setModalStep] = useState(null);
  const [loading, setLoading] = useState(false); // To prevent multiple submissions

  // Function to validate input fields
  const validateInputs = () => {
    let newErrors = {};

    if (!accountNo.trim() || isNaN(accountNo)) {
      newErrors.accountNo = "Enter a valid account number";
    }

    if (!phoneNo.trim() || !/^\d{10}$/.test(phoneNo)) {
      newErrors.phoneNo = "Enter a valid 10-digit phone number";
    }

    if (!gender) {
      newErrors.gender = "Please select a gender";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/acc_details", {
        acc_no: accountNo,
        phone_no: phoneNo,
        gender,
        user_id: localStorage.getItem("user_id"),
      });

      if (response.data.success) {
        console.log("Account Info Submitted:", { accountNo, phoneNo, gender });

        // Store data in local storage
        localStorage.setItem("acc_no", accountNo);
        localStorage.setItem("phone_no", phoneNo);
        localStorage.setItem("gender", gender);

        setModalStep(1); // Open success modal
      }
    } catch (error) {
      console.error("Error submitting account details:", error);

      if (error.response) {
        setErrors({ server: error.response.data.message });
      } else {
        setErrors({ server: "Failed to save account details. Try again." });
      }
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="relative bg-white p-10 rounded-3xl shadow-lg w-[590px] z-10">
        <h2 className="text-green-600 text-3xl font-bold mb-6">Account Information</h2>
        {errors.server && <p className="text-red-500 text-sm mb-3">{errors.server}</p>}
        
        <form onSubmit={handleSubmit}>
          {/* Account Number Input */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Account Number</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter account number"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                className={`border w-full p-3 pr-10 rounded-lg text-gray-700 ${errors.accountNo ? "border-red-500" : ""}`}
              />
              <img src={AccountIcon} alt="Account Icon" className="absolute right-3 top-3 w-5 h-5" />
            </div>
            {errors.accountNo && <p className="text-red-500 text-sm mt-1">{errors.accountNo}</p>}
          </div>

          {/* Phone Number Input */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className={`border w-full p-3 pr-10 rounded-lg text-gray-700 ${errors.phoneNo ? "border-red-500" : ""}`}
              />
              <img src={PhoneIcon} alt="Phone Icon" className="absolute right-3 top-3 w-5 h-5" />
            </div>
            {errors.phoneNo && <p className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>}
          </div>

          {/* Gender Selection */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Gender</label>
            <div className="relative">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={`border w-full p-3 pr-10 rounded-lg text-gray-700 ${errors.gender ? "border-red-500" : ""}`}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <img src={GenderIcon} alt="Gender Icon" className="absolute right-3 top-3 w-5 h-5" />
            </div>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Information"}
          </button>
        </form>
      </div>

      {/* Modal */}
      {modalStep && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-[0_11px_80px_rgba(90,297,94,0.5)] w-[580px] relative">
            {/* Close Button */}
            <button
              onClick={() => setModalStep(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
            >
              <img src={Close} alt="Close" className="w-5 h-5" />
            </button>

            {modalStep === 1 && (
              <div className="relative text-center p-4 rounded-3xl pt-40">
                <h2 className="text-black text-lg font-bold mb-8">
                  Your account <span className="text-gray-500 text-lg font-bold">has been created Successfully!</span>
                </h2>
                <button
                  onClick={() => navigate("/overviewpage")}
                  className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300 mb-6"
                >
                  Go to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AccountDetails;