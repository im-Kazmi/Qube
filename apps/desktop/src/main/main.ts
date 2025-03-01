import { app, BrowserWindow } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { AppManager } from "../managers/app-manager";

const myapp = new AppManager();

if (started) {
  app.quit();
}

myapp.start();
