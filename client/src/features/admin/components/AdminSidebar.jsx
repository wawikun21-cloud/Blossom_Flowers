// src/features/admin/components/AdminSidebar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingCart, CalendarDays,
  Users, BarChart2, Settings, Menu, Sun, Moon, Flower2,
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
        "group flex items-center rounded-xl transition-all duration-200 ease-out",
        "outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        isExpanded ? "gap-3 px-3 py-2.5" : "py-2.5",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
          : "text-sidebar-foreground/60 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground",
      ].join(" ")}
    >
      {({ isActive }) => (
        <>
          <div className={["relative shrink-0 flex items-center justify-center", isExpanded ? "" : "w-full"].join(" ")}>
            <Icon size={18} strokeWidth={isActive ? 2 : 1.5} className="transition-transform duration-200 group-hover:scale-110" />
            {!isExpanded && <Tooltip label={item.label} />}
          </div>
          <span className={["text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300", isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"].join(" ")}>
            {item.label}
          </span>
        </>
      )}
    </NavLink>
  );
}

function ThemeToggle({ isExpanded, theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className={["group flex items-center rounded-xl w-full transition-all duration-200 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/40", isExpanded ? "gap-3 px-3 py-2.5" : "py-2.5"].join(" ")}
      aria-label="Toggle theme"
    >
      <div className={["relative shrink-0 flex items-center justify-center", isExpanded ? "" : "w-full"].join(" ")}>
        <div className="relative w-[18px] h-[18px]">
          <Sun  size={18} strokeWidth={1.5} className={["absolute inset-0 transition-all duration-300", theme === "dark"  ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"].join(" ")} />
          <Moon size={18} strokeWidth={1.5} className={["absolute inset-0 transition-all duration-300", theme === "light" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"].join(" ")} />
        </div>
        {!isExpanded && <Tooltip label={theme === "dark" ? "Light Mode" : "Dark Mode"} />}
      </div>
      <span className={["text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300", isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"].join(" ")}>
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
}

function UserAvatar({ isExpanded }) {
  return (
    <div className={["group flex items-center rounded-xl cursor-pointer hover:bg-sidebar-accent/40 transition-all duration-200", isExpanded ? "gap-3 px-3 py-2 w-full" : "py-2"].join(" ")}>
      <div className={["relative shrink-0 flex items-center justify-center", isExpanded ? "" : "w-full"].join(" ")}>
        <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center shadow-sm ring-2 ring-sidebar-primary/30">
          <span className="text-[12px] font-bold text-sidebar-primary-foreground select-none">A</span>
        </div>
        {!isExpanded && <Tooltip label="Admin" />}
      </div>
      <div className={["overflow-hidden transition-all duration-300", isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"].join(" ")}>
        <p className="text-[13px] font-semibold text-sidebar-foreground whitespace-nowrap leading-tight">Admin</p>
        <p className="text-[11px] text-sidebar-foreground/50 whitespace-nowrap">Administrator</p>
      </div>
    </div>
  );
}

function SidebarPanel({ isExpanded, onToggle, theme, toggleTheme }) {
  return (
    <div className={["flex flex-col h-full bg-sidebar border-r border-sidebar-border overflow-visible transition-all duration-300 ease-out", isExpanded ? "w-[220px] px-3" : "w-[64px] px-2"].join(" ")}>

      {/* Header */}
      <div className={["flex items-center py-4 transition-all duration-300", isExpanded ? "justify-between" : "justify-center"].join(" ")}>
        <div className={["flex items-center gap-2 overflow-hidden transition-all duration-300", isExpanded ? "w-auto opacity-100" : "w-0 opacity-0 pointer-events-none"].join(" ")}>
          <div className="w-6 h-6 rounded-md bg-sidebar-primary flex items-center justify-center">
            <Flower2 size={13} color="#fff" strokeWidth={1.5} />
          </div>
          <span className="text-[13px] font-semibold text-sidebar-foreground tracking-tight whitespace-nowrap">Blossom</span>
        </div>
        <button
          onClick={onToggle}
          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/40 transition-all duration-200"
        >
          <Menu size={18} strokeWidth={2} />
        </button>
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
      <aside className="hidden lg:flex h-screen sticky top-0 shrink-0" style={{ overflow: "visible" }}>
        <SidebarPanel isExpanded={isExpanded} onToggle={() => setIsExpanded((v) => !v)} theme={theme} toggleTheme={toggleTheme} />
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-sidebar border border-sidebar-border shadow-md text-sidebar-foreground hover:bg-sidebar-accent/40 transition-all duration-200"
      >
        <Menu size={18} strokeWidth={2} />
      </button>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-200" onClick={() => setIsMobileOpen(false)} />
          <aside className="fixed left-0 top-0 z-50 h-full lg:hidden animate-in slide-in-from-left duration-300">
            <SidebarPanel isExpanded={true} onToggle={() => setIsMobileOpen(false)} theme={theme} toggleTheme={toggleTheme} />
          </aside>
        </>
      )}
    </>
  );
}