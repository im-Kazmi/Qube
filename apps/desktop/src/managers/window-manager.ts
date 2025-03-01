import {
  BrowserView,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain,
  Menu,
  WebContentsView,
} from "electron";
import path from "path";
import { resolveHtmlPath } from "../shared/utils";

export class QubeWindowManager {
  private window: BrowserWindow | null = null;

  createWindow(options: BrowserWindowConstructorOptions): BrowserWindow {
    if (this.window) return this.window;

    const newWindow = new BrowserWindow({
      ...options,
      webPreferences: {
        ...options.webPreferences,
        preload: path.join(__dirname, "preload.js"),
      },
    });

    this.window = newWindow;

    this.window.loadURL(resolveHtmlPath("index.html"));

    this.window.on("close", () => {
      this.window = null;
    });

    return this.window;
  }
  getWindow(): BrowserWindow | null {
    return this.window;
  }

  closeWindow() {
    if (this.window) {
      this.window.close();
    }
  }

  getSize(): BrowserWindowConstructorOptions {
    return {
      width: 1050,
      height: 500,
      minWidth: 800,
      minHeight: 500,
    };
  }

  onMoveWindow() {
    const bounds = this.window.getNormalBounds();
  }
  minimizeWindow() {
    this.window.minimize();
  }

  maximizeWindow() {
    this.window.maximize();
  }

  unmaximizeWindow() {
    this.window.unmaximize();
  }

  isMinimized() {
    this.window.isMinimized();
  }

  isMaximized() {
    this.window.isMaximized();
  }

  exists() {
    return this.window !== null;
  }

  focused() {
    return this.window && this.window.isFocused();
  }

  isFullScreen() {
    return this.window && this.window.isFullScreen();
  }

  FullScreen(value: boolean) {
    this.window.setFullScreen(value);
  }
}
