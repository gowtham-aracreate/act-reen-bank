import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";

const OtpComponent = ({ title, buttonText, initialEmail, onVerify, onResendOtp }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const email = initialEmail;

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = () => {
    if (canResend) {
      onResendOtp(email);
      setTimer(45);
      setCanResend(false);
    }
  };

  const handleChangeEmail = () => {
    navigate("/register"); // Redirect to the Register page
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch("http://localhost:3001/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (data.success) {
        alert("OTP Verified!");
        onVerify();
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert("Error verifying OTP. Please try again.");
    }
  };

  return (
    <div className="relative bg-white p-10 rounded-3xl shadow-lg w-[600px] px-10 z-10">
      <h2 className="text-green-600 text-3xl font-bold mb-12 pt-6">{title}</h2>
      <p className="text-gray-600 mb-4">
        A 6-digit code has been sent to your email {email}
        <span className="text-green-600 cursor-pointer ml-2" onClick={handleChangeEmail}>
          Change
        </span>
      </p>
      <div className="flex justify-center mb-4">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputStyle={{
            width: "50px",
            height: "50px",
            margin: "0 20px",
            fontSize: "20px",
            textAlign: "center",
            borderRadius: "8px",
            border: "2px solid #8A8A8A",
            boxShadow: "0px 0px 10px rgba(240, 240, 240, 0.84)",
            outline: "none",
          }}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <p className="text-green-600 text-sm mb-4">
        {canResend ? (
          <span className="text-black">Didn’t receive the code? <span className="text-green-600 cursor-pointer" onClick={handleResend}>Resend OTP</span></span>
        ) : (
          `${timer} seconds remaining`
        )}
      </p>
      <button
        onClick={handleVerifyOtp}
        className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold text-lg"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default OtpComponent;
