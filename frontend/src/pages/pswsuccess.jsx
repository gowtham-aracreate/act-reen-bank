import React from 'react'
// import { useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/background.svg";

export const pswsuccess = () => {
    
  return (
      <div className="relative flex justify-center items-center h-screen bg-center bg-greeen-600" style={{ backgroundImage: `url(${BackgroundImage})` }}>
        <div className="absolute inset-0 bg-green-200 opacity-20"></div>
        <div className="flex justify-center items-center">

          <div className="relative bg-white p-10 pt-50 rounded-3xl shadow-lg w-[580px] z-10">
            <h2 className="text-gray-600 text-xl font-bold pt-2 mb-12">Your password has been changed!</h2>

              <button type="submit" className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300 mb-4">Go Back</button>
          </div>
        </div>
      </div>
    );
  };
  
export default pswsuccess;