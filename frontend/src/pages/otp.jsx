import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/background.svg";
import OtpComponent from "../components/OtpComponent";

const Otp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleVerify = (otp) => {
    navigate("/changepsw");
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-center" style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className="absolute inset-0 bg-green-200 opacity-20"></div>
      <div className="relative flex justify-center items-center h-screen">
        <OtpComponent title="Enter OTP" buttonText="Confirm" initialEmail={email} onVerify={handleVerify} onResendOtp={() => {}} onChangeEmail={setEmail} />
      </div>
    </div>
  );
};
export default Otp;