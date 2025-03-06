import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/leftsection";
import UserIcon from "../assets/user.svg";
import EmailIcon from "../assets/envelope.svg";
import Lock from "../assets/lock.svg";
import Unlock from "../assets/unlock.svg";


const Register = () => {
  const [isHidden, setIsHidden] = useState(true);
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({ email: "", password: "" });


  // const fetchApi = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:3001/get_user");
  //     setUsers(Array.isArray(res.data) ? res.data : []);
  //   } catch (error) {
  //     console.error("Error fetching user data", error);
  //     setUsers([]);
  //   }
  // };

  // useEffect(() => {
  //   fetchApi();
  // }, []);


  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };


  const handleRegister = async (e) => {
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
      try {
        const userData = { username, email, password };
        const res = await axios.post("http://localhost:3001/register", userData);
        // console.log(first)
        
        localStorage.setItem('user_id', res.data.user_id);//when we register the user we will get the user_id and we will store it in the local storage

        // fetchApi();
        // setUsers(Array.isArray(res.data) ? res.data : []);

        console.log(res.data);
        navigate("/verify-email");
      } catch (error) {
        console.error("Registration error:", error);
        if(error.response){
          const {data} = error.response;
          if(data.message == "Email already exists"){
            setErrors({...errors, email: "Email already exists"});
          }
        }
      }
    }
  };

  return (
    <Layout>
      <div className="relative bg-white p-10 rounded-3xl shadow-lg w-[590px] z-10">
        <h2 className="text-green-600 text-3xl font-bold mb-6">Register</h2>
        <form onSubmit={handleRegister}>

          {/* Name Input */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <div className="relative">
              <input type="text" placeholder="Enter name here" value={username} onChange={(e) => setUserName(e.target.value)} className="border w-full p-3 pr-10 rounded-lg text-gray-700" required />
              <img src={UserIcon} alt="User Icon" className="absolute right-3 top-3 w-5 h-5" />
            </div>
          </div>


          {/* Email Input */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <div className="relative">
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="border w-full p-3 pr-10 rounded-lg text-gray-700" required />
              <img src={EmailIcon} alt="Email Icon" className="absolute right-3 top-3 w-5 h-5" />
            </div>

            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>


          {/* Password Input */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Password</label>

            <div className="relative flex items-center">
              <input type={isHidden ? "password" : "text"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="border w-full p-3 pr-12 rounded-lg text-gray-700" required />
              <button type="button" onClick={() => setIsHidden(!isHidden)} className="absolute right-3 top-3 w-5 h-5">
                <img src={isHidden ? Lock : Unlock} alt="Toggle Password Visibility" className="w-5 h-5" />
              </button>
            </div>

            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>


          {/* Terms & Conditions Checkbox */}
          <div className="flex items-center mb-8">
            <input type="checkbox" className="mr-2" required />
            <span className="text-sm">
              I agree to all the
              <span className="text-green-600 cursor-pointer"> Terms, Privacy Policy</span> and
              <span className="text-green-600 cursor-pointer"> Fees</span>.
            </span>
          </div>


          {/* Register Button */}
          <button type="submit" className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300">Register</button>


          {/* Login Redirect */}
          <p className="text-sm mt-4">
            Already have an Account?
            <span onClick={() => navigate("/login")} className="text-green-600 cursor-pointer font-medium">{" "}Log in.</span>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;






//npm install --save react-otp-input