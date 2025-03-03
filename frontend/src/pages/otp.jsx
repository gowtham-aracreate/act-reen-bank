import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import BackgroundImage from "../assets/background.svg";

const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    if (otp.length === 6) {
      setError(""); // Clear error if OTP is valid
      navigate("/changepsw"); // Navigate to the next page
    } else {
      setError("Please enter a valid 6-digit OTP"); // Show error if OTP is incomplete
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-center bg-greeen-600" style={{ backgroundImage: `url(${BackgroundImage})` }}>
        <div className="absolute inset-0 bg-green-200 opacity-20"></div>
        <div className="relative bg-white p-10 rounded-3xl shadow-lg w-[600px] px-10 z-10">
        <h2 className="text-green-600 text-3xl font-bold mb-12 pt-6">Enter OTP</h2>
        <p className="text-gray-600 mb-4">
          A 6-digit code has been sent to your email us****me@gmail.com <span className="text-green-600 cursor-pointer">Change</span>
        </p>
        <div className="flex justify-center mb-4">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={{
              width: "50px",
              height: "50px",
              margin: "0 20px", // Adjusted space between boxes
              fontSize: "20px",
              textAlign: "center",
              borderRadius: "8px",
              border: "2px solid #8A8A8A", // Corrected border property
              boxShadow: "0px 0px 10px rgba(240, 240, 240, 0.84)", // Corrected boxShadow property
              outline: "none", required: "required",
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        {/* Error message if OTP is incorrect */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <p className="text-green-600 text-sm mb-4">0:45 remaining</p>

        <button onClick={handleVerify} className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold text-lg">Confirm</button>

        <p className="text-sm mt-4 pb-4">
          Didn’t receive the code? <span className="text-green-600 cursor-pointer">Resend</span>
        </p>
      </div>
    </div>
      
  );
};

export default Otp;