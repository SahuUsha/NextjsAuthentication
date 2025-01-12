import { dbconnect } from "@/dbConnect/dbConnect";
import User from "@/models/userModel";

import {NextRequest,NextResponse} from 'next/server'


dbconnect() 

export async function POST(request  : NextRequest) {
    try {
        
        const response =NextResponse.json({
            message : "Logout Successfully",
            success : true
        })

        response.cookies.set("token" , "" , {
            httpOnly : true,
            expires : new Date(0)
        } ) 

        return response
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status:500}
        )
    }
    
}