import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/leftsection";
import UserIcon from "../assets/user.svg";
import EmailIcon from "../assets/envelope.svg";
import Lock from "../assets/lock.svg";
import Unlock from "../assets/unlock.svg";

const Register = () => {
  const [isHidden, setIsHidden] = useState(true);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    let newErrors = { email: "", password: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      navigate("/verify-email");
    }
  };

  return (
    <Layout>
      <div className="relative bg-white p-10 rounded-3xl shadow-lg w-[590px] z-10">
        <h2 className="text-green-600 text-3xl font-bold mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <div className="relative">
              <input type="text" placeholder="Enter name here" className="border w-full p-3 pr-10 rounded-lg text-gray-700"required/>
              <img src={UserIcon} alt="User Icon" className="absolute right-3 top-3 w-5 h-5"/>
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <div className="relative">
              <input type="email" placeholder="Enter your email" className="border w-full p-3 pr-10 rounded-lg text-gray-700" value={email} onChange={(e) => setEmail(e.target.value)} required/>
              <img src={EmailIcon} alt="Email Icon" className="absolute right-3 top-3 w-5 h-5"/>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <input type={isHidden ? "password" : "text"} // Toggle between "password" and "text"
                placeholder="Enter your password" className="border w-full p-3 pr-12 rounded-lg text-gray-700" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              {/* Toggle Button */}
              <button type="button" onClick={() => setIsHidden(!isHidden)} // Toggle visibility
                className="absolute right-3 top-3 w-5 h-5">
                <img src={isHidden ? Lock : Unlock} // Show lock/unlock icon
                  alt="Toggle Password Visibility" className="w-5 h-5"/>
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center mb-8">
            <input type="checkbox" className="mr-2" required />
            <span className="text-sm">
              I agree to all the
              <span className="text-green-600 cursor-pointer">
                {" "}
                Terms, Privacy Policy
              </span>{" "}
              and
              <span className="text-green-600 cursor-pointer"> Fees</span>.
            </span>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition duration-300"
          >
            Register
          </button>

          <p className="text-sm mt-4">
            Already have an Account?
            <span onClick={() => navigate("/login")} className="text-green-600 cursor-pointer font-medium">
              {" "}
              Log in.
            </span>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
