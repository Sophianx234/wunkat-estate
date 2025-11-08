"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { GoGear } from "react-icons/go";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashStore } from "@/lib/store";

type MenuItem = {
  label: string;
  href?: string;
};

type MenuGroup = {
  label: string;
  icon: React.ReactNode;
  items: MenuItem[];
};

const menu: MenuGroup[] = [
  {
    label: "Control Panel",
    icon: <GoGear className="size-6" />,
    items: [
      { label: "Manage Notifications", href: "/dashboard/manage/notifications" },
      { label: "Manage Feedbacks", href: "/dashboard/manage/feedbacks" },
      { label: "Manage Houses", href: "/dashboard/manage/houses" },
      { label: "Manage Rooms", href: "/dashboard/manage/rooms" },
      { label: "Manage Users", href: "/dashboard/manage/users" },
    ],
  },
];

export default function ControlPanel() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const {toggleSidebar} = useDashStore()

  return (
    <div className=" ">
      {menu.map((group, idx) => (
        <div key={idx} className="mb-2">
          {/* Group Header */}
          <button
            onClick={() => setOpen(!open)}
            className="flex pr-3 dash-nav-item items-center justify-between  w-full text-sm font-medium text-gray-700 hover:text-black"
          >
            <div className=" flex items-center gap-2">
              {group.icon}
              <span>{group.label}</span>
            </div>
            {open ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {/* Group Items */}
          {open && (
            <div className="mt-2 ml-6 flex flex-col gap-1">
              {group.items.map((item, i) => (
                <Link
                  key={i}
                  onClick={toggleSidebar}
                  href={item.href || "#"}
                  className={`dash-nav-item ${
                    pathname === item.href ? "bg-black text-white" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
