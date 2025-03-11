import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OtpComponent from "../components/OtpComponent";
import Layout from "../layout/leftsection";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  useEffect(() => {
    console.log("Updated email state:", email);
  }, [email]);

  const handleVerify = () => {
    navigate("/accountdetails");
  };

  const handleResendOtp = async (updatedEmail) => {
    const emailToSend = updatedEmail || email;

    try {
      const response = await fetch("http://localhost:3001/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailToSend }),
      });

      const data = await response.json();
      if (data.success) {
        alert("New OTP sent successfully!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("Error sending OTP. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <OtpComponent
          title="Email Verification"
          buttonText="Verify Email"
          initialEmail={email}
          onVerify={handleVerify}
          onResendOtp={handleResendOtp}
          onChangeEmail={setEmail}
        />
      </div>
    </Layout>
  );
};

export default EmailVerification;
