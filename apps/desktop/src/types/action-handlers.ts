import { BrowserWindow, OpenDialogOptions, SaveDialogOptions } from "electron";

export interface IMenuActionHandler {
  quit: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  undo: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  redo: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  cut: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  copy: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  paste: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  selectAll?: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  zoomreset: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  zoomin: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  zoomout: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  fullscreen: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  about: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  devtools: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
}

export interface IClipboardHandler {
  readText: () => void;
  writeText: (options: any) => void;
  clear: () => void;
}

export interface IDialogHandlers {
  showOpenDialog: (options: OpenDialogOptions) => void;
  showSaveDialog: (options: SaveDialogOptions) => void;
}
