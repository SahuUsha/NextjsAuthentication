import { verify } from "crypto";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type: String,
        required: [true,"Please provide a username"],
        unique: true
    },
    email :{
        type: String,
        required: [true,"Please provide a email"],
        unique: true
    },
    password:{
        type: String,
        required: [true,"Please provide a password"],
     
    },
    isVerified:{
        type: Boolean,
        default: false,
    } ,
    isAdmin : {
        type: Boolean,
        default :false 
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
    verifyToken: String,
    verifyTokenExpire: Date,

})

// nextjs work on edge if model is already created then it will not create again otherwise it will create
const User = mongoose.models.users || mongoose.model("users",userSchema)


export default User