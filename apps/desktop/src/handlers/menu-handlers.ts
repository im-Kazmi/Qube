import { IMenuActionHandler } from "../types/action-handlers";
import { Events } from "../types/events";
import { IpcRenderer } from "electron";

export default class ClientMenuActionHandler implements IMenuActionHandler {
  ipcRenderer: IpcRenderer;
  constructor(ipcRenderer: IpcRenderer) {}
  quit = () => this.ipcRenderer.send(Events.QUIT);
  undo = () => this.ipcRenderer.send(Events.UNDO);
  redo = () => this.ipcRenderer.send(Events.UNDO);
  cut = () => this.ipcRenderer.send(Events.UNDO);
  copy = () => this.ipcRenderer.send(Events.UNDO);
  paste = () => this.ipcRenderer.send(Events.PASTE);
  selectAll = () => this.ipcRenderer.send(Events.SELECT_ALL);
  zoomreset = () => this.ipcRenderer.send(Events.ZOOM_RESET);
  zoomin = () => this.ipcRenderer.send(Events.ZOOM_IN);
  zoomout = () => this.ipcRenderer.send(Events.ZOOM_OUT);
  fullscreen = () => this.ipcRenderer.send(Events.FULL_SCREEN);
  about = () => this.ipcRenderer.send(Events.TOOGLE_ABOUT);
  devtools = () => this.ipcRenderer.send(Events.TOGGLE_DEVTOOLS);
}
