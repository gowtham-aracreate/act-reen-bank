import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import overviewimg from "../assets/overviewimg.svg";
import accountimg from "../assets/accountimg.svg";
import transactionimg from "../assets/transactionimg.svg";
import profileimg from "../assets/profileimg.svg";
import arrowleft from "../assets/arrowleft.svg";

const Dashboard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation(); // get current route path
  const [modalStep, setModalStep] = useState(null); // State to control modal steps
  const [showModal, setShowModal] = useState(true); // State to toggle the overlay

  //to check if a menu item is action
  const isActive = (path) => location.pathname === path;

  // Function to handle reset password button click
  const logoutClick = () => {
    setModalStep(1); // Open the modal
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setModalStep(null); // Close the modal
  };

  return (
    <div>
      <div className="pt-0 ml-10 text-black-400 pl-2 p-11 min-h-screen flex flex-col justify-between">
        <div>
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-29 w-50 mr-2" />
            <h2 className="text-lg text-black-500 font-bold"></h2>
          </div>
          <ul className="mt-15 space-y-2">
            <li
              onClick={() => navigate("/overviewpage")}
              className={`text-xl flex items-center p-3 hover:bg-gray-200  rounded-md cursor-pointer w-45 
                        ${
                          isActive("/overviewpage")
                            ? "font-bold text-green-600"
                            : "text-black-500"
                        }`}
            >
              <img src={overviewimg} alt="Icon" className="h-6 w-6 mr-6 " />
              Overview
            </li>
            <li
              onClick={() => navigate("/accountpage")}
              className={`text-xl flex items-center p-3 hover:bg-gray-200  rounded-md cursor-pointer w-45 
                        ${
                          isActive("/accountpage")
                            ? "font-bold text-green-600"
                            : "text-black-500"
                        }`}
            >
              <img src={accountimg} alt="Icon" className="h-6 w-6 mr-6" />
              Accounts
            </li>
            <li
              onClick={() => navigate("/transaction")}
              className={`text-xl flex items-center p-3 hover:bg-gray-200  rounded-md cursor-pointer w-45 
                        ${
                          isActive("/transaction")
                            ? "font-bold text-green-600"
                            : "text-black-500"
                        }`}
            >
              <img src={transactionimg} alt="Icon" className="h-10 w-10 mr-3" />
              Transactions
            </li>
            <li
              onClick={() => navigate("/profile")}
              className={`text-xl flex items-center p-3 hover:bg-gray-200  rounded-md cursor-pointer w-45 
                        ${
                          isActive("/profile")
                            ? "font-bold text-green-600"
                            : "text-black-500"
                        }`}
            >
              <img src={profileimg} alt="Icon" className="h-6 w-6 mr-6" />
              Profile
            </li>
          </ul>
        </div>
        <div className="pl-7 text-xl flex items-center">
          <img className="w-5 mt-1" src={arrowleft} alt="Left Arrow" />
          <button className="px-6 cursor-pointer" onClick={logoutClick}>
            Logout
          </button>
        </div>
      </div>
      <div>{children}</div>
      {modalStep && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-[0_11px_80px_rgba(90,297,94,0.5)] w-[480px] relative">
            {modalStep === 1 && showModal && (
              <div className="flex justify-center items-center ">
                <div className="relative rounded-3xl z-10">
                  <h2 className="text-gray-600 text-xl font-bold pt-2 mb-12">
                    Are you sure you want to Logout?
                  </h2>

                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="bg-gray-300 text-white w-[58%] py-3 rounded-lg font-semibold text-lg mb-4 cursor-pointer"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-700 text-white w-[58%] py-3 rounded-lg font-semibold text-lg mb-4 cursor-pointer"
                      onClick={() => navigate("/login")}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
