import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import RightSidebar from '../components/RightSidebar'
import ChatContainer from '../components/ChatContainer'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {
  const { selectedUser, setSelectedUser } = useContext(ChatContext);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  return (
    <div className='w-full h-screen sm:px-[10%] sm:py-[4%] flex items-center justify-center relative overflow-hidden bg-black/40'>
      {/* Background glowing circle like in QuickChat screenshot */}
      <div className='absolute w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>

      <div className={`backdrop-blur-2xl border border-gray-700/60 rounded-2xl 
          overflow-hidden h-full w-full grid grid-cols-1 relative z-10 ${
            selectedUser 
              ? (showRightSidebar ? 'md:grid-cols-[1.2fr_1.8fr_1fr]' : 'md:grid-cols-[1.2fr_2fr]') 
              : 'md:grid-cols-[1.2fr_2fr]'
          }`}> 
          <Sidebar />
          <ChatContainer 
            selectedUser={selectedUser} 
            setSelectedUser={setSelectedUser}
            showRightSidebar={showRightSidebar}
            setShowRightSidebar={setShowRightSidebar}
          />
          {showRightSidebar && (
            <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
          )}
      </div>
    </div>
  )
}

export default HomePage
