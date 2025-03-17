import React from "react";

const WithdrawSuccess = ({ withdrawAmount, closeModal }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-27  bg-white p-3 w-[390px] rounded-lg">
      <p className="text-gray-500 font-semibold text-center">
        <span className="text-green-600 font-bold">₦ {withdrawAmount || "0.00"} </span> 
        has been sent to your bank account!
      </p>
      <button
        className="font-semibold bg-green-700 text-white px-6 py-2 rounded-lg mt-4"
        onClick={closeModal}
      >
        Go Back
      </button>
    </div>
  );
};

export default WithdrawSuccess;
