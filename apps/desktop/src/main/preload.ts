import { contextBridge } from "electron";
import { menuHandlers } from "@/ipc-handlers/menu";
import { clipboard } from "@/ipc-handlers/clipboard";
import { dialog } from "@/ipc-handlers/dialog";

contextBridge.exposeInMainWorld("menu", menuHandlers);
contextBridge.exposeInMainWorld("clipboard", clipboard);
contextBridge.exposeInMainWorld("dialog", dialog);

export type MenuHandler = typeof menuHandlers;
