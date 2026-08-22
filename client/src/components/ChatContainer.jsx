import React from 'react'
import assets from '../assets/assets'

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  return selectedUser ? (
    <div className='h-full flex flex-col justify-between bg-white/5 relative border-r border-gray-600/30 text-white'>
      {/* Top Header */}
      <div className='flex items-center justify-between px-4 py-3 border-b border-gray-600/30 bg-[#818582]/10 backdrop-blur-md'>
        <div className='flex items-center gap-3'>
          <img 
            src={selectedUser?.profilePic || assets.avatar_icon} 
            alt="profile" 
            className='w-10 h-10 rounded-full object-cover border border-gray-500' 
          />
          <div className='flex flex-col leading-tight'>
            <p className='font-semibold text-sm flex items-center gap-2'>
              {selectedUser?.fullName || 'User'}
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
            </p>
            <span className='text-xs text-gray-400'>Online</span>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <img 
            onClick={() => setSelectedUser(null)} 
            src={assets.arrow_icon} 
            alt="back" 
            className='md:hidden w-5 h-5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity' 
          />
          <img 
            src={assets.help_icon} 
            alt="help" 
            className='max-md:hidden w-5 h-5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity' 
          />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className='flex-1 p-4 overflow-y-auto flex flex-col items-center justify-center text-center gap-3 text-gray-400'>
        <img 
          src={selectedUser?.profilePic || assets.avatar_icon} 
          alt="profile" 
          className='w-20 h-20 rounded-full object-cover border-2 border-gray-500/50 shadow-lg' 
        />
        <h3 className='text-xl font-bold text-white'>{selectedUser?.fullName}</h3>
        <p className='text-sm text-gray-300 max-w-xs'>{selectedUser?.bio || "Hi Everyone, I am Using QuickChat"}</p>
      </div>

      {/* Message Input Bar */}
      <div className='p-3 border-t border-gray-600/30 bg-[#818582]/10 flex items-center gap-2'>
        <input 
          type="text" 
          placeholder="Send a message..." 
          className='flex-1 bg-transparent text-sm text-white px-4 py-2.5 rounded-full border border-gray-600/50 focus:outline-none focus:border-gray-400 placeholder-gray-400'
        />
        <button className='p-2 bg-indigo-600 hover:bg-indigo-500 rounded-full transition-colors flex justify-center items-center cursor-pointer'>
          <img src={assets.send_button} alt="send" className='w-4 h-4 invert' />
        </button>
      </div>
    </div>
  ) : (
    <div className='h-full flex flex-col items-center justify-center gap-3 text-gray-400 bg-white/5 max-md:hidden relative border-r border-gray-600/30'>
      <img src={assets.logo_icon} className='w-16 opacity-80' alt="logo" />
      <p className='text-base font-medium text-gray-300'>Select a user to start chatting</p>
    </div>
  )
}

export default ChatContainer


