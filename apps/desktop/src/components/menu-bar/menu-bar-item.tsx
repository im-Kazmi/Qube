import type React from "react";
import { cn } from "../../lib/utils";

interface MenuBarItemProps {
  id: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function MenuBarItem({
  id,
  label,
  isActive = false,
  onClick,
  children,
}: MenuBarItemProps) {
  return (
    <div className="relative">
      <button
        id={id}
        className={cn(
          "flex h-full items-center px-3 text-xs transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          isActive && "bg-accent text-accent-foreground",
        )}
        onClick={onClick}
      >
        {label}
      </button>
      {isActive && children}
    </div>
  );
}
