import { NextRequest } from "next/server";
import { connectToDatabase } from "@/config/DbConnect";

export async function PATCH(req:NextRequest){
  try{

    connectToDatabase()

    const {newPassword,oldPassword} = await req.json()

    console.warn(newPassword,oldPassword)
  }catch(err){
    console.log(err)
  }

}