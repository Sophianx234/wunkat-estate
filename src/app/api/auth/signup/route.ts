import { connectToDatabase } from "@/config/DbConnect"
import User from "@/models/User"
import { NextResponse } from "next/server"

export const POST  = async(req:NextResponse)=>{
  try{

    await connectToDatabase()
    const body = await req.json()
    const {name,password, email} = body
    const newUser = await User.insertOne({name,password,email})
    return NextResponse.json({
      status:'success',
      newUser
    },{
      status: 200
    })

  }catch(err){
    console.log(err)

  }
    
  


}