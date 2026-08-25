import React from 'react'
import { useNavigate } from 'react-router-dom'
import assets,{userDummyData} from '../assets/assets'

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
              <p onClick={() => navigate('/login')} className='cursor-pointer text-sm'>Logout</p>
            </div>

          </div>

        </div>

        <div className='bg-[#282142] rounded-2xl flex items-center gap-2 mt-5 px-3'>
          <img src={assets.search_icon} alt="Search"  className='w-3 '/>
          <input type="text" placeholder='Search' className='bg-transparent border-b border-gray-600 w-full py-2 px-3 focus:outline-none focus:border-gray-400' />
        </div>

      </div>

      <div className='flex flex-col gap-3 mt-4'>
        {userDummyData.map((user, index)=>
          <div 
            key={index} 
            className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer relative transition-all ${selectedUser?._id === user._id || selectedUser === user ? 'bg-[#282142]' : 'hover:bg-[#282142]/50'}`} 
            onClick={() => setSelectedUser(user)}
          >
            <img src={user?.profilePic || assets.avatar_icon} alt="" className='w-9.5 aspect-square rounded-full object-cover' />
            <div className='flex flex-col leading-5'>
              <p className='font-semibold text-sm'>{user.fullName}</p>
              {
                index < 3 
                ? <span className='text-green-400 text-xs'>Online</span>
                : <span className='text-gray-400 text-xs'>Offline</span>
              }
              <p className='text-xs text-gray-400 truncate max-w-37.5'>{user.bio || user.status}</p>
            </div>
            {index > 2 && (
              <p className='absolute right-3 top-1/2 -translate-y-1/2 text-xs h-5 w-5 flex justify-center items-center bg-red-500 text-white rounded-full font-medium'>
                {index}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
