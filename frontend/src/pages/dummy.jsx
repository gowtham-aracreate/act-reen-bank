import React, { useState } from "react";
import Layout from "../layout/Layout";
import ArrowrightTrans from "../assets/trans-arrow.svg";
import EyeOpen from "../assets/eyeopen.svg";
import EyeClose from "../assets/eyeclosed.svg";
import User from "../assets/userimg.svg";
import EditIcon from "../assets/edit.svg";
import EmailIcon from "../assets/envelope.svg";
import LockIcon from "../assets/lock.svg";
import UnlockIcon from "../assets/unlock.svg";
import OtpComponent from "../components/OtpComponent";

const transactions = [
  { id: 1, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000 },
  { id: 2, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000 },
  { id: 3, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000 },
  { id: 4, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000 },
];

const ProfilePage = () => {
  const [isMainAccountHidden, setIsMainAccountHidden] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState("main");
  const [modalStep, setModalStep] = useState(null); // Added for modal control
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const [isHidden, setIsHidden] = useState(true);
  const [isConfirmHidden, setIsConfirmHidden] = useState(true);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setModalStep(2); // Move to OTP step
  };

  const handleVerify = () => {
    setModalStep(3); // Move to new password step
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    let newErrors = { password: "", confirmPassword: "" };
    if (!validatePassword(password)) {
      newErrors.password = "Password must meet security criteria.";
    }
    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    if (!newErrors.password && !newErrors.confirmPassword) {
      setModalStep(4); // Move to success step (you can add this step if needed)
    }
  };

  return (
    <Layout>
      <div className="flex justify-center min-h-screen mt-15 bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-8 w-[606px] text-center">
          <div className="relative mx-auto w-28 h-28">
            <img src={User} alt="User" className="w-full h-full rounded-full border-4 border-white shadow-md" />
            <button className="absolute top-2 right-2 bg-white w-5 h-5 rounded-full shadow-md hover:bg-gray-200">
              <img src={EditIcon} alt="Edit" className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-2xl font-semibold mt-4">Maureen Oguche</h2>
          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-md text-sm font-medium">Pro User</span>
          <div className="mt-6 space-y-4 px-20 text-left">
            <div className="border-b pb-4">
              <p className="text-sm font-semibold text-green-600">Email</p>
              <p className="text-lg font-medium text-gray-700">oguchemaureen@gmail.com</p>
            </div>
            <div className="border-b pb-4">
              <p className="text-sm font-semibold text-green-600">Phone Number</p>
              <p className="text-lg font-medium text-gray-700">+234 803 041 1314</p>
            </div>
          </div>
          <button onClick={() => setModalStep(1)} className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 mt-6">Reset Password</button>

          {/* Transactions Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-left mb-4">Transactions</h3>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <img src={ArrowrightTrans} alt="Transaction" className="w-6 h-6 mr-4" />
                    <div>
                      <p className="text-sm font-semibold">{transaction.name}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <p className={`text-lg font-semibold ${transaction.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                    {transaction.amount < 0 ? "-" : "+"}₦{Math.abs(transaction.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {modalStep && <div className="fixed inset-0 bg-black opacity-50 z-10"></div>}

      {/* Step 1: Enter Email */}
      {modalStep === 1 && (
        <div className="fixed inset-0 flex justify-center items-center z-20">
          <div className="bg-white p-10 rounded-3xl shadow-lg w-[580px]">
            <h2 className="text-green-600 text-3xl font-bold mb-6">Reset Password</h2>
            <form onSubmit={handleResetSubmit}>
              <input type="email" placeholder="Enter your Email" className="border w-full p-3 rounded-lg" required />
              <button type="submit" className="bg-green-600 text-white w-full py-3 rounded-lg mt-4">Reset Password</button>
            </form>
          </div>
        </div>
      )}

      {/* Step 2: Enter OTP */}
      {modalStep === 2 && (
        <div className="fixed inset-0 flex justify-center items-center z-20">
          <OtpComponent title="Enter OTP" buttonText="Confirm" onVerify={handleVerify} />
        </div>
      )}

      {/* Step 3: Enter New Password */}
      {modalStep === 3 && (
        <div className="fixed inset-0 flex justify-center items-center z-20">
          <div className="bg-white p-10 rounded-3xl shadow-lg w-[580px]">
            <h2 className="text-green-600 text-3xl font-bold mb-6">Enter new Password</h2>
            <form onSubmit={handleChangePassword}>
              <input type="password" placeholder="Enter Password" className="border w-full p-3 rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit" className="bg-green-600 text-white w-full py-3 rounded-lg mt-4">Change Password</button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProfilePage;