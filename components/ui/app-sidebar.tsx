"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Anchor,
  Wallet,
  User,
  LogOut,
  Leaf,
} from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Configuration", href: "/configuration", icon: Anchor },
    { name: "Reports", href: "/reports", icon: Wallet },
    { name: "Wizard", href: "/wizard", icon: User },
  ];

  async function handleLogout() {
    await fetch("/api/revokeCookie", {
      method: "POST",
    });

    router.replace("/");
    router.refresh();
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Leaf size={18} />
          <span className="font-semibold">Farmer Portal</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <div className="flex flex-col gap-1 p-2">
            {navItems.map((item) => {
              const ActiveIcon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
                    pathname === item.href
                      ? "bg-emerald-100 text-emerald-700"
                      : "hover:bg-slate-100"
                  }`}
                >
                  <ActiveIcon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}