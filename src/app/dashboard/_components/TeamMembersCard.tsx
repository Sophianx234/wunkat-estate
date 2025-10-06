"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

type Member = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
};

const members: Member[] = [
  {
    id: 1,
    name: "Dale Komen",
    email: "dale@example.com",
    role: "Member",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: 2,
    name: "Sofia Davis",
    email: "m@example.com",
    role: "Owner",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
  },
  {
    id: 3,
    name: "Jackson Lee",
    email: "p@example.com",
    role: "Member",
    avatar: "https://randomuser.me/api/portraits/men/30.jpg",
  },
  {
    id: 4,
    name: "Isabella Nguyen",
    email: "i@example.com",
    role: "Member",
    avatar: "https://randomuser.me/api/portraits/women/40.jpg",
  },
  {
    id: 5,
    name: "Hugan Romex",
    email: "kai@example.com",
    role: "Member",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
  },
];

type TeamMembersCardProps = {
  type?: "admin" | "user";
  onClose?: () => void;
};

export default function TeamMembersCard({ type = "user", onClose }: TeamMembersCardProps) {
  return (
    <Card className="w-full h-fit max-w-sm rounded-xl shadow relative">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Invite your team members to collaborate...
          </CardDescription>
        </div>

        {/* Show close button only if type is admin and onClose provided */}
        {type === "admin" && onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between gap-2"
          >
            {/* Avatar + Info */}
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-gray-500">{member.email}</p>
              </div>
            </div>

            {/* Role Select */}
            <Select defaultValue={member.role}>
              <SelectTrigger className="w-[100px] h-8 text-xs">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Owner">Owner</SelectItem>
                <SelectItem value="Member">Member</SelectItem>
                <SelectItem value="Viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
