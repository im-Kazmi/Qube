"use client";
import { cn } from "../../lib/utils";

export function TinySidebar() {
  return (
    <aside
      className={cn(
        "fixed top-9 left-0 z-20 h-screen bg-white/50 w-[50px] -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        // !getOpenState() ? "w-[60px]" : "w-[220px]",
        // settings.disabled && "hidden",
      )}
    >
      {/* <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} /> */}
      <div className="relative h-full flex flex-col  py-4 overflow-y-auto border-r dark:shadow-zinc-800"></div>
    </aside>
  );
}
