import React, { useState, useEffect } from 'react'
import User from '../assets/userimg.svg'
import Search from '../assets/search.svg'
import Notification from '../assets/notification.svg'

const Header = () => {
  const [username, setUserName] = useState('');
  const [accno , setAccNo] = useState('');
  
  useEffect(() =>{
    //Retrieve user details from local storage
    const StoredUsername = localStorage.getItem('username');
    const StoredAccno = localStorage.getItem('acc_no');
    setUserName(StoredUsername);
    setAccNo(StoredAccno);
  });
  return (
        <div className='pt-7' >
          <div className='flex justify-between items-center px-10 pr-20'>
            <div><h2 className="text-3xl font-semibold">Overview</h2></div>
            <div className='flex items-centre gap-10'>
              <div className='pr-15 text-right'>
                <p className='text-xl font-bold text-green-600'>{username}</p>
                <p className='text-3xl font-bold'>{accno}</p>
              </div>

              <div className='flex items-center gap-70'>
                <div className='flex items-center gap-2'>
                  <img src={Search} alt="Search Icon" />
                  <p className='text-sm text-gray-500 '>Search</p>
                </div>

                <div className='flex items-center gap-10'>
                  <img src={Notification} alt="Notification Icon" />
                  <img src={User} alt="User Img" />
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Header