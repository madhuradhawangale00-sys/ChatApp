import React, { useState, useRef, useEffect, useContext } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const ChatContainer = ({ selectedUser, setSelectedUser, showRightSidebar, setShowRightSidebar }) => {
  const { messages, getMessages, sendMessage } = useContext(ChatContext)
  const { authUser, onlineUsers } = useContext(AuthContext)
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault()
    if (!input.trim() || !selectedUser?._id || isSending) return

    try {
      setIsSending(true)
      const textToSend = input.trim()
      setInput('')
      await sendMessage({ text: textToSend })
    } catch (err) {
      toast.error("Failed to send message")
    } finally {
      setIsSending(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    const reader = new FileReader()
    reader.onloadend = async () => {
      try {
        setIsSending(true)
        await sendMessage({ image: reader.result })
      } catch (err) {
        toast.error("Failed to send image")
      } finally {
        setIsSending(false)
        e.target.value = ""
      }
    }
    reader.readAsDataURL(file)
  }

  const isOnline = onlineUsers?.includes(selectedUser?._id)

  return selectedUser ? (
    <div className='h-full flex flex-col bg-[#0b0718]/40 relative overflow-hidden'>
      {/* Top Header */}
      <div className='flex items-center justify-between px-5 py-3.5 border-b border-gray-700/50 bg-[#140e28]/60 backdrop-blur-md z-10'>
        <div className='flex items-center gap-3'>
          <img
            onClick={() => setSelectedUser(null)}
            src={assets.arrow_icon}
            alt="back"
            className='md:hidden w-5 cursor-pointer hover:opacity-80 transition-opacity'
          />
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt="profile"
            className='w-9 h-9 rounded-full object-cover border border-gray-600'
          />
          <div className='flex items-center gap-2'>
            <p className='text-white font-semibold text-sm'>
              {selectedUser?.fullName || 'User'}
            </p>
            {isOnline && (
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            )}
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <img
            onClick={() => setShowRightSidebar && setShowRightSidebar(prev => !prev)}
            src={assets.help_icon}
            alt="info"
            className='w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity opacity-70 hover:opacity-100'
            title="Toggle User Info"
          />
        </div>
      </div>

      {/* Messages Scroll Container */}
      <div className='flex-1 overflow-y-auto p-5 space-y-5 text-sm text-gray-200'>
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => {
            const isSender = msg.senderId === authUser?._id
            const timeFormatted = msg.createdAt
              ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : ''

            return (
              <div
                key={msg._id || index}
                className={`flex items-end gap-2.5 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <img
                  src={isSender ? (authUser?.profilePic || assets.avatar_icon) : (selectedUser?.profilePic || assets.avatar_icon)}
                  alt="avatar"
                  className='w-7 h-7 rounded-full object-cover border border-gray-600'
                />
                <div className={`max-w-[70%] flex flex-col ${isSender ? 'items-end' : 'items-start'}`}>
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="attachment"
                      className='max-w-xs rounded-2xl border border-gray-600 object-cover shadow-md mb-1'
                    />
                  )}
                  {msg.text && (
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md ${
                        isSender
                          ? 'bg-[#20183b] text-white rounded-br-none border border-purple-500/20'
                          : 'bg-[#20183b] text-white rounded-bl-none border border-gray-700/50'
                      }`}
                    >
                      {msg.text}
                    </div>
                  )}
                  {timeFormatted && (
                    <span className='text-[10px] text-gray-400 mt-1 px-1'>
                      {timeFormatted}
                    </span>
                  )}
                </div>
              </div>
            )
          })
        ) : (
          <div className='flex flex-col items-center justify-center h-full text-gray-400 gap-2'>
            <img src={assets.logo_icon} className='w-12 h-12 opacity-60' alt="logo" />
            <p className='text-sm text-gray-300'>No messages yet. Send a message to start conversation!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Message Input Bar */}
      <form onSubmit={handleSendMessage} className='p-4 border-t border-gray-700/50 bg-[#140e28]/60 backdrop-blur-md flex items-center gap-3'>
        <div className='flex-1 bg-[#1a142e] border border-gray-700/50 rounded-full px-4 py-2.5 flex items-center gap-2'>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
            className='flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-gray-400'
          />
          <input
            type="file"
            id="image-input"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
          <label htmlFor="image-input" className='cursor-pointer p-1 hover:opacity-80 transition-opacity' title="Send image">
            <img src={assets.gallery_icon} alt="gallery" className='w-5 h-5 opacity-70 hover:opacity-100' />
          </label>
        </div>
        <button
          type="submit"
          disabled={isSending}
          className='w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer disabled:opacity-50 shrink-0'
          title="Send message"
        >
          <img src={assets.send_button} alt="send" className='w-4 h-4' />
        </button>
      </form>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-3 text-gray-400 bg-[#0b0718]/40 max-md:hidden h-full p-6 text-center backdrop-blur-md'>
      <img src={assets.logo_icon} className='w-16 h-16 opacity-80' alt="logo" />
      <p className='text-base font-medium text-gray-300'>Chat Anytime, Anywhere</p>
      <p className='text-xs text-gray-400 max-w-xs'>Choose a contact from the sidebar list to view messages and start conversation.</p>
    </div>
  )
}

export default ChatContainer


