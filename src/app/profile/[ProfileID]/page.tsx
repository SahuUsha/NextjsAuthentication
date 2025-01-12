

// dynamic routes

import React from 'react'

export default function ProfileId({params} : any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-teal-700 text-white py-6 px-4">
    <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-indigo-300 to-purple-500">
      Profile Page
    </h1>
    <h2 className="p-4 bg-indigo-300 rounded-lg text-black text-xl font-semibold shadow-md">
      User ID: {params.ProfileID}
    </h2>
  </div>
  )
}


