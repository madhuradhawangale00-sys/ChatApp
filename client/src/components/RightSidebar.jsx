import React from 'react'

const RightSidebar = ({selectedUser}) => {
  return selectedUser && (
    <div className={`bg-[#818582]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""} `}>
      <div>
        <img src= {selectedUser?.profilePic || assets.avatar_icon} alt="Profile Picture"
        className="w-16 h-16 rounded-full object-cover" />
        <h1 className="text-xl font-medium mx-auto flex items-center gap-2">
          <p className='w-2 h-2 rounded-full bg-green-500'></p>
          {selectedUser.fullName}</h1>
          <p className='px-10 mx-auto'>{selectedUser.bio}</p>
      </div>
    </div>
  )
}

export default RightSidebar
