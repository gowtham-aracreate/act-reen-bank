import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OtpComponent from "../components/OtpComponent";
import Layout from "../layout/leftsection";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  useEffect(() => {
    if (email && email.trim() !== "") {
      sendOtp(email);
    }
  }, [email]);

  const sendOtp = async (emailToSend) => {
    if (!emailToSend || emailToSend.trim() === "") return;

    try {
      const response = await fetch("http://localhost:3001/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToSend }),
      });

      const data = await response.json();
      if (data.success) {
        alert("OTP sent successfully!");
      } else {
        alert(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please try again.");
    }
  };

  const handleVerify = () => {
    navigate("/accountdetails"); // Navigate to account details page on OTP verification
  };

  const handleChangeEmail = () => {
    localStorage.removeItem("email"); // Clear stored email
    navigate("/register"); // Redirect user to registration page
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <OtpComponent
          title="Email Verification"
          buttonText="Verify Email"
          initialEmail={email}
          onVerify={handleVerify}
          onResendOtp={() => sendOtp(email)}
          onChangeEmail={handleChangeEmail} // Navigates to the registration page
        />
      </div>
    </Layout>
  );
};

export default EmailVerification;
