import { IDialogHandlers } from "@/types/action-handlers";
import { DialogEvents } from "@/types/events";
import { ipcRenderer } from "electron";

export const dialog: IDialogHandlers = {
  showOpenDialog: (options) =>
    ipcRenderer.invoke(DialogEvents.SHOW_OPEN_DIALOG, options),
  showSaveDialog: (options) =>
    ipcRenderer.invoke(DialogEvents.SHOW_SAVE_DIALOG, options),
};
