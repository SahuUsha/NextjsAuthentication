import { dbconnect } from "@/dbConnect/dbConnect";
import User from "@/models/userModel";
import { error } from "console";
import {NextRequest,NextResponse} from 'next/server'

dbconnect()

export async function POST(request : NextRequest) {
    try {
        const reqBody = await request.json()

        const{token} = reqBody;
        console.log(token)

        const user = await User.findOne({verifyToken:token,
            verifyTokenExpire: {$gt: Date.now()}  // if date is greater than now date 

        })

        if(!user){
            return NextResponse.json({error : "Invalid token"} ,
                 {status : 400})
        }

        
        user.isVerified =  true
        user.verifyToken = undefined
        user.verifyTokenExpire  =  undefined
        
        
        await  user.save()
        
        console.log(user)
        return NextResponse.json({
            message : "Email verified successfully"
        },{
            status : 200
        })
    } catch (error : any) {
        return NextResponse.json({
            error : error.message
        },
        {
            status: 500
        }
    );
    }
    
}