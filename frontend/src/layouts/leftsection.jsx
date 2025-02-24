import React from "react";
import Logo from "../assets/logo.svg";
import Facebook from "../assets/facebook 2.svg";
import Twitter from "../assets/twitter 2.svg";
import Instagram from "../assets/instagram 2.svg";
import BackgroundImage from "../assets/background.svg"; 

const Layout = ({ children }) => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-center bg-greeen-600" style={{backgroundImage: `url(${BackgroundImage})` }}>
      <div className="absolute inset-0 bg-green-200 opacity-30"></div>

<div className="pr-30 flex h-screen">
  <div className="relative z-10 w-1/2 flex flex-col justify-center p-24">
    <img className="w-50 mb-20" src={Logo} alt="Reen Bank Logo" />
    <h2 className="text-green-600 text-4xl font-medium">Reen Bank</h2>
    <h1 className="text-5xl font-bold leading-snug">
      Experience <br /> hassle-free banking
    </h1>
    <p className="text-gray-600 font-weight-400 mt-6 text-xl mb-6 w-xl">
      Experience simple, secure, and stress-free banking. Say goodbye to long queues and complex procedures, and hello to hassle-free banking with Reen Bank.
    </p>
    
    <div className="flex space-x-4 mt-15">
      <img className="w-8 h-8" src={Facebook} alt="Facebook" />
      <img className="w-8 h-8" src={Instagram} alt="Instagram" />
      <img className="w-8 h-8" src={Twitter} alt="Twitter" />
    </div>

  </div>

  <div className="relative pl-10 z-10 w-1/2 flex justify-center items-center">{children}</div>
</div>
    </div>
    
    
  );
};

export default Layout;
