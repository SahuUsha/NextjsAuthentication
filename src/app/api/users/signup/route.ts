import { dbconnect } from "@/dbConnect/dbConnect";
import User from "@/models/userModel";

import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

dbconnect()

export async function POST(request : NextRequest ){
    try {
      const reqBody =await request.json() // sending promise

      const {username , email , password} = reqBody

      // validation 
      console.log('reqBody', reqBody)
       
    const user =   await User.findOne({email})
    // console.log(user)
    if(user){
        return NextResponse.json({
            error : 'User already exists'
        },
        {
            status: 400
        }
        )
    }

 
// const salt = await bcryptjs.genSalt(10) // 10 digit hardcode number
const hashedPassword = await bcryptjs.hash(password, 10)

console.log(hashedPassword)
    
 const newUser = new User({
    username :username,
    email:email,
    password : hashedPassword
})

const savedUser= await newUser.save()
console.log('savedUser', savedUser)

// send verification email
   const emailResponse =  await sendEmail({email,emailTypes : "VERIFY" ,userId : savedUser._id})
   console.log('emailResponse', emailResponse)
   return NextResponse.json({
    message : "User redistered successfully",
    success  : true,
    savedUser
   })
        
    } catch (err: any) {
        return NextResponse.json({
            error : "error here :"+err.message
        },
        {
            status: 500
        }

   )
        
    }
}