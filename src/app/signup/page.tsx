"use client"

import React ,{useEffect, useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SignUpPage = () => {
    const router = useRouter()
  const [user, setUser] = useState({
    email : "",
    password : "",
    username : ""
  })
const [buttonDisabled, setbuttonDisabled] = useState(false)
const [loading, setloading] = useState(false)

const onSignUp =async()=>{
    try {
        setloading(true)
       const response =  await axios.post("/api/users/signup",user)
       console.log("SignUp success " ,response.data )
       toast.success("Thank you for signUp.")
       router.push('/login')

    } catch (error:any) {
        console.log("SignUp : ",error)
        toast.error(error.message)
    }
}

useEffect(()=>{
   if(user.email.length>0 && user.password.length >0 && user.username.length>0){
    setbuttonDisabled(false)
   }else{
    setbuttonDisabled(true)
   }
},[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-900 via-purple-900 to-cyan-900 text-white py-6 px-4">
    <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500">
      {loading ? "Loading..." : "Signup"}
    </h1>
    <div className="w-full max-w-sm space-y-6 bg-opacity-80 bg-teal-950 bg-opacity-60 rounded-lg p-6 shadow-lg">
      <hr className="border-teal-500 mb-4" />
      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-1 text-teal-300">Username:</label>
        <input
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter username"
          className="w-full px-4 py-2 rounded-md bg-teal-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          type="text"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1 text-teal-300">Email:</label>
        <input
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email"
          className="w-full px-4 py-2 rounded-md bg-teal-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          type="email"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1 text-teal-300">Password:</label>
        <input
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
          className="w-full px-4 py-2 rounded-md bg-teal-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          type="password"
        />
      </div>
      <button
        disabled={buttonDisabled}
        onClick={onSignUp}
        className={`w-full py-2 mt-4 rounded-md font-medium transition-transform ${
          buttonDisabled
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-500 via-teal-500 to-cyan-500 hover:scale-105"
        }`}
      >
        {buttonDisabled ? "Fill the form" : "Signup"}
      </button>
      <div className="text-center mt-4">
        <span>Already signed up? </span>
        <Link href="/login" className="text-cyan-400 hover:underline">
          Login
        </Link>
      </div>
    </div>
  </div>
  
  
  )
}

export default SignUpPage
