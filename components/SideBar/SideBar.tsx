"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // ShadCN utility for conditional styling
import { Menu, LayoutDashboard, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // ShadCN Drawer for mobile sidebar

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load sidebar state from localStorage (persists between page refreshes)
  useEffect(() => {
    const storedState = localStorage.getItem("sidebar-collapsed");
    setIsCollapsed(storedState === "true");
  }, []);

  // Toggle sidebar and save state to localStorage
  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebar-collapsed", newState.toString());
      return newState;
    });
  };



  return (
    <>
      {/* Mobile Sidebar (Drawer) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SidebarContent isCollapsed={false} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className={cn(
        "h-screen bg-gray-900 text-white p-4 transition-all duration-300 fixed left-0 top-0 flex flex-col max-md:hidden",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="text-white mb-4 p-2 rounded-lg hover:bg-gray-800 transition"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Sidebar Content */}
        <SidebarContent isCollapsed={isCollapsed} />
      </aside>
    </>
  );
}

// Sidebar Content Component
function SidebarContent({ isCollapsed }: { isCollapsed: boolean }) {
      // Sidebar links
  const links = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/investments", label: "Investments", icon: <Briefcase className="w-5 h-5" /> },
  ];
  return (
    <nav className="flex flex-col space-y-2 ">
        
      {links.map(({ href, label, icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex items-center space-x-2 p-3 rounded-md hover:bg-gray-800 transition",
            isCollapsed ? "justify-center" : ""
          )}
        >
          {icon}
          {!isCollapsed && <span>{label}</span>}
        </Link>
      ))}
    </nav>
  );
}
