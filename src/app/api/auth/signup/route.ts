import { connectToDatabase } from "@/config/DbConnect"
import { NextResponse } from "next/server"

export const POST  = async()=>{
  try{

    await connectToDatabase()
    return NextResponse.json({
      status:'connected successfully'
    },{status:200})
  }catch(err){
    console.log('Could not connect to database',err)
    return NextResponse.json({
      message: 'Failed to connect '
    },{
      status:500
    })
  }
  


}