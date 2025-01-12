'use client'

import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'

export default function ProfilePage (){
   const router = useRouter()

   const [data, setData] = useState("")
   
   const getUserDetails = async()=>{
      try {
       const res =  await axios.post("/api/users/me")
       console.log(res.data.data._id)
       setData(res.data.data._id)
       console.log("hello",data)
       toast.success("User details fetched successfully!")
 }catch (error:any) {
    console.log(error);
    toast.error("error : ",error.message)
}
   }
   

 const logOut =async()=>{
try {
    await axios.post('/api/users/logout')
    toast.success("logout success")
    router.push('/login')
    
} 
catch (error : any) {
    console.log(error.message)
}
   }

 
   useEffect(() => {
    if (data) {
      console.log("Fetched Data:", data)
    }
  }, [data]) 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white py-6 px-4">
  <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-lime-300 to-yellow-300">
    Welcome to Your Profile
  </h1>
  <h2 className="text-xl mb-4 text-gray-300">
    {
      
    data && data.length!=0 ? (
      <>
        View your detailed profile:{" "}
        <Link
          href={`/profile/${data}`}
          className="text-yellow-400 underline hover:text-yellow-300"
        >
          Click here
        </Link>
      </>
    ) : (
      "No profile data available , to get data click on User Details b"
    )}
  </h2>
  <hr className="w-3/4 border-t border-gray-400 mb-6" />
  <p className="text-center text-lg text-gray-200 mb-6">
  Your profile is your gateway to everything awesome. Stay updated!
  </p>
  <div className="flex flex-col space-y-4">
    <button
      className="w-48 py-2 px-4 rounded bg-lime-500 hover:bg-lime-600 font-semibold text-black transition-all duration-200 shadow-lg hover:scale-105"
      onClick={logOut}
    >
      Logout
    </button>
    <button
      className="w-48 py-2 px-4 rounded bg-teal-400 hover:bg-teal-500 font-semibold text-black transition-all duration-200 shadow-lg hover:scale-105"
      onClick={getUserDetails}
    >
      User Details
    </button>
  </div>
</div>

  )

}

