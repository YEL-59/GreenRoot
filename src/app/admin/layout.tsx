"use client";
import type { ReactNode } from "react";

import { useState } from "react";
import { AdminSidebar, AdminHeader } from "@/components/admin";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#071911] flex text-stone-100">
      {/* Responsive Admin Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Admin Console Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <AdminHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 w-full space-y-8 animate-fadeIn admin-layout-main">
          {children}
        </main>
      </div>
    </div>
  );
}
