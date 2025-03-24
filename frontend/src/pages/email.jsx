import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import OtpComponent from "../components/OtpComponent";
import Layout from "../layout/leftsection";

const EmailVerification = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email") || ""; // Get email from localStorage
  const [otpSent, setOtpSent] = useState(false);
  const otpRequestInProgress = useRef(false); // Prevents multiple OTP requests

  useEffect(() => {
    if (email && !otpSent && !otpRequestInProgress.current) {
      sendOtp(email);
    }
  }, [email, otpSent]);

  const sendOtp = async (emailToSend) => {
    if (!emailToSend.trim() || otpRequestInProgress.current) return;

    otpRequestInProgress.current = true; // Prevent multiple requests

    try {
      const response = await fetch("http://localhost:3001/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToSend }),
      });

      const data = await response.json();
      if (data.success) {
        alert("OTP sent successfully!");
        setOtpSent(true);
      } else {
        alert(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please try again.");
    } finally {
      otpRequestInProgress.current = false; // Allow future requests
    }
  };

  const handleVerify = () => {
    navigate("/accountdetails"); // Navigate to account details page after verification
  };

  const handleChangeEmail = () => {
    localStorage.removeItem("email"); // Clear stored email
    navigate("/register"); // Redirect to Register page
  };

  return (
    <Layout>
      <div className="relative bg-white p-10 rounded-3xl shadow-lg w-[600px] px-10 z-10 flex justify-center items-center">
        <OtpComponent
          title="Email Verification"
          buttonText="Verify Email"
          initialEmail={email}
          onVerify={handleVerify}
          onResendOtp={() => {
            setOtpSent(false); // Reset OTP sent flag for resend
            sendOtp(email);
          }}
          onChangeEmail={handleChangeEmail} // Navigates to the Register page
        />
      </div>
    </Layout>
  );
};

export default EmailVerification;