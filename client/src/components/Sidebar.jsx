import React from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();
  return (
    <div className={`bg-[#818582]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? 'max-md:hidden' : ''}`}>
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <img src={assets.logo} alt="logo" className='max-w-40' />
          <div className="relative py-2 group">
            <img src={assets.menu_icon} alt="menu" className='max-h-5 cursor-pointer' />
            <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
              <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
              <hr className="my-2 border-t border-gray-500"/>
              <p className='cursor-pointer text-sm'>Logout</p>
            </div>

          </div>

        </div>

        <div className='bg-[#282142] rounded-2xl flex items-center gap-2 mt-5 px-3'>
          <img src={assets.search_icon} alt="Search"  className='w-3 '/>
          <input type="text" placeholder='Search' className='bg-transparent border-b border-gray-600 w-full py-2 px-3 focus:outline-none focus:border-gray-400' />
        </div>

      </div>
    </div>
  )
}

export default Sidebar
