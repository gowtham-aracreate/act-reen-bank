import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/leftsection";

const EmailVerification = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="relative bg-white p-10 rounded-3xl shadow-lg w-[600px] px-10 z-10">
        <h2 className="text-green-600 text-3xl font-bold mb-12 pt-20">Email Verification</h2>
        <p className="text-gray-600 mb-4">
          A 6-digit code has been sent to your email us****me@gmail.com <span className="text-green-600 cursor-pointer">Change</span>
        </p>
        <div className="flex justify-between mb-4">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="border w-12 h-12 text-center rounded-lg text-lg font-semibold"
            />
          ))}
        </div>
        <p className="text-green-600 text-sm mb-4">0:45 remaining</p>
        <button onClick={() => navigate("/create-account")} className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold text-lg">
          Verify Email
        </button>
        <p className="text-sm mt-4 pb-10">
          Didn’t receive the code? <span className="text-green-600 cursor-pointer">Resend</span>
        </p>
      </div>
    </Layout>
  );
};

export default EmailVerification;