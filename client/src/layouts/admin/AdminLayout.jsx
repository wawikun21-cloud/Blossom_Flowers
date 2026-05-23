// src/layouts/admin/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/features/admin/components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}