import { clipboard, ipcMain } from "electron";
import { EventManager } from "./event-manager";
import { Events } from "../types/events";
import { BrowserWindow } from "electron";

export class IPCManager {
  browserWindow: BrowserWindow;
  eventManager: EventManager;

  constructor(browserWindow: BrowserWindow, eventManager: EventManager) {
    this.browserWindow = browserWindow;
    this.eventManager = eventManager;
  }

  allHandlers() {
    this.eventManager?.on(Events.MIXIMIZE_WINDOW, () => {
      if (this.browserWindow) {
        console.log("click on maximize");
        if (!this.browserWindow.isFullScreen()) {
          this.browserWindow.setFullScreen(true);
        } else {
          this.browserWindow.setFullScreen(false);
        }
      }
    });
    this.eventManager?.on(Events.MINIMIZE_WINDOW, () => {
      if (this.browserWindow) {
        console.log("click on maximize");

        this.browserWindow.minimize();
      }
    });
    this.eventManager?.on(Events.CLOSE_WINDOW, () => {
      if (this.browserWindow) {
        this.browserWindow.close();
      }
    });
  }
}
