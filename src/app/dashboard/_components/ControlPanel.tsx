"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { FaHome } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GiGears } from "react-icons/gi";

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
    icon: <GiGears className="size-6" />,
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Product List", href: "/products" },
      { label: "Product Detail", href: "/products/detail" },
      { label: "Add Product", href: "/products/add" },
    ],
  },
];

export default function ControlPanel() {
  const [open, setOpen] = useState(true);

  return (
    <div className=" px-2 py-2">
      {menu.map((group, idx) => (
        <div key={idx} className="mb-4">
          {/* Header */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between pr-4 w-full text-sm font-medium text-gray-700 hover:text-black"
          >
            <div className="flex items-center gap-2">
              {group.icon}
              <span>{group.label}</span>
            </div>
            {open ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {/* Items */}
          {open && (
            <div className="mt-2 ml-6 flex flex-col gap-1">
              {group.items.map((item, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className={cn(
                    "justify-start w-full text-gray-600 hover:text-black hover:bg-gray-100 text-sm"
                  )}
                  asChild
                >
                  <a href={item.href}>{item.label}</a>
                </Button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
