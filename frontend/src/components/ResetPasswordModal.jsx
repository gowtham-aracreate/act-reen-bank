import React, { useState,useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import Close from "../assets/close.svg";
import LockIcon from "../assets/lock.svg";
import UnlockIcon from "../assets/unlock.svg";
import OtpComponent from "../components/OtpComponent";

const ResetPasswordModal = ({ modalStep, setModalStep, email}) => {
  // const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(""); // Error state
  const [enteredEmail, setEnteredEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  useEffect(() => {
    console.log("Email received in ResetPasswordModal:", email);
  }, [email]);

  const handleInputChange = (e) => {
    setEnteredEmail(e.target.value);
    console.log("User entered email:", e.target.value);
  };

  const [errors, setErrors] = useState({
    email: "",
    otp: "",
    confirmPassword: "",
  });

  // Function to handle close modal
  const handleCloseModal = () => {
    setModalStep(null);
  };

  // Function to check if the email exists before sending OTP
  // Send OTP API
  // const handleEmailSubmit = async (e) => {
  //   e.preventDefault();

  //   if (email !== profileEmail) {
  //     setError("Entered email does not match your profile email.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://localhost:3001/send-otp", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       alert("OTP sent successfully!");
  //       setModalStep(2); // Move to OTP step
  //       setError(""); // Clear any previous error
  //     } else {
  //       setErrors({ email: data.message});
  //     }
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //     setErrors("Failed to send OTP. Try again.");
  //   }
  // };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Comparing emails:");
    console.log("Stored Email:", email);
    console.log("Entered Email:", enteredEmail);
  
    if (enteredEmail !== email) {
      setError("Entered email does not match your profile email."); // ✅ Set error message
      return; // Stop further execution
    }
  
    try {
      const response = await fetch("http://localhost:3001/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: enteredEmail }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("OTP sent successfully!");
        setModalStep(2); // Move to OTP step
        setError(""); // Clear error when successful
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("❌ Failed to send OTP. Try again.");
    }
  };
  
  

  const handleVerify = () => {
    setModalStep(3); // Move to password reset step
  };

  // Reset Password API
  const handleChangePassword = async (e) => {
    e.preventDefault(); // Prevent page refresh

    setErrors({}); // Clear previous errors

    // Validate passwords
    if (password.length < 6) {
      setErrors({
        confirmPassword: "Password must be at least 6 characters long.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: password }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Password has been reset successfully!");
        setModalStep(4); // Move to success modal
      } else {
        setErrors({ confirmPassword: data.message });
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      setErrors({ confirmPassword: "Something went wrong. Try again." });
    }
  };

  if (!modalStep) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-10 rounded-3xl shadow-[0_11px_80px_rgba(90,297,94,0.5)] w-[580px] relative">
        {/* Close Button */}
        {/* <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
        >
          <img src={Close} alt="Close" className="w-5 h-5" />
        </button> */}

        {/* Step 1: Enter Email */}
        {modalStep === 1 && (
          <div>
            <h2 className="text-green-600 text-3xl font-bold mb-6">
              Reset Password
            </h2>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                placeholder="Enter your Email"
                className="border w-full p-3 rounded-lg"
                value={enteredEmail}
                // onChange={(e) => setEmail(e.target.value)}
                onChange={handleInputChange}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
              <button
                type="submit"
                className="bg-green-600 text-white w-full py-3 rounded-lg mt-4"
              >
                Reset Password
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {modalStep === 2 && (
          <OtpComponent
            title="Enter OTP"
            buttonText="Confirm"
            onVerify={handleVerify}
            onResendOtp={async () => {
              try {
                const response = await fetch("http://localhost:3001/send-otp", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                });

                const data = await response.json();
                if (response.ok) {
                  console.log("OTP resent successfully");
                } else {
                  console.error("Failed to resend OTP:", data.message);
                }
              } catch (error) {
                console.error("Error resending OTP:", error);
              }
            }}
            initialEmail={email}
            setOtp={setOtp} // Pass OTP state update function
          />
        )}

        {/* Step 3: Enter New Password */}
        {modalStep === 3 && (
          <div>
            <h2 className="text-green-600 text-3xl font-bold mb-6">
              Enter New Password
            </h2>
            <form onSubmit={handleChangePassword}>
              {/* State for password visibility */}
              <div className="relative">
                <h2 className="font-bold mb-2">New Password</h2>
                <input
                  type={isPasswordHidden ? "password" : "text"}
                  placeholder="Enter your Password"
                  className="border w-full p-3 rounded-lg pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                  className="absolute right-3 bottom-4"
                >
                  <img
                    src={isPasswordHidden ? LockIcon : UnlockIcon}
                    alt="Toggle Password Visibility"
                    className="w-5 h-5"
                  />
                </button>
              </div>

              {/* State for confirm password visibility */}
              <div className="relative mt-4">
              <h2 className="font-bold mb-2">Retype Password</h2>
                <input
                  type={isConfirmPasswordHidden ? "password" : "text"}
                  placeholder="Retype your Password"
                  className="border w-full p-3 rounded-lg pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setIsConfirmPasswordHidden(!isConfirmPasswordHidden)
                  }
                  className="absolute right-3 bottom-4"
                >
                  <img
                    src={isConfirmPasswordHidden ? LockIcon : UnlockIcon}
                    alt="Toggle Password Visibility"
                    className="w-5 h-5"
                  />
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.confirmPassword}
                </p>
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

        {/* Step 4: Success Message */}
        {modalStep === 4 && (
          <div className="pt-30">
            <h2 className="text-gray-500 text-2xl font-semibold mb-6">
            Your password has been changed!
            </h2>
            <button
              onClick={handleCloseModal}
              className="bg-green-600 text-white w-full py-3 rounded-lg mt-4"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordModal;
