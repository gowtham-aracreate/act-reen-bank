import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from "../assets/lock.svg";
import UnlockIcon from "../assets/unlock.svg";
import BackgroundImage from "../assets/background.svg";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const [isHidden, setIsHidden] = useState(true);
  const [isConfirmHidden, setIsConfirmHidden] = useState(true);

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { password: "", confirmPassword: "" };

    // Password validation
    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    // Confirm password validation
    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    // If no errors, navigate to the next page
    if (!newErrors.password && !newErrors.confirmPassword) {
      navigate("/pswsuccess");
    }
  };

  return (
    <div
      className="relative flex justify-center items-center h-screen bg-center bg-greeen-600" style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className="absolute inset-0 bg-green-200 opacity-20"></div>
      <div className="flex justify-center items-center">
        <div className="relative bg-white p-10 rounded-3xl shadow-lg w-[580px] z-10">
          <h2 className="text-green-600 text-3xl font-bold pt-4 mb-6">Enter new Password</h2>
          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">New Password</label>
              <div className="relative flex items-center">
                <input
                  type={isHidden ? "password" : "text"}
                  placeholder="Enter your Password"
                  className="border w-full p-3 pr-12 rounded-lg text-gray-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required/>
                <button type="button" onClick={() => setIsHidden(!isHidden)}className="absolute right-3 top-3 w-5 h-5">
                  <img src={isHidden ? LockIcon : UnlockIcon} alt="Toggle Password Visibility" className="w-5 h-5"/>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>)}
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">Retype Password</label>
              <div className="relative flex items-center">
                <input
                  type={isConfirmHidden ? "password" : "text"}
                  placeholder="Retype your Password"
                  className="border w-full p-3 pr-12 rounded-lg text-gray-700"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required/>
                <button
                  type="button"
                  onClick={() => setIsConfirmHidden(!isConfirmHidden)}
                  className="absolute right-3 top-3 w-5 h-5">
                  <img src={isConfirmHidden ? LockIcon : UnlockIcon} alt="Toggle Password Visibility" className="w-5 h-5"/>
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1"> {errors.confirmPassword}</p>)}
            </div>

            {/* Submit Button */}
            <button type="submit"
              className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300">Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
