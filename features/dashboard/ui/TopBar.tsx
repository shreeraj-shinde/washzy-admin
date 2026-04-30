"use client";

import { Bell, Search, LogOut } from "lucide-react";
import { Avatar } from "@/shared/ui/Avatar";
import { Input } from "@/shared/ui/Input";
import { useAuth } from "@/features/auth";

export function TopBar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-border px-6 flex items-center gap-6">
      <div className="flex-1">
        <Input
          type="search"
          placeholder="Search centers, cities, or IDs…"
          leadingIcon={<Search size={18} />}
          className="h-11 py-0"
        />
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="relative h-10 w-10 rounded-full hover:bg-surface-muted flex items-center justify-center text-text-muted"
      >
        <Bell size={18} />
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent-500" />
      </button>

      <div className="flex items-center gap-3">
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-navy-900">
            {user?.name ?? "Admin"}
          </p>
          <p className="text-xs text-text-muted">Senior Manager</p>
        </div>
        <Avatar name={user?.name ?? "Admin"} size={40} />
        <button
          type="button"
          onClick={logout}
          aria-label="Sign out"
          className="h-10 w-10 rounded-full hover:bg-surface-muted flex items-center justify-center text-text-muted"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
