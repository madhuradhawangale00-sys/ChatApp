import React, { useContext } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const RightSidebar = ({ selectedUser }) => {
  const { logout, onlineUsers } = useContext(AuthContext)
  const { messages } = useContext(ChatContext)

  if (!selectedUser) return null

  const isOnline = onlineUsers?.includes(selectedUser._id)
  const mediaImages = messages ? messages.filter(m => m.image).map(m => m.image) : []

  return (
    <div className={`bg-[#818582]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""} `}>
      <div className="flex flex-col items-center p-4">
        <img
          src={selectedUser?.profilePic || assets.avatar_icon}
          alt="Profile Picture"
          className="w-16 h-16 rounded-full object-cover border border-gray-500"
        />
        <h1 className="text-xl font-medium mx-auto flex items-center gap-2 mt-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
          {selectedUser.fullName}
        </h1>
        <p className='px-6 mx-auto text-center text-sm text-gray-300 mt-1'>{selectedUser.bio || 'No bio available'}</p>
      </div>

      <hr className="border-[#ffffff50] my-4" />
      <div className="px-5 text-xs">
        <p className="font-medium text-white/80">Media</p>
        {mediaImages.length > 0 ? (
          <div className="mt-2 max-h-48 overflow-y-auto grid grid-cols-2 gap-3 opacity-80">
            {mediaImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url, '_blank')}
                className="cursor-pointer rounded-md overflow-hidden"
              >
                <img
                  src={url}
                  alt={`Media ${index}`}
                  className="w-full h-24 object-cover rounded-md hover:scale-105 transition-transform duration-200"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-4 text-xs">No media shared yet</p>
        )}
      </div>

      <button onClick={logout} className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer hover:opacity-90 transition-opacity'>
        Logout
      </button>
    </div>
  )
}

export default RightSidebar

