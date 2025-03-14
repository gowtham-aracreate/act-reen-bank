import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import ArrowrightTrans from "../assets/trans-arrow.svg";
import EyeOpen from "../assets/eyeopen.svg";
import EyeClose from "../assets/eyeclosed.svg";
import User from "../assets/userimg.svg";
import EditIcon from "../assets/edit.svg";
import OtpComponent from "../components/OtpComponent"; // Assuming you have this component

const transactions = [
  { id: 1, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000 },
  { id: 2, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000 },
  { id: 3, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000 },
  { id: 4, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000 },
  { id: 5, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000 },
  { id: 6, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000 },
  { id: 7, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000 },
  { id: 8, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000 },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isMainAccountHidden, setIsMainAccountHidden] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState("main");
  const [modalStep, setModalStep] = useState(null); // State to control modal steps
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [phone_no, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  useEffect(() =>{
      //Retrieve user details from local storage
      const StoredUsername = localStorage.getItem('username')
      const StoredEmail = localStorage.getItem('email');
      const StoredPhoneNo = localStorage.getItem('phone_no');
      const StoredGender = localStorage.getItem('gender');
      setUserName(StoredUsername);
      setEmail(StoredEmail);
      setPhoneNo(StoredPhoneNo);
      setGender(StoredGender);
    },[]);


  // Function to handle reset password button click
  const handleResetPasswordClick = () => {
    setModalStep(1); // Open the modal
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setModalStep(null); // Close the modal
  };

  // Function to handle form submission for reset password
  const handleResetSubmit = (e) => {
    e.preventDefault();
    setModalStep(2); // Move to OTP step
  };

  // Function to handle OTP verification
  const handleVerify = () => {
    setModalStep(3); // Move to new password step
  };

  // Function to handle password change
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setModalStep(4); // Move to success step
    } else {
      setErrors({ ...errors, confirmPassword: "Passwords do not match." });
    }
  };

  return (
    <Layout>
      <div className="flex">
        {/* Main container */}
        <div className="justify-center items-center min-h-screen mt-15 bg-gray-100">
          {/* Profile Card */}
          <div className="bg-white shadow-lg rounded-xl p-8 w-[606px] h-140 text-center">
            {/* Profile Picture */}
            <div className="relative mx-auto w-28 h-28">
              <img
                src={User}
                alt="User Img"
                className="w-full h-full rounded-full border-4 border-white object-cover shadow-md"
              />
              <button className="absolute top-2 right-2 bg-white w-5 h-5 rounded-full shadow-md flex items-center justify-center hover:bg-gray-200 transition">
                <img src={EditIcon} alt="Edit Icon" className="w-20 h-20" />
              </button>
            </div>

            {/* User Info */}
            <h2 className="text-2xl font-semibold mt-4">{username}</h2>
            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-md text-sm font-medium">
              Pro User
            </span>

            {/* User Details Section */}
            <div className="mt-6 space-y-4 px-20">
              <div className="border-b pb-4 text-left">
                <p className="text-sm font-semibold text-green-600">Email</p>
                <p className="text-lg font-medium text-gray-700">{email}</p>
              </div>
              <div className="border-b pb-4 text-left">
                <p className="text-sm font-semibold text-green-600">Phone Number</p>
                <p className="text-lg font-medium text-gray-700">{phone_no}</p>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-green-600">Gender</p>
                <p className="text-lg font-medium text-gray-700">{gender}</p>
              </div>
            </div>

            {/* Reset Password Button */}
            <div className="mt-6">
              <button
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition cursor-pointer"
                onClick={handleResetPasswordClick} // Open modal on click
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>

        {/* Account Cards and Transactions */}
        <div className="flex flex-col">
          <div
            className="flex bg-green-200 w-xs rounded-lg ml-20 px-4 py-6 justify-between items-center cursor-pointer mt-15"
            onClick={() => setSelectedAccount("main")}
          >
            <div>
              <h3>Main Account</h3>
              <p className="text-xl font-bold">
                {isMainAccountHidden ? "XXXXX" : "₦ 44,500.00"}
              </p>
            </div>
            <div className="justify-between items-top">
              <button
                onClick={() => setIsMainAccountHidden(!isMainAccountHidden)}
                className="w-10 h-10 mx-6 bg-gray-200 rounded-lg flex items-center justify-center"
              >
                <img
                  className="w-5 h-5 bg-gray-200 rounded-lg cursor-pointer"
                  src={isMainAccountHidden ? EyeClose : EyeOpen}
                  alt="Toggle Balance Icon"
                />
              </button>
            </div>
          </div>

          {/* Transactions */}
          <div className="mt-10 ml-20">
            <div className="flex">
              <h2 className="text-2xl font-bold">Transactions</h2>
              <img className="pl-72" src={ArrowrightTrans} alt="Right Arrow Icon" />
            </div>
            <div className="pt-3 pb-6">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="pb-2">
                  <div className="flex text-gray-400 justify-between py-1">
                    <p>{transaction.name}</p>
                    <p>{transaction.date}</p>
                    <p
                      className={`font-bold ${
                        transaction.amount < 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {transaction.amount < 0
                        ? `- ₦${Math.abs(transaction.amount).toLocaleString()}`
                        : `+ ₦${transaction.amount.toLocaleString()}`}
                    </p>
                  </div>
                  <hr className="border-gray-300 pt-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalStep && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-3xl shadow-lg w-[580px]">
            {modalStep === 1 && (
              <div>
                <h2 className="text-green-600 text-3xl font-bold mb-6">Reset Password</h2>
                <form onSubmit={handleResetSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    className="border w-full p-3 rounded-lg"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-green-600 text-white w-full py-3 rounded-lg mt-4"
                  >
                    Reset Password
                  </button>
                </form>
              </div>
            )}
            {modalStep === 2 && (
              <OtpComponent
                title="Enter OTP"
                buttonText="Confirm"
                onVerify={handleVerify}
              />
            )}
            {modalStep === 3 && (
              <div>
                <h2 className="text-green-600 text-3xl font-bold mb-6">Enter New Password</h2>
                <form onSubmit={handleChangePassword}>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="border w-full p-3 rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="border w-full p-3 rounded-lg mt-4"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>
                  )}
                  <button
                    type="submit"
                    className="bg-green-600 text-white w-full py-3 rounded-lg mt-4"
                  >
                    Change Password
                  </button>
                </form>
              </div>
            )}
            {modalStep === 4 && (
              <div>
                <h2 className="text-green-600 text-3xl font-bold mb-6">Password Changed Successfully</h2>
                <button
                  onClick={handleCloseModal}
                  className="bg-green-600 text-white w-full py-3 rounded-lg mt-4"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProfilePage;