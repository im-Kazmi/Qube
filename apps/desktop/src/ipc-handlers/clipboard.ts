import {
  IClipboardHandler,
  IMenuActionHandler,
} from "../types/action-handlers";
import { ClipboardEvents, Events } from "../types/events";
import { ipcRenderer } from "electron";

export const clipboard: IClipboardHandler = {
  readText: () => ipcRenderer.sendSync(ClipboardEvents.READ_TEXT),
  writeText: (options) => ipcRenderer.send(ClipboardEvents.WRITE_TEXT, options),
  clear: () => ipcRenderer.send(ClipboardEvents.CLEAR),
};
