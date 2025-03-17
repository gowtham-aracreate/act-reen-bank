import React from "react";

const FundSuccess = ({fundAmount, closeModal}) => {
  
    return (
      <div className="flex flex-col items-center justify-center pt-27 bg-white p-3 w-[390px]">
        <p className="text-gray-500 font-semibold"><span className="text-green-600 font-bold">₦ {fundAmount || "00,00,000"}</span> has been added to your wallet!</p>
        <button onClick={closeModal} className="font-semibold bg-green-700 text-white px-4 w-80 py-2 rounded-lg mt-4">Go Back</button>
      </div>
    );
  };
  
  export default FundSuccess;