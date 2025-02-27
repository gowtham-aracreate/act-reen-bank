import React from "react";
import { useNavigate } from "react-router-dom";
import EmailIcon from "../assets/envelope.svg";
import PasswordIcon from "../assets/lock.svg";
import Logo from "../assets/logo.svg";
import Facebook from "../assets/facebook 2.svg";
import Twitter from "../assets/twitter 2.svg";
import Instagram from "../assets/instagram 2.svg";
import BackgroundImage from "../assets/background.svg";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/overviewpage");
  };

  return (

    <div className="relative flex justify-center items-center h-screen bg-center bg-greeen-600"style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className="absolute inset-0 bg-green-200 opacity-20"></div>
      <div className="pr-30 flex justify-center items-center">
      <div className="relative z-10 flex flex-col justify-center p-24">
        <img className="w-50 mb-24" src={Logo} alt="Reen Bank Logo" />
        <h2 className="text-green-600 text-4xl font-medium mb-2">Reen Bank</h2>
        <h1 className="text-5xl font-bold leading-snug mb-4">
          Welcome Back
        </h1>
        <p className="text-gray-600 font-weight-400 mt-6 text-xl mb-6 w-xl">
          Enter Your Details to login to your Banking Dashboard again!
        </p>

        <div className="flex space-x-4 mt-26">
          <img className="w-8 h-8" src={Facebook} alt="Facebook" />
          <img className="w-8 h-8" src={Instagram} alt="Instagram" />
          <img className="w-8 h-8" src={Twitter} alt="Twitter" />
        </div>
      </div>

      <div className="relative bg-white p-10 rounded-3xl shadow-lg w-[580px] z-10">
        <h2 className="text-green-600 text-3xl font-bold pt-8 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your Email"
                className="border w-full p-3 pr-10 rounded-lg text-gray-700"
                required
              />
              <img src={EmailIcon} alt="Email Icon" className="absolute right-3 top-3 w-5 h-5" />
            </div>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your Password"
                className="border w-full p-3 pr-10 rounded-lg text-gray-700"
                required
              />
              <img src={PasswordIcon} alt="Password Icon" className="absolute right-3 top-3 w-5 h-5" />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition duration-300"
          >
            Login
          </button>

          <p className="text-sm mt-4 mb-8">
            Don't Have an Account? 
            <span className="text-green-600 cursor-pointer font-medium" onClick={() => navigate("/register")}> Register.</span>
          </p>
        </form>
      </div>
    </div>
    </div>
    
  );
};

export default Login;