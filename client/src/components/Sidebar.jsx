import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext);
  const navigate = useNavigate();
  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState('');

  const filterdUsers = input
    ? (users || []).filter((user) => user?.fullName?.toLowerCase().includes(input.toLowerCase()))
    : (users || []);

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setUnseenMessages((prev) => ({
      ...prev,
      [user._id]: 0
    }));
  };

  return (
    <div className={`bg-[#0f0a21]/60 h-full p-4 flex flex-col border-r border-gray-700/50 text-white ${selectedUser ? 'max-md:hidden' : ''}`}>
      <div className='pb-4 border-b border-gray-700/40'>
        <div className='flex justify-between items-center px-1'>
          <div className='flex items-center gap-2.5'>
            <img src={assets.logo_icon} alt="QuickChat" className='w-7 h-7' />
            <span className='font-bold text-lg text-white tracking-wide'>QuickChat</span>
          </div>
          <div className="relative py-2 group">
            <img src={assets.menu_icon} alt="menu" className='h-4 cursor-pointer opacity-70 hover:opacity-100' />
            <div className='absolute top-full right-0 z-30 w-36 p-4 rounded-xl bg-[#1a142e] border border-gray-600/80 text-gray-100 hidden group-hover:block shadow-2xl'>
              <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm hover:text-purple-400 transition-colors'>Edit Profile</p>
              <hr className="my-2 border-t border-gray-700"/>
              <p onClick={logout} className='cursor-pointer text-sm hover:text-red-400 transition-colors'>Logout</p>
            </div>
          </div>
        </div>

        {/* Search bar capsule */}
        <div className='bg-[#1a142e] rounded-full flex items-center gap-2.5 mt-4 px-4 py-2.5 border border-gray-700/50 shadow-inner'>
          <img src={assets.search_icon} alt="Search" className='w-3.5 h-3.5 opacity-60' />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder='Search User...'
            className='bg-transparent text-xs text-white placeholder-gray-400 w-full focus:outline-none'
          />
        </div>
      </div>

      <div className='flex flex-col gap-2 mt-4 overflow-y-auto flex-1 pr-1'>
        {filterdUsers.map((user, index) => {
          const isSelected = selectedUser?._id === user._id || selectedUser === user;
          const isOnline = onlineUsers?.includes(user._id);
          const unreadCount = unseenMessages?.[user._id];

          return (
            <div
              key={user._id || index}
              className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer relative transition-all ${
                isSelected ? 'bg-[#1a142e] border border-gray-700/60 shadow-md' : 'hover:bg-[#1a142e]/40'
              }`}
              onClick={() => handleUserClick(user)}
            >
              <div className='relative shrink-0'>
                <img
                  src={user?.profilePic || assets.avatar_icon}
                  alt={user.fullName}
                  className='w-10 h-10 rounded-full object-cover border border-gray-600'
                />
                {isOnline && (
                  <span className='w-2.5 h-2.5 rounded-full bg-green-500 absolute bottom-0 right-0 border border-black'></span>
                )}
              </div>
              <div className='flex flex-col leading-tight min-w-0 flex-1'>
                <p className='font-semibold text-sm text-white truncate'>{user.fullName}</p>
                <span className={`text-xs font-medium ${isOnline ? 'text-green-400' : 'text-gray-400'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              {unreadCount > 0 && (
                <p className='text-xs h-5 min-w-5 px-1.5 flex justify-center items-center bg-purple-600 text-white rounded-full font-semibold shadow-sm'>
                  {unreadCount}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
