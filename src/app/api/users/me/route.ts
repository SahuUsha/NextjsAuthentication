import { dbconnect } from "@/dbConnect/dbConnect";
import User from "@/models/userModel";
import {NextRequest,NextResponse} from 'next/server'
import { getDataFromToken } from "@/helpers/getDataFromToken";


dbconnect()


export async function POST(request:NextRequest) {
    // extract data from token

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");

        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message}, 
            {status: 400},
        );
    }

}