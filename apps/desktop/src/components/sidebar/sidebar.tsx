"use client";
import { Menu } from "./menu";
import { SidebarToggle } from "./sidebar-toggle";
import { Button } from "../ui/button";
import { useSidebar } from "../../hooks/use-sidebar";
import { cn } from "../../lib/utils";
import { PanelsTopLeft } from "lucide-react";

export function Sidebar() {
  const sidebar = useSidebar();

  if (!sidebar) return null;

  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-9 left-[50px] bg-white/50 z-50 h-screen  -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[60px]" : "w-[220px]",
        settings.disabled && "hidden",
        isOpen && "",
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col  py-4 overflow-y-auto border-r dark:shadow-zinc-800"
      >
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
