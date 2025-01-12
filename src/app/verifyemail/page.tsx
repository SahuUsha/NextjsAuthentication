'use client'

import React,{useEffect, useState} from 'react'
import axios from 'axios'
// import { useRouter } from 'next/router'
import Link from 'next/link'

export default function VerifyEmail(){
   const [token, settoken] = useState("")
   const [verified, setverified] = useState(false)
   const [error, setError] = useState(false)

   // by using nextjs
//    const router = useRouter()

   const verifyUserEmail = async()=>{
   try {
     
         await axios.post("/api/users/verifyemail",{token})
         setverified(true)
         setError(false)
   } catch (error:any) {
    setError(error)
    console.log(error.response.data)
   }

   }

useEffect(()=>{
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    settoken(urlToken|| "");

// by using nextjs
//     const {query} = router;
//    const urlToken1 = query.token

},[])

useEffect(()=>{

    if(token.length>0){
        verifyUserEmail()
    }

},[token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
     <h1 className='text-4xl'>Verify Email</h1>
     <h2 className='p-2 bg-orange-500 text-black'>
        {
            token?`${token}`:"No token"
        }
     </h2>
     {
        verified && (
            <div>
                <h2>Verified</h2>
                 <Link href="/login">Login</Link>
            </div>
        )
     }
      {
        error && (
            <div>
                 <Link href="/login">Error</Link>
            </div>
        )
     }

      
    </div>
  )
}


