"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { toast, Toaster } from "sonner";
import { useAuthenticatedData } from "@/utils/flavour/persist";
import { Leaf, LayoutDashboard, Anchor, Wallet, User, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { revokeToken, useToken } from "@/utils/flavour/useAuth";
import { useAuthentication } from "@/hawk-tuah/access/auth";

export default function MySideBar({ children }: { children: React.ReactNode }) {
  const { site_name, clearAuth } = useAuthenticatedData();
  const { logout } = useAuthentication();
  const token = useToken();
  const pathname = usePathname();
  const route = useRouter();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Statements", href: "/statements", icon: Anchor },
    { name: "Payslip", href: "/payslip", icon: Wallet },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const handleLogout = async () => {
    try {
      if (!token) return;
      const response = await logout(token);
      if (response.success === true) {
        await revokeToken();
        clearAuth();
        route.push("/");
        toast.success("Logged out successfully");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <SidebarProvider>
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <AppSidebar />
      </div>

      {/* FIX: added min-w-0 and overflow-x-hidden so flex child can't push page wider than viewport */}
      <main className="flex-1 flex flex-col min-h-screen bg-slate-50 min-w-0 overflow-x-hidden">

        {/* ── Top Navbar (desktop only) ── */}
        <div
          className="hidden md:flex items-center gap-3 px-4 sm:px-6 py-3.5 sticky top-0 z-30"
          style={{
            background: "linear-gradient(135deg, #1e3a5f 0%, #2d6a4f 100%)",
            boxShadow: "0 2px 16px rgba(30,58,95,0.18)",
          }}
        >
          <SidebarTrigger className="text-white hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors" />
          <div className="h-4 w-px bg-white/20 mx-1" />
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <p className="text-sm font-semibold tracking-wide text-white/90 truncate">
            {site_name}
          </p>
          <div className="flex-1" />
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white/60"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Farmer Portal
          </div>
        </div>

        {/* ── Content ── */}
        {/* FIX: added min-w-0 to content wrapper so children respect column width */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 pb-24 md:pb-8 overflow-auto min-w-0">
          {children}
          <Toaster position="top-center" richColors closeButton />
        </div>

        {/* ── Mobile Bottom Navigation ── */}
        <div
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div className="flex justify-around items-center h-16 px-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center justify-center gap-1 flex-1 py-2"
                >
                  <item.icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={isActive ? "text-emerald-700" : "text-slate-400"}
                  />
                  <span
                    className={`text-[11px] font-medium leading-none ${
                      isActive ? "text-emerald-700" : "text-slate-400"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-2"
            >
              <LogOut size={22} strokeWidth={2} className="text-red-400" />
              <span className="text-[11px] font-medium leading-none text-red-400">Logout</span>
            </button>
          </div>
        </div>

      </main>
    </SidebarProvider>
  );
}