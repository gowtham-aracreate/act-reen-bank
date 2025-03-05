import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmailIcon from "../assets/envelope.svg";
import LockIcon from "../assets/lock.svg"; // Locked icon
import UnlockIcon from "../assets/unlock.svg"; // Unlocked icon
import Logo from "../assets/logo.svg";
import Facebook from "../assets/facebook 2.svg";
import Twitter from "../assets/twitter 2.svg";
import Instagram from "../assets/instagram 2.svg";
import BackgroundImage from "../assets/background.svg";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isHidden, setIsHidden] = useState(true); // For password visibility

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let newErrors = { email: "", password: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      try {
        const response = await axios.post("http://localhost:3001/login", { email, password });

        if (response.data.success) {
          navigate("/overviewpage");
        }
      } catch (error) {
        console.error("Error logging in user", error);

        if (error.response) {
          console.log("Backend Response:", error.response.data);
          const {data} = error.response;

          if (data.message === "Invaild Email") {
            setErrors({ email: "Invalid Email", password: "" });
          } else if (data.message === "Invalid Password") {
            setErrors({ email: "", password: "Invalid Password" });
          }else {
            setErrors({ email: "Invalid Email", password: "Invalid Password" });
          }
        } else {
          setErrors({ email: "Network Error", password: "Network Error" });
        }
      }
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-center" style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className="absolute inset-0 bg-green-200 opacity-20"></div>
      <div className="pr-30 flex justify-between items-center">
        <div className="relative z-10 flex flex-col justify-center p-24">
          <img className="w-50 mb-24" src={Logo} alt="Reen Bank Logo" />
          <h2 className="text-green-600 text-4xl font-medium mb-2">Reen Bank</h2>
          <h1 className="text-5xl font-bold leading-snug mb-4">Welcome Back</h1>
          <p className="text-gray-600 text-xl mb-6 w-xl">
            Enter Your Details to login to your Banking Dashboard again!
          </p>

          <div className="flex space-x-4">
            <img className="w-8 h-8" src={Facebook} alt="Facebook" />
            <img className="w-8 h-8" src={Instagram} alt="Instagram" />
            <img className="w-8 h-8" src={Twitter} alt="Twitter" />
          </div>
        </div>

        {/* Login Form */}
        <div className="relative bg-white p-10 rounded-3xl shadow-lg w-[580px] z-10">
          <h2 className="text-green-600 text-3xl font-bold pt-8 mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="border w-full p-3 pr-10 rounded-lg text-gray-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <img src={EmailIcon} alt="Email Icon" className="absolute right-3 top-3 w-5 h-5" />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field with Toggle */}
            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={isHidden ? "password" : "text"}
                  placeholder="Enter your Password"
                  className="border w-full p-3 pr-10 rounded-lg text-gray-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsHidden(!isHidden)}
                  className="absolute right-3 top-3"
                >
                  <img
                    src={isHidden ? LockIcon : UnlockIcon}
                    alt="Toggle Password Visibility"
                    className="w-5 h-5"
                  />
                </button>
                <span className="absolute right-14 top-3 text-green-600 text-sm cursor-pointer">
                  <span className="border-r-2 border-gray-400 pr-2 mr-2"></span>
                  Forgot?
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Login Button */}
            <button type="submit" className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300">
              Login
            </button>

            {/* Redirect to Register */}
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