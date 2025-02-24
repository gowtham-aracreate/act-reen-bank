import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/background.svg"; 

const AccountCreation = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex justify-center items-center h-screen bg-center bg-greeen-600" style={{backgroundImage: `url(${BackgroundImage})` }}>

    <div className="absolute inset-0 bg-green-200 opacity-30"></div>

      <div className="relative text-center bg-white p-15 rounded-3xl shadow-lg w-[500px] pt-40">
        <h2 className="text-black text-lg font-bold mb-8">
          Your account <span className="text-gray-500 text-lg font-bold">has been created Successfully!</span>
        </h2>
        <button onClick={() => navigate("/overviewpage")} className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition duration-300 mb-6">
          Go to dashboard
        </button>
      </div>
    </div>
  );
};

export default AccountCreation;
