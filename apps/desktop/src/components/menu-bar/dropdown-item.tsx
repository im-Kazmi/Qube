import type React from "react";
import { cn } from "../../lib/utils";

interface MenuDropdownProps {
  children: React.ReactNode;
  className?: string;
}

export function MenuDropdown({ children, className }: MenuDropdownProps) {
  return (
    <div
      className={cn(
        "absolute left-0 top-full z-50 min-w-[200px] overflow-hidden rounded-md border border-border bg-popover p-1 shadow-md animate-in fade-in-10 zoom-in-95",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface MenuDropdownItemProps {
  label: string;
  shortcut?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

MenuDropdown.Item = function MenuDropdownItem({
  label,
  shortcut,
  icon,
  onClick,
  disabled = false,
}: MenuDropdownItemProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-xs text-accent-foreground",
        "hover:bg-accent hover:text-accent-foreground",
        disabled && "pointer-events-none opacity-50",
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="">{icon}</span>}
        <span>{label}</span>
      </div>
      {shortcut && (
        <span className="text-xs text-muted-foreground">{shortcut}</span>
      )}
    </button>
  );
};
