import { WindowManager } from "./window-manager";
import { globalShortcut, type BrowserWindow } from "electron";

interface Shortcut {
  key: string;
  description: string;
  global?: boolean;
  action: () => void;
}

export class ShortCutManager {
  private shortcuts: Map<string, Shortcut> = new Map();
  private windowManager: WindowManager;

  constructor(windowManager: WindowManager) {
    this.windowManager = windowManager;
  }

  register(shortcut: Shortcut): void {
    this.shortcuts.set(shortcut.key, shortcut);

    if (shortcut.global) {
      globalShortcut.register(shortcut.key, shortcut.action);
    } else {
      this.registerForMainWindow();
    }
  }

  registerForWindow(window: BrowserWindow, shortcut: Shortcut): void {
    window.webContents.on("before-input-event", (event, input) => {
      if (input.type === "keyDown" && input.key === shortcut.key) {
        console.log(`Shortcut ${shortcut.key} triggered`);
        shortcut.action();
        event.preventDefault();
      }
    });
  }

  unRegister(key: string) {
    const shortcut = this.shortcuts.get(key);
    if (shortcut) {
      if (shortcut.global) {
        globalShortcut.unregister(key);
      }
      this.shortcuts.delete(key);
    }
  }

  getAll(): Shortcut[] {
    return Array.from(this.shortcuts.values());
  }

  registerForMainWindow(): void {
    const mainWindow = this.windowManager.getWindow();
    if (mainWindow) {
      this.shortcuts.forEach((shortcut) => {
        if (!shortcut.global) {
          this.registerForWindow(mainWindow, shortcut);
        }
      });
    }
  }
}
