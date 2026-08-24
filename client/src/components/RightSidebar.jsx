import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightSidebar = ({ selectedUser }) => {
  return selectedUser && (
    <div className={`bg-[#818582]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""} `}>
      <div className="flex flex-col items-center p-4">
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="Profile Picture"
          className="w-16 h-16 rounded-full object-cover" />
        <h1 className="text-xl font-medium mx-auto flex items-center gap-2 mt-2">
          <p className='w-2 h-2 rounded-full bg-green-500'></p>
          {selectedUser.fullName}</h1>
        <p className='px-10 mx-auto text-center text-sm text-gray-300 mt-1'>{selectedUser.bio}</p>
      </div>

      <hr className="border-[#ffffff50] my-4" />
      <div className="px-5 text-xs">
        <p className="font-medium text-white/80">Media</p>
        <div className="mt-2 max-h-48 overflow-y-auto grid grid-cols-2 gap-3 opacity-80">
          {imagesDummyData.map((url, index) => (
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
      </div>

      <button className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer hover:opacity-90 transition-opacity'>
        Logout
      </button>

    </div>
  )
}

export default RightSidebar

