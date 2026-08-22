import React from 'react'
import assets from '../assets/assets'

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-xl border-2 border-gray-600 rounded-2xl'>
      <div className='flex flex-col items-center justify-center h-full text-gray-400 text-sm p-4'>
        <img 
          src={selectedUser?.profilePic || assets.profile_martin} 
          alt="profile" 
          className='w-20 aspect-square rounded-full object-cover' 
        />
        <p className='text-lg text-white flex items-center gap-2 mt-3 font-semibold'>
          {selectedUser?.fullName || 'User'}
          <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
        </p>
        <img 
          onClick={() => setSelectedUser(null)} 
          src={assets.arrow_icon} 
          alt="back arrow" 
          className='md:hidden w-5 mt-5 cursor-pointer' 
        />
        <img 
          src={assets.help_icon} 
          alt="help" 
          className='max-md:hidden w-5 mt-5 cursor-pointer' 
        />
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden h-full'>
      <img src={assets.logo_icon} className='max-w-16' alt="logo" />
      <p className='text-sm text-gray-400'>Select a user to start chatting</p>
    </div>
  )
}

export default ChatContainer

