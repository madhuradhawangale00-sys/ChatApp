import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'

const ProfilePage = () => {

  const [selectedImg, setselectedImg] = useState(null)
  const navigate = useNavigate()
  const [name, setName] = useState("Martin Johnson")
  const [bio, setBio] = useState("Hi Everyone, I am using QuickChat")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ name, bio, selectedImg })
    navigate('/')
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center px-4'>
      <div className='w-full max-w-2xl bg-black/40 backdrop-blur-2xl text-gray-200 border border-gray-600 rounded-2xl p-8 shadow-2xl flex items-center justify-between gap-8 max-sm:flex-col-reverse'>
        
        <form onSubmit={handleSubmit} className='flex flex-col w-full gap-5'>
          <h3 className="text-2xl font-semibold text-white">Profile Details</h3>
          
          <label htmlFor="avatar" className='flex items-center gap-4 cursor-pointer group'>
            <input 
              onChange={(e) => e.target.files && e.target.files[0] && setselectedImg(e.target.files[0])} 
              type="file" 
              id='avatar' 
              accept='.png, .jpg, .jpeg' 
              hidden 
            />
            <img 
              src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} 
              alt="Profile Avatar" 
              className='w-16 h-16 rounded-full object-cover border-2 border-indigo-500 group-hover:opacity-80 transition-opacity' 
            />
            <span className='text-sm text-gray-300 group-hover:text-indigo-400 transition-colors font-medium'>
              Upload profile image
            </span>
          </label>

          <input 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            type="text" 
            placeholder="Your Name" 
            required 
            className="p-3 border border-gray-600 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500" 
          />

          <textarea 
            onChange={(e) => setBio(e.target.value)} 
            value={bio} 
            placeholder="Write profile bio" 
            required 
            rows={3} 
            className="p-3 border border-gray-600 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 resize-none"
          ></textarea>

          <button 
            type="submit" 
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium py-3 rounded-md transition-all duration-300 cursor-pointer mt-2"
          >
            Save Profile
          </button>
        </form>

        <div className='flex flex-col items-center justify-center p-4 min-w-40'>
          <img 
            src={selectedImg ? URL.createObjectURL(selectedImg) : assets.logo_icon} 
            alt="Logo / Preview" 
            className={`object-cover ${selectedImg ? 'w-36 h-36 rounded-full border-4 border-indigo-500/50 shadow-lg' : 'w-40 h-auto opacity-80'}`} 
          />
        </div>

      </div>
    </div>
  )
}

export default ProfilePage

