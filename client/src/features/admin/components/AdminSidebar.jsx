// src/features/admin/components/AdminSidebar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingCart, CalendarDays,
  Users, BarChart2, Settings, Sun, Moon, Flower2, PanelLeftOpen, PanelLeftClose,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const NAV_ITEMS = [
  { label: "Dashboard",        icon: LayoutDashboard, href: "/admin",           end: true },
  { label: "Manage Products",  icon: Package,         href: "/admin/products" },
  { label: "Manage Orders",    icon: ShoppingCart,    href: "/admin/orders" },
  { label: "Manage Bookings",  icon: CalendarDays,    href: "/admin/bookings" },
  { label: "Manage Customers", icon: Users,           href: "/admin/customers" },
  { label: "Reports",          icon: BarChart2,       href: "/admin/reports" },
  { label: "Settings",         icon: Settings,        href: "/admin/settings" },
];

function Tooltip({ label }) {
  return (
    <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-[999] rounded-lg px-2.5 py-1.5 bg-sidebar-foreground text-sidebar text-xs font-medium whitespace-nowrap shadow-lg before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-sidebar-foreground opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 pointer-events-none transition-all duration-150">
      {label}
    </span>
  );
}

function NavItem({ item, isExpanded }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.href}
      end={item.end}
      className={({ isActive }) => [
        "group relative flex items-center rounded-xl transition-all duration-200 ease-out",
        "outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        isExpanded ? "gap-3 px-3 py-2.5" : "justify-center py-2.5 w-full",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
          : "text-sidebar-foreground/60 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground",
      ].join(" ")}
    >
      {({ isActive }) => (
        <>
          <Icon size={18} strokeWidth={isActive ? 2 : 1.5} className="shrink-0 transition-transform duration-200 group-hover:scale-110" />
          {!isExpanded && <Tooltip label={item.label} />}
          {isExpanded && (
            <span className="text-sm font-medium whitespace-nowrap overflow-hidden">
              {item.label}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

function ThemeToggle({ isExpanded, theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className={[
        "group relative flex items-center rounded-xl w-full transition-all duration-200",
        "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/40",
        isExpanded ? "gap-3 px-3 py-2.5" : "justify-center py-2.5",
      ].join(" ")}
      aria-label="Toggle theme"
    >
      <div className="relative w-[18px] h-[18px] shrink-0">
        <Sun  size={18} strokeWidth={1.5} className={["absolute inset-0 transition-all duration-300", theme === "dark"  ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"].join(" ")} />
        <Moon size={18} strokeWidth={1.5} className={["absolute inset-0 transition-all duration-300", theme === "light" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"].join(" ")} />
      </div>
      {!isExpanded && <Tooltip label={theme === "dark" ? "Light Mode" : "Dark Mode"} />}
      {isExpanded && (
        <span className="text-sm font-medium whitespace-nowrap overflow-hidden">
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}

function UserAvatar({ isExpanded }) {
  return (
    <div className={[
      "group relative flex items-center rounded-xl cursor-pointer hover:bg-sidebar-accent/40 transition-all duration-200",
      isExpanded ? "gap-3 px-3 py-2 w-full" : "justify-center py-2",
    ].join(" ")}>
      <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center shadow-sm ring-2 ring-sidebar-primary/30 shrink-0">
        <span className="text-[12px] font-bold text-sidebar-primary-foreground select-none">A</span>
      </div>
      {!isExpanded && <Tooltip label="Admin" />}
      {isExpanded && (
        <div className="overflow-hidden">
          <p className="text-[13px] font-semibold text-sidebar-foreground whitespace-nowrap leading-tight">Admin</p>
          <p className="text-[11px] text-sidebar-foreground/50 whitespace-nowrap">Administrator</p>
        </div>
      )}
    </div>
  );
}

function SidebarPanel({ isExpanded, theme, toggleTheme }) {
  return (
    <div
      className={[
        "flex flex-col h-full transition-all duration-300 ease-out bg-sidebar",
        isExpanded ? "w-[220px] px-3" : "w-[64px] px-2.5",
      ].join(" ")}
      style={{ overflow: "visible" }}
    >
      {/* Brand header */}
      <div className={[
        "flex items-center gap-2 py-4",
        isExpanded ? "px-1" : "justify-center",
      ].join(" ")}>
        <div className="flex items-center justify-center shrink-0">
          <Flower2 size={20} className="text-sidebar-primary" strokeWidth={2} />
        </div>
        {isExpanded && (
          <span className="text-[13px] font-semibold text-sidebar-foreground tracking-tight whitespace-nowrap">
            Blossom
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 space-y-1" style={{ overflowX: "hidden" }}>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.href} item={item} isExpanded={isExpanded} />
        ))}
      </nav>

      {/* Footer */}
      <div className={["py-4 flex flex-col gap-2", isExpanded ? "" : "items-center"].join(" ")}>
        <ThemeToggle isExpanded={isExpanded} theme={theme} toggleTheme={toggleTheme} />
        <div className="w-full h-px bg-sidebar-border" />
        <UserAvatar isExpanded={isExpanded} />
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Desktop */}
      <aside
        className="hidden lg:flex h-screen sticky top-0 shrink-0"
        style={{ overflow: "visible" }}
      >
        <SidebarPanel isExpanded={isExpanded} theme={theme} toggleTheme={toggleTheme} />

        {/* Divider + toggle button */}
        <div className="relative self-stretch">
          <div className="w-px h-full bg-sidebar-border" />

          {/* No bg, no border — just the icon, top-aligned, pushed further right */}
          <button
            onClick={() => setIsExpanded((v) => !v)}
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
            className="absolute top-[14px] left-[14px] z-50
              flex items-center justify-center
              text-muted-foreground/50 hover:text-foreground
              transition-all duration-200 hover:scale-110"
          >
            {isExpanded
              ? <PanelLeftClose size={30} strokeWidth={1.5} />
              : <PanelLeftOpen  size={30} strokeWidth={1.5} />
            }
          </button>
        </div>
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden text-muted-foreground hover:text-foreground transition-all duration-200"
        aria-label="Open menu"
      >
        <PanelLeftOpen size={30} strokeWidth={1.5} />
      </button>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="fixed left-0 top-0 z-50 h-full lg:hidden animate-in slide-in-from-left duration-300 flex">
            <SidebarPanel isExpanded={true} theme={theme} toggleTheme={toggleTheme} />
            <div className="relative self-stretch">
              <div className="w-px h-full bg-sidebar-border" />
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute top-[14px] left-[14px] z-50
                  flex items-center justify-center
                  text-muted-foreground/50 hover:text-foreground
                  transition-all duration-200 hover:scale-110"
              >
                <PanelLeftClose size={30} strokeWidth={1.5} />
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}