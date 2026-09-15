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
    <div className={`bg-[#0e0924]/60 backdrop-blur-xl border-l border-gray-700/50 text-white w-full h-full flex flex-col justify-between p-5 overflow-y-auto ${selectedUser ? "max-md:hidden" : ""}`}>
      <div>
        {/* Profile Avatar & Info */}
        <div className="flex flex-col items-center pt-2">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt={selectedUser.fullName}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-600/50 shadow-md"
          />
          <div className="flex items-center justify-center gap-2 mt-3">
            {isOnline && (
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0"></span>
            )}
            <h1 className="text-base font-semibold text-white tracking-wide">
              {selectedUser.fullName}
            </h1>
          </div>
          <p className='text-xs text-gray-400 text-center mt-1 px-2 max-w-xs line-clamp-2'>
            {selectedUser.bio || "Hi there"}
          </p>
        </div>

        <hr className="border-gray-700/50 my-4" />

        {/* Media Section */}
        <div className="text-xs">
          <p className="font-semibold text-xs text-gray-200 mb-3">Media</p>
          {mediaImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
              {mediaImages.map((url, index) => (
                <div
                  key={index}
                  onClick={() => window.open(url, '_blank')}
                  className="cursor-pointer rounded-2xl overflow-hidden border border-gray-700/40 hover:scale-105 transition-all shadow-sm"
                >
                  <img
                    src={url}
                    alt={`Media ${index}`}
                    className="w-full h-24 object-cover rounded-2xl"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-6 text-xs">No media shared yet</p>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-4 mt-auto">
        <button 
          onClick={logout} 
          className='w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-xs font-semibold py-3 rounded-full cursor-pointer transition-all shadow-lg hover:shadow-purple-500/20 active:scale-95'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default RightSidebar

