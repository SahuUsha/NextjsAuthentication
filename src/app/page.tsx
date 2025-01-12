import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-700 via-purple-800 to-pink-700 text-white py-12 px-6 sm:px-20 gap-8 font-sans">
    <h1 className="text-6xl font-bold  bg-clip-text ">
      Hello 👋,
    </h1>
    <h2 className="text-4xl font-medium text-center text-gray-200">
      Welcome to my Authentication Page
    </h2>
    <p className="text-lg text-center text-gray-300 max-w-2xl">
      Sign in securely and explore a seamless experience tailored just for you. Whether you’re here for the first time or returning, we’re glad to have you!
    </p>
    <button onClick={()=>alert("It will update soon")} className="mt-6 px-8 py-3 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 rounded-lg text-lg font-semibold text-white shadow-md hover:scale-105 transition-transform">
      Get Started
    </button>
  </div>
  
  )
}
