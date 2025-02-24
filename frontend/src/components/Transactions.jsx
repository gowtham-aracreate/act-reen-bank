import React from 'react';
import ArrowrightTrans from '../assets/trans-arrow.svg';
import Pro from '../assets/pro.svg';
import Arrowright from '../assets/arrowright.svg';

const transactions = [
  { id: 1, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000 },
  { id: 2, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000 },
  { id: 3, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000 },
  { id: 4, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000 },
  { id: 5, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000 },
  { id: 6, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000 },
  { id: 7, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: -10000 },
  { id: 8, name: "Oluwaben Jamin", date: "06.Mar.2023 - 09:39", amount: 10000 }
];

const Transactions = () => {
  return (
    <div className='px-5 pl-18'>
      <div className='flex'>
        <h2 className='text-2xl font-bold'>Transactions</h2>
        <img className='pl-72' src={ArrowrightTrans} alt="Right Arrow Icon" />
      </div>

      <div className='pt-3 pb-6'>
        {transactions.map((transaction) => (
          <div key={transaction.id} className='pb-2'>
            {/* Transaction Row */}
            <div className='flex text-gray-400 justify-between py-1'>
              <p>{transaction.name}</p>
              <p>{transaction.date}</p>
              <p className={`font-bold ${transaction.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                {transaction.amount < 0
                  ? `- ₦${Math.abs(transaction.amount).toLocaleString()}`
                  : `+ ₦${transaction.amount.toLocaleString()}`
                }
              </p>
            </div>

            {/* Horizontal Line Below Each Transaction */}
            <hr className='border-gray-300 pt-1' />
          </div>
        ))}
      </div>

      {/* Upgrade To Pro */}
      <div className="relative">
       
        <img src={Pro} alt="Upgrade To Pro" className="w-full" />

        <div className="absolute top-0 left-0 z-10 p-6">
          <img src={Arrowright} alt="Arrow Left" className="mb-2" />
          <h2 className=" pt-9 text-3xl font-bold text-green-100">Upgrade to Pro</h2>
          <p className="text-xl text-green-200">Sign in on more than one device</p>
        </div>
      </div>
    </div>


  );
};

export default Transactions;
