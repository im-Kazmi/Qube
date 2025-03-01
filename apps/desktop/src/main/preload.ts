import ClientMenuActionHandler from "@/handlers/menu-handlers";
import { Events } from "../types/events";
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

const electronHandler = {
  menuActions: new ClientMenuActionHandler(ipcRenderer),
};

contextBridge.exposeInMainWorld("qube", electronHandler);

export type ElectronHandler = typeof electronHandler;
