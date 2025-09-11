"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Split the pathname into segments
  const pathParts = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="ml-6">
      <BreadcrumbList>
        {pathParts.map((part, index) => {
          const href = "/" + pathParts.slice(0, index + 1).join("/");
          const isLast = index === pathParts.length - 1;

          // Prettify the segment
          const name = part
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <BreadcrumbItem key={href}>
              {index > 0 && <BreadcrumbSeparator />}
              {isLast ? (
                <BreadcrumbPage>{name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={href}>{name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
