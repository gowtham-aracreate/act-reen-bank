import React from "react";

const ProfileModal = ({ isOpen, onClose, step, setStep }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative shadow-xl">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900">
          ✖
        </button>

        {/* Modal Content Based on Step */}
        {step === "changeEmail" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Change Email</h2>
            <input type="email" placeholder="Enter new email" className="border p-2 w-full rounded-md" />
            <button onClick={() => setStep("otp")} className="bg-blue-500 text-white p-2 mt-3 w-full rounded-md">
              Send OTP
            </button>
          </div>
        )}

        {step === "otp" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
            <input type="text" placeholder="Enter OTP" className="border p-2 w-full rounded-md" />
            <button onClick={() => setStep("resetPassword")} className="bg-blue-500 text-white p-2 mt-3 w-full rounded-md">
              Verify OTP
            </button>
          </div>
        )}

        {step === "resetPassword" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            <input type="password" placeholder="New Password" className="border p-2 w-full mb-2 rounded-md" />
            <input type="password" placeholder="Confirm Password" className="border p-2 w-full rounded-md" />
            <button onClick={() => setStep("passwordSuccess")} className="bg-green-500 text-white p-2 mt-3 w-full rounded-md">
              Update Password
            </button>
          </div>
        )}

        {step === "passwordSuccess" && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-600">Success!</h2>
            <p>Your password has been updated successfully.</p>
            <button onClick={onClose} className="bg-gray-500 text-white p-2 mt-3 w-full rounded-md">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
