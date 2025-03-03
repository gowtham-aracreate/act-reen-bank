import React from 'react'
import { useNavigate } from "react-router-dom";
import EmailIcon from "../assets/envelope.svg";
import BackgroundImage from "../assets/background.svg";

export const resetpsw = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
      e.preventDefault();
      navigate("/otp");
    }
    
  return (
      <div className="relative flex justify-center items-center h-screen bg-center bg-greeen-600" style={{ backgroundImage: `url(${BackgroundImage})` }}>
        <div className="absolute inset-0 bg-green-200 opacity-20"></div>
        <div className="flex justify-center items-center">

          {/* Login Form */}
          <div className="relative bg-white p-10 rounded-3xl shadow-lg w-[580px] z-10">
            <h2 className="text-green-600 text-3xl font-bold pt-2 mb-6">Reset Password</h2>

            <form onSubmit={handleLogin}>
              {/* Email Field */}
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <div className="relative">
                  <input
                    type="email" placeholder="Enter your Email" className="border w-full p-3 pr-10 rounded-lg text-gray-700 mb-4" required/>
                  <img src={EmailIcon} alt="Email Icon" className="absolute right-3 top-3 w-5 h-5" />
                </div>
              </div>
  
  
              {/* Login Button */}
              <button type="submit" className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
export default resetpsw;

