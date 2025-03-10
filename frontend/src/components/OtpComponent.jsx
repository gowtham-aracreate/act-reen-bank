import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";

const OtpComponent = ({ title, buttonText, initialEmail, onVerify, onResendOtp, onChangeEmail }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [email, setEmail] = useState(initialEmail);
  const [editing, setEditing] = useState(false);

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

  const handleEmailChange = () => {
    setEditing(true);
  };

  const handleSaveEmail = async () => {
    setEditing(false);
    onChangeEmail(email);
    localStorage.setItem("email", email); // Save email in localStorage

    try {
      const response = await fetch("http://localhost:3001/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        alert("OTP sent to new email!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch("http://localhost:3001/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        {editing ? (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded"
          />
        ) : (
          <>A 6-digit code has been sent to your email {email}</>
        )}
        {!editing ? (
          <span className="text-green-600 cursor-pointer ml-2" onClick={handleEmailChange}>
            Change
          </span>
        ) : (
          <span className="text-green-600 cursor-pointer ml-2" onClick={handleSaveEmail}>
            Save
          </span>
        )}
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
          <span className="text-green-600 cursor-pointer" onClick={handleResend}>
            Resend OTP
          </span>
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
