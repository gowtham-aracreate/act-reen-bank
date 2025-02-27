import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/leftsection";
import UserIcon from "../assets/user.svg";
import EmailIcon from "../assets/envelope.svg";
import PasswordIcon from "../assets/lock.svg";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format. Please enter a valid email address.");
      return;
    }

    // Password Validation

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    alert(
      "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
    );
    return;
  }

    // Navigate to the verify email page
    navigate("/verify-email");
  };

  return (
    <Layout>
      <div className="relative bg-white p-10 rounded-3xl shadow-lg w-[590px] z-10">
        <h2 className="text-green-600 text-3xl font-bold mb-6">Register</h2>
        <form onSubmit={handleRegister}>

          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <div className="relative">
              <input type="text" placeholder="Enter name here" className="border w-full p-3 pr-10 rounded-lg text-gray-700" required />
              <img src={UserIcon} alt="User Icon" className="absolute right-3 top-3 w-5 h-5" />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <div className="relative">
              <input type="email" placeholder="Enter your email" className="border w-full p-3 pr-10 rounded-lg text-gray-700" required />
              <img src={EmailIcon} alt="Email Icon" className="absolute right-3 top-3 w-5 h-5" />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <div className="relative">
              <input type="password" placeholder="Enter your password" className="border w-full p-3 pr-10 rounded-lg text-gray-700" required />
              <img src={PasswordIcon} alt="Password Icon" className="absolute right-3 top-3 w-5 h-5" />
            </div>
          </div>

          <div className="flex items-center mb-8">
            <input type="checkbox" className="mr-2" required />
            <span className="text-sm">I agree to all the
              <span className="text-green-600 cursor-pointer"> Terms, Privacy Policy</span> and
              <span className="text-green-600 cursor-pointer"> Fees</span>.
            </span>
          </div>

          <button type="submit" className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition duration-300" >Register</button>

          <p className="text-sm mt-4">Already have an Account?
            <span className="text-green-600 cursor-pointer font-medium"> Log in.</span>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
