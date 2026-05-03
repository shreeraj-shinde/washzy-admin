import type { ReactNode } from "react";
import { SideNav } from "@/features/dashboard/ui/SideNav";
import { TopBar } from "@/features/dashboard/ui/TopBar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <SideNav />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 px-6 py-8 lg:px-10 overflow-y-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}
