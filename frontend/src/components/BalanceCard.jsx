import React from 'react'

const BalanceCard = ({title, amount, isHidden}) => {
  return (
    <div className="bg-green-100 p-7 rounded-lg text-center shadow-md">
      <p className="text-indigo-900">{title}</p>
      <p className="text-xl font-bold">{isHidden ? "XXXXX" : `₦ ${amount.toLocaleString()}`}</p>
    </div>
  )
}

export default BalanceCard