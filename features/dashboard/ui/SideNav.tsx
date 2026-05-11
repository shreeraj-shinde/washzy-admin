"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Wallet, Settings, ListChecks, Info } from "lucide-react";
import { Avatar } from "@/shared/ui/Avatar";
import { useAuth } from "@/features/auth";
import { cn } from "@/shared/lib/cn";

type Item = { href: string; label: string; icon: React.ReactNode };

const NAV: Item[] = [
  { href: "/centers", label: "Centers", icon: <Building2 size={18} /> },
  { href: "/payouts", label: "Payouts", icon: <Wallet size={18} /> },
  { href: "/jobs", label: "Job History", icon: <ListChecks size={18} /> },
  { href: "/settings", label: "Settings", icon: <Settings size={18} /> },
  { href: "/privacy", label: "Privacy Policy", icon: < Info size={18} /> },
];

export function SideNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-border min-h-screen px-4 py-6">
      <Link href="/centers" className="flex items-center gap-3 px-3 pb-8">
        <div className="h-10 w-10 rounded-lg bg-navy-900 flex items-center justify-center text-white text-base font-bold">
          W
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-navy-900">
            Management
          </span>
          <span className="text-xs text-text-muted">Admin Console</span>
        </div>
      </Link>

      <nav className="flex flex-col gap-1">
        {NAV.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
                active
                  ? "bg-teal-50 text-teal-900 font-medium"
                  : "text-text-muted hover:bg-surface-muted hover:text-navy-900",
              )}
            >
              <span className={active ? "text-teal-900" : "text-text-muted"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-muted">
          <Avatar name={user?.name ?? "Admin User"} size={40} />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-navy-900 truncate max-w-[140px]">
              {user?.name ?? "Admin User"}
            </span>
            <span className="text-xs text-text-muted">System Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
