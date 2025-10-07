'use client';

import { useEffect, useState } from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import TeamMembersCard from "../../_components/TeamMembersCard";
import UserCard from "../../_components/UserCard";
import UserFilter from "../../_components/UserFilter";
import { userDocumentType } from "@/models/User";

type User = {
  _id: string;
  name: string;
  email: string;
  role: "buyer" | "seller" | "agent" | "admin";
  profile: string;
  available?: boolean;
};

export default function Page() {
  const [showTeamMembers, setShowTeamMembers] = useState(false);
  const [users, setUsers] = useState<userDocumentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user", { cache: "no-store" }); // always fresh
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="mx-4">
      <>
        <h2 className="text-xl font-semibold pt-5">Manage User Privileges</h2>

        <div className="my-4 mb-5">
          <UserFilter />
        </div>

        {loading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">No users found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
              />
            ))}
          </div>
        )}
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
        <div className="fixed bottom-0 right-0 mr-3 mb-3 z-50">
          <TeamMembersCard
            type="admin"
            onClose={() => setShowTeamMembers(false)}
          />
        </div>
      )}
    </div>
  );
}
