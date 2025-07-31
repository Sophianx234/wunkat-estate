import { connectToDatabase } from "@/config/DbConnect";
import { getTokenFromRequest } from "@/lib/jwtConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
type updateInfoType = {
  name: string;
  email: string;
  password:string
};
export async function PATCH(req: NextRequest) {
  try{

    await connectToDatabase();
    const token = await getTokenFromRequest(req);
    if (!token || !token.userId) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }
  const { email, name} = await req.json();
  const updateInfo: Partial<updateInfoType> = {};

  if (email) updateInfo.email = email;
  if (name) updateInfo.name = name;
  console.log('updateInfo:',updateInfo)
  const user = await User.findByIdAndUpdate(token.userId,updateInfo,{
    new:true
  })
  if(!user) return NextResponse.json({msg:'update failed'},{status:400})
    
    
    return NextResponse.json({user},{
      status:200
    }) 
    
  }catch(err){
    return NextResponse.json({err},{
      status:500
    })
  }
}
