import React, { useState, useRef, useEffect } from 'react'
import assets, { messagesDummyData } from '../assets/assets'

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const [messages, setMessages] = useState(messagesDummyData)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, selectedUser])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage = {
      _id: Date.now().toString(),
      senderId: '680f50e4f10f3cd28382ecf9',
      receiverId: selectedUser?._id,
      text: input.trim(),
      seen: false,
      createdAt: new Date().toISOString()
    }

    setMessages((prev) => [...prev, newMessage])
    setInput('')
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    const newMessage = {
      _id: Date.now().toString(),
      senderId: '680f50e4f10f3cd28382ecf9',
      receiverId: selectedUser?._id,
      image: imageUrl,
      seen: false,
      createdAt: new Date().toISOString()
    }

    setMessages((prev) => [...prev, newMessage])
  }

  return selectedUser ? (
    <div className='h-full flex flex-col backdrop-blur-xl border-2 border-gray-600 rounded-2xl relative overflow-hidden bg-black/10'>
      {/* Top Header */}
      <div className='flex items-center justify-between px-4 py-3 border-b border-gray-600/50 bg-[#282142]/40 backdrop-blur-md z-10'>
        <div className='flex items-center gap-3'>
          <img
            onClick={() => setSelectedUser(null)}
            src={assets.arrow_icon}
            alt="back"
            className='md:hidden w-5 cursor-pointer hover:opacity-80 transition-opacity'
          />
          <div className='relative'>
            <img
              src={selectedUser?.profilePic || assets.avatar_icon}
              alt="profile"
              className='w-10 h-10 rounded-full object-cover border border-gray-500'
            />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 absolute bottom-0 right-0 border border-black"></span>
          </div>
          <div>
            <p className='text-white font-semibold text-sm flex items-center gap-2'>
              {selectedUser?.fullName || 'User'}
            </p>
            <p className='text-xs text-green-400 font-medium'>Online</p>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <img
            src={assets.help_icon}
            alt="help"
            className='w-5 cursor-pointer hover:opacity-80 transition-opacity'
          />
        </div>
      </div>

      {/* Messages Scroll Container */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4 text-sm text-gray-200'>
        {messages.map((msg, index) => {
          const isSender = msg.senderId === '680f50e4f10f3cd28382ecf9'
          return (
            <div
              key={msg._id || index}
              className={`flex items-end gap-2 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <img
                src={isSender ? assets.avatar_icon : (selectedUser?.profilePic || assets.avatar_icon)}
                alt="avatar"
                className='w-7 h-7 rounded-full object-cover border border-gray-600'
              />
              <div className={`max-w-[70%] flex flex-col ${isSender ? 'items-end' : 'items-start'}`}>
                {msg.image ? (
                  <img
                    src={msg.image}
                    alt="attachment"
                    className='max-w-xs rounded-xl border border-gray-600 object-cover shadow-md mb-1'
                  />
                ) : (
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      isSender
                        ? 'bg-[#818582]/40 text-white rounded-br-none border border-gray-500/30'
                        : 'bg-[#282142] text-gray-100 rounded-bl-none border border-gray-600/50'
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
                <span className='text-[10px] text-gray-400 mt-1 px-1'>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Message Input Bar */}
      <form onSubmit={handleSendMessage} className='p-3 border-t border-gray-600/50 bg-[#282142]/40 backdrop-blur-md flex items-center gap-2'>
        <input
          type="file"
          id="image-input"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
        <label htmlFor="image-input" className='cursor-pointer p-2 hover:bg-white/10 rounded-full transition-colors' title="Send image">
          <img src={assets.gallery_icon} alt="gallery" className='w-5 h-5 opacity-80 hover:opacity-100' />
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
          className='flex-1 bg-[#282142] text-white text-sm rounded-xl px-4 py-2.5 border border-gray-600/60 focus:outline-none focus:border-gray-400 placeholder-gray-400'
        />
        <button
          type="submit"
          className='p-2.5 bg-[#282142] hover:bg-[#342b54] text-white rounded-xl border border-gray-600/60 transition-colors flex items-center justify-center'
          title="Send message"
        >
          <img src={assets.send_button} alt="send" className='w-5 h-5' />
        </button>
      </form>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-3 text-gray-400 bg-white/10 max-md:hidden h-full p-6 text-center backdrop-blur-md border-2 border-gray-600 rounded-2xl'>
      <img src={assets.logo_icon} className='w-16 h-16 opacity-80' alt="logo" />
      <p className='text-base font-medium text-gray-300'>Chat Anytime,Anywhere</p>
      <p className='text-xs text-gray-400 max-w-xs'>Choose a contact from the sidebar list to view messages and start conversation.</p>
    </div>
  )
}

export default ChatContainer


