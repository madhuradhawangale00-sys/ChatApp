import React, { useState } from 'react'
import assets from '../assets/assets'

const LoginPage = () => {

  const [currentState, setCurrentState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (currentState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true)
    } else {
      console.log({ currentState, fullName, email, password, bio })
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl px-4'>
      {/* left */}
      <img src={assets.logo_big} alt="Logo" className='w-[min(30vw,250px)]'/>

      {/* right */}
      <form onSubmit={onSubmitHandler} className='border border-gray-600 bg-black/30 text-white p-6 flex flex-col gap-5 rounded-xl shadow-2xl w-full max-w-sm backdrop-blur-md'> 
        <h2 className='font-semibold text-2xl flex justify-between items-center capitalize'>
          {currentState}
          {isDataSubmitted && (
            <img 
              onClick={() => setIsDataSubmitted(false)} 
              src={assets.arrow_icon} 
              alt="Back" 
              className='w-5 cursor-pointer hover:opacity-80' 
            />
          )}
        </h2>

        {/* Full Name: Shown in Sign up step 1 */}
        {currentState === "Sign up" && !isDataSubmitted && (
          <input 
            onChange={(e) => setFullName(e.target.value)} 
            value={fullName}
            type="text" 
            placeholder='Full Name' 
            className='p-3 border border-gray-600 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500' 
            required
          />
        )}

        {/* Email & Password: Shown in Sign In OR Sign up step 1 */}
        {!isDataSubmitted && (
          <>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              type="email" 
              placeholder='Email Address' 
              className='p-3 border border-gray-600 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500' 
              required 
            />
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
              type="password" 
              placeholder='Password' 
              className='p-3 border border-gray-600 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500' 
              required 
            />
          </>
        )}

        {/* Bio textarea: Shown in Sign up step 2 */}
        {currentState === "Sign up" && isDataSubmitted && (
          <textarea 
            onChange={(e) => setBio(e.target.value)} 
            value={bio}
            rows={4} 
            className='p-3 border border-gray-600 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500'
            placeholder='Tell us about yourself...'
            required
          ></textarea>
        )}

        <button type='submit' className='bg-linear-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium py-3 rounded-md transition-all duration-300 cursor-pointer mt-1'>
          {currentState === "Sign up" ? (isDataSubmitted ? "Finish Setup" : "Create Account") : "Login Now"}
        </button>

        <div className='flex items-center gap-2 text-xs text-gray-400'>
          <input type="checkbox" id="terms" required className='cursor-pointer accent-indigo-500' />
          <label htmlFor="terms" className='cursor-pointer'>Agree to the terms of use & privacy policy.</label>
        </div>

        <div className='text-xs text-gray-400 text-center mt-1'>
          {currentState === "Sign up" ? (
            <p>Already have an account? <span onClick={() => { setCurrentState("Sign In"); setIsDataSubmitted(false); }} className='text-indigo-400 underline cursor-pointer font-medium'>Login here</span></p>
          ) : (
            <p>Don't have an account? <span onClick={() => { setCurrentState("Sign up"); setIsDataSubmitted(false); }} className='text-indigo-400 underline cursor-pointer font-medium'>Click here</span></p>
          )}
        </div>

      </form>
    </div>
  )
}

export default LoginPage
