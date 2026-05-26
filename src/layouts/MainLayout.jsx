import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NAV_ITEMS } from "./NavList";
import { Toaster } from "react-hot-toast";
import { SidebarGroup } from "./Sidebar";

export default function AdminLayout({children}) {
  const [collapsed, setCollapsed] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  return (
    <div className="h-screen w-full flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`h-full bg-white shadow-lg  flex flex-col transition-all duration-300
          ${collapsed ? "w-16" : "w-[300px]"}
        `}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b bg-purple-600 text-white">
          {!collapsed && <h2 className="text-xl font-semibold">MyPanel</h2>}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded hover:bg-gray-200 hover:text-gray-700 transition"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item, idx) => (
            <SidebarGroup
              key={idx}
              item={item}
              collapsed={collapsed}
              openGroup={openGroup}
              setOpenGroup={setOpenGroup}
            />
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
            {!collapsed ? "Logout" : "⏻"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow flex items-center justify-between px-6 border-b">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <img
              src="https://ui-avatars.com/api/?name=A"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
          {/* {children} */}
        </div>
      </main>

      <Toaster />
    </div>
  );
}
