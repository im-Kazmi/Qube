import { Events } from "../types/events";
import { BrowserWindow, ipcMain, IpcMainEvent } from "electron";

type EventHandler = (event: IpcMainEvent, ...args: any[]) => void;

export class EventManager {
  browserWindow: BrowserWindow;
  handlers: Map<string, EventHandler> = new Map();

  constructor(browserWindow: BrowserWindow) {
    this.browserWindow = browserWindow;
  }

  on(channel: string, handler: EventHandler) {
    this.handlers.set(channel, handler);
    ipcMain.on(channel, handler);
  }

  off(channel: string): void {
    const handlerExists = this.handlers.get(channel);

    if (handlerExists) {
      //  i will check if remove listener works or not
      ipcMain.removeListener(channel, handlerExists);
      this.handlers.delete(channel);
    }
  }

  emit(channel: string, ...args: any[]): void {
    ipcMain.emit(channel, ...args);
  }
}
