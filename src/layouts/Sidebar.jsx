import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect } from "react";

export function SidebarGroup({ item, collapsed, openGroup, setOpenGroup }) {
  const location = useLocation();
  const Icon = item.icon;

  const isParentActive = item.children?.some(
    (child) => location.pathname.startsWith(child.to)
  );

  const isOpen = openGroup === item.label;

  // Auto-open group if a child route is active
  useEffect(() => {
    if (isParentActive) {
      setOpenGroup(item.label);
    }
  }, [isParentActive]);

  // If no children → simple link
  if (!item.children) {
    return (
      <SidebarLink
        to={item.to}
        collapsed={collapsed}
        label={item.label}
        icon={<Icon className="w-5 h-5" />}
      />
    );
  }

  return (
    <div>
      {/* Parent Button */}
      <button
        onClick={() =>
          setOpenGroup(isOpen ? null : item.label) // auto-close previous
        }
        className={`flex items-center w-full px-3 py-2 rounded-md font-medium
        transition hover:text-gray-500 hover:bg-purple-100
        ${collapsed ? "justify-center" : "justify-between"}
      `}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5" />

          {!collapsed && (
            <span className="flex items-center gap-2 ">
              {item.label}
              {isParentActive && (
                <span className="w-2 h-2 bg-purple-600 rounded-full inline-block"></span>
              )}
            </span>
          )}
        </div>

        {!collapsed &&
          (isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
      </button>

      {/* CHILDREN WITH SMOOTH ANIMATION */}
      <div
        className={`ml-10 overflow-hidden transition-all duration-300
        ${isOpen && !collapsed ? "max-h-40" : "max-h-0"}
      `}
      >
        <div className="mt-1 space-y-1">
          {item.children.map((child, idx) => (
            <SidebarChildLink key={idx} child={child} collapsed={collapsed} />
          ))}
        </div>
      </div>
    </div>
  );
}
function SidebarChildLink({ child, collapsed }) {
  return (
    <NavLink
      to={child.to}
      end    // <-- IMPORTANT
      className={({ isActive }) => `
        flex items-center px-3 py-2 rounded-md font-medium text-sm transition
        ${isActive ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-purple-100"}
        ${collapsed ? "justify-center" : ""}
      `}
    >
      {!collapsed && child.label}
    </NavLink>
  );
}

function SidebarLink({ to, label, collapsed, icon }) {
  return (
    <NavLink
      to={to}
      end        // <-- FIX
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-4 rounded-md font-medium transition
        ${isActive ? "bg-purple-600 text-white" : "text-gray-700 hover:bg-purple-100"}
        ${collapsed ? "justify-center" : ""}
      `}
    >
      {icon}
      {!collapsed && label}
    </NavLink>
  );
}
