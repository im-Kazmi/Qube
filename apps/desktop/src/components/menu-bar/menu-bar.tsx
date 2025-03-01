import { useState } from "react";
import { WindowControls } from "./window-controls";
import { MenuBarItem } from "./menu-bar-item";
import { MenuDropdown } from "./dropdown-item";
import { MenuDivider } from "./menu-devider";
import { Database } from "lucide-react";

interface MenuBarProps {
  title?: string;
  showWindowControls?: boolean;
}

export function MenuBar({
  title = "SQL Explorer",
  showWindowControls = true,
}: MenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuClick = (menuId: string) => {
    if (activeMenu === menuId) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuId);
    }
  };

  const handleMenuClose = () => {
    setActiveMenu(null);
  };

  return (
    <div className="flex h-9 w-full  items-center justify-between border-b  backdrop-blur-sm">
      <div className="flex items-center">
        <div className="flex h-9 items-center px-3">
          <img
            src="../../../assets/icon.png"
            className="mr-2 h-4 w-4 text-primary"
          />
          <span className="text-xs font-medium">{title}</span>
        </div>

        <div className="flex h-full">
          <MenuBarItem
            id="file"
            label="File"
            isActive={activeMenu === "file"}
            onClick={() => handleMenuClick("file")}
          >
            <MenuDropdown>
              <MenuDropdown.Item
                icon={<Database className="h-4 w-4" />}
                label="New Connection"
                shortcut="⌘N"
              />
              <MenuDropdown.Item label="Open Connection" shortcut="⌘O" />
              <MenuDivider />
              <MenuDropdown.Item label="Save Query" shortcut="⌘S" />
              <MenuDropdown.Item label="Save Query As..." shortcut="⇧⌘S" />
              <MenuDivider />
              <MenuDropdown.Item label="Export Results" shortcut="⌘E" />
              <MenuDivider />
              <MenuDropdown.Item label="Close Connection" shortcut="⌘W" />
              <MenuDropdown.Item label="Exit" shortcut="⌘Q" />
            </MenuDropdown>
          </MenuBarItem>

          <MenuBarItem
            id="edit"
            label="Edit"
            isActive={activeMenu === "edit"}
            onClick={() => handleMenuClick("edit")}
          >
            <MenuDropdown>
              <MenuDropdown.Item label="Undo" shortcut="⌘Z" />
              <MenuDropdown.Item label="Redo" shortcut="⇧⌘Z" />
              <MenuDivider />
              <MenuDropdown.Item label="Cut" shortcut="⌘X" />
              <MenuDropdown.Item label="Copy" shortcut="⌘C" />
              <MenuDropdown.Item label="Paste" shortcut="⌘V" />
              <MenuDivider />
              <MenuDropdown.Item label="Find" shortcut="⌘F" />
              <MenuDropdown.Item label="Replace" shortcut="⌘H" />
              <MenuDivider />
              <MenuDropdown.Item label="Preferences" shortcut="⌘," />
            </MenuDropdown>
          </MenuBarItem>

          <MenuBarItem
            id="view"
            label="View"
            isActive={activeMenu === "view"}
            onClick={() => handleMenuClick("view")}
          >
            <MenuDropdown>
              <MenuDropdown.Item label="Database Explorer" shortcut="⌘1" />
              <MenuDropdown.Item label="Query Editor" shortcut="⌘2" />
              <MenuDropdown.Item label="Results Panel" shortcut="⌘3" />
              <MenuDivider />
              <MenuDropdown.Item label="Toggle Sidebar" shortcut="⌘B" />
              <MenuDropdown.Item label="Toggle Status Bar" />
              <MenuDivider />
              <MenuDropdown.Item label="Zoom In" shortcut="⌘+" />
              <MenuDropdown.Item label="Zoom Out" shortcut="⌘-" />
              <MenuDropdown.Item label="Reset Zoom" shortcut="⌘0" />
            </MenuDropdown>
          </MenuBarItem>

          <MenuBarItem
            id="query"
            label="Query"
            isActive={activeMenu === "query"}
            onClick={() => handleMenuClick("query")}
          >
            <MenuDropdown>
              <MenuDropdown.Item label="Execute" shortcut="⌘Enter" />
              <MenuDropdown.Item label="Execute Selected" shortcut="⇧⌘Enter" />
              <MenuDivider />
              <MenuDropdown.Item label="Format SQL" shortcut="⇧⌘F" />
              <MenuDropdown.Item label="Comment/Uncomment" shortcut="⌘/" />
              <MenuDivider />
              <MenuDropdown.Item label="Explain Query" shortcut="⌘E" />
              <MenuDropdown.Item label="Query History" shortcut="⌘H" />
            </MenuDropdown>
          </MenuBarItem>

          <MenuBarItem
            id="help"
            label="Help"
            isActive={activeMenu === "help"}
            onClick={() => handleMenuClick("help")}
          >
            <MenuDropdown>
              <MenuDropdown.Item label="Documentation" />
              <MenuDropdown.Item label="Keyboard Shortcuts" shortcut="⌘?" />
              <MenuDivider />
              <MenuDropdown.Item label="Check for Updates" />
              <MenuDivider />
              <MenuDropdown.Item label="About SQL Explorer" />
            </MenuDropdown>
          </MenuBarItem>
        </div>
      </div>

      {showWindowControls && <WindowControls />}

      {activeMenu && (
        <div className="fixed inset-0 z-10" onClick={handleMenuClose} />
      )}
    </div>
  );
}
