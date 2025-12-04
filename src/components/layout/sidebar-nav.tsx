
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ScanLine, Users, UserSquare, School, BookText, UserPlus } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/scan",
    label: "Scan Attendance",
    icon: ScanLine,
  },
  {
    href: "/dashboard/admissions",
    label: "Admissions",
    icon: UserPlus,
  },
  {
    href: "/dashboard/students",
    label: "Students",
    icon: Users,
  },
  {
    href: "/dashboard/teachers",
    label: "Teachers",
    icon: UserSquare,
  },
  {
    href: "/dashboard/classes",
    label: "Classes",
    icon: School,
  },
  {
    href: "/dashboard/report",
    label: "Attendance Report",
    icon: BookText,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(item.href) && (item.href === '/dashboard' ? pathname === item.href : true)}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
