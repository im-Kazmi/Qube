import { IMenuActionHandler } from "../types/action-handlers";
import { Events } from "../types/events";
import { ipcRenderer, IpcRenderer } from "electron";

export const menuHandlers: IMenuActionHandler = {
  quit: () => ipcRenderer.send(Events.QUIT),
  undo: () => ipcRenderer.send(Events.UNDO),
  redo: () => ipcRenderer.send(Events.UNDO),
  cut: () => ipcRenderer.send(Events.UNDO),
  copy: () => ipcRenderer.send(Events.UNDO),
  paste: () => ipcRenderer.send(Events.PASTE),
  selectAll: () => ipcRenderer.send(Events.SELECT_ALL),
  zoomreset: () => ipcRenderer.send(Events.ZOOM_RESET),
  zoomin: () => ipcRenderer.send(Events.ZOOM_IN),
  zoomout: () => ipcRenderer.send(Events.ZOOM_OUT),
  fullscreen: () => ipcRenderer.send(Events.FULL_SCREEN),
  about: () => ipcRenderer.send(Events.TOOGLE_ABOUT),
  devtools: () => ipcRenderer.send(Events.TOGGLE_DEVTOOLS),
};
