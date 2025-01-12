"use client"

import React ,{useEffect, useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const LoginPage = () => {
    const router = useRouter()
  const [user, setUser] = useState({
    email : "",
    password : "",
  })
const [buttonDisabled, setbuttonDisabled] = useState(false)
const [loading, setloading] = useState(false)

const onLogin=async()=>{
    try {
        setloading(true)
       const response =  await axios.post("/api/users/login",user)
       console.log("Login success " ,response.data )
       alert("Thank you for Login.")
       router.push('/profile')

    } catch (error:any) {
        console.log("Login : ",error)
        toast.error(error.message)
    }
}

useEffect(()=>{
   if(user.email.length>0 && user.password.length >0 ){
    setbuttonDisabled(false)
   }else{
    setbuttonDisabled(true)
   }
},[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 via-cyan-900 to-teal-900 text-white py-6 px-4">
    <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-purple-500">
      {loading ? "Loading..." : "Login"}
    </h1>
    <div className="w-full max-w-sm space-y-6 bg-opacity-90 bg-cyan-950 bg-opacity-50 rounded-lg p-6 shadow-xl">
      <hr className="border-cyan-400 mb-4" />
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1 text-cyan-300">Email:</label>
        <input
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email"
          className="w-full px-4 py-2 rounded-md bg-teal-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="email"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1 text-cyan-300">Password:</label>
        <input
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
          className="w-full px-4 py-2 rounded-md bg-teal-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="password"
        />
      </div>
      <button
        disabled={buttonDisabled}
        onClick={onLogin}
        className={`w-full py-2 mt-4 rounded-md font-medium transition-transform ${
          buttonDisabled
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-teal-500 via-cyan-500 to-purple-500 hover:scale-105"
        }`}
      >
        {buttonDisabled ? "Fill the form" : "Login"}
      </button>
      <div className="text-center mt-4">
        <span>If you haven't signed up yet, </span>
        <Link href="/signup" className="text-purple-400 hover:underline">
          Sign-Up
        </Link>
      </div>
    </div>
  </div>
  
  )
}

export default LoginPage
