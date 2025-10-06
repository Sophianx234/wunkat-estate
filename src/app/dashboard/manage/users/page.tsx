'use client'
import { useState } from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import TeamMembersCard from "../../_components/TeamMembersCard";
import UserCard from "../../_components/UserCard";
import UserFilter from "../../_components/UserFilter";

export default function Page() {
  const [showTeamMembers, setShowTeamMembers] = useState(false);
  return (
    <div className="mx-4 ">
      <>

      <div className="my-4 mb-5">

      <UserFilter />
      </div>

      
      <div className="grid grid-cols-4 gap-4">

<UserCard
  _id="6898ed51778ea565540375df"
  name="Damian X"
  email="dx4336969@gmail.com"
  role="buyer"
  profile="https://res.cloudinary.com/dtytb8qrc/image/upload/v1754852698/wunkathomes/users/6898ed51778ea565540375df.jpg"
  available={true}
  
/>
<UserCard
  _id="6898ed51778ea565540375df"
  name="Damian X"
  email="dx4336969@gmail.com"
  role="buyer"
  profile="https://res.cloudinary.com/dtytb8qrc/image/upload/v1754852698/wunkathomes/users/6898ed51778ea565540375df.jpg"
  available={true}
  
/>
<UserCard
  _id="6898ed51778ea565540375df"
  name="Damian X"
  email="dx4336969@gmail.com"
  role="buyer"
  profile="https://res.cloudinary.com/dtytb8qrc/image/upload/v1754852698/wunkathomes/users/6898ed51778ea565540375df.jpg"
  available={true}
  
/>
<UserCard
  _id="6898ed51778ea565540375df"
  name="Damian X"
  email="dx4336969@gmail.com"
  role="buyer"
  profile="https://res.cloudinary.com/dtytb8qrc/image/upload/v1754852698/wunkathomes/users/6898ed51778ea565540375df.jpg"
  available={true}
  
/>
<UserCard
  _id="6898ed51778ea565540375df"
  name="Damian X"
  email="dx4336969@gmail.com"
  role="buyer"
  profile="https://res.cloudinary.com/dtytb8qrc/image/upload/v1754852698/wunkathomes/users/6898ed51778ea565540375df.jpg"
  available={true}
  
/>
  </div>
</>

 {/* Floating Button */}
      <button
        onClick={() => setShowTeamMembers((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition"
      >
        <MdOutlineAdminPanelSettings className="w-6 h-6" />
      </button>

      {/* Team Members Panel */}
      {showTeamMembers && (
        <div className="fixed bottom-0 right-0  mr-3 mb-3   z-50">
          <TeamMembersCard type="admin" onClose={()=>setShowTeamMembers(false)}  />
        </div>
      )}
  </div>
  
  )
}


