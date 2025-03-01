import { app, dialog } from "electron";
import { EventManager } from "./event-manager";
import { IPCManager } from "./ipc-manager";
import { ShortCutManager } from "./shortcuts";
import { QubeWindowManager } from "./window-manager";
// import { getIcon } from "../shared/get-icon";
import { MenuBuilder } from "../shared/menu-builder";

export class AppManager {
  private windowManager: QubeWindowManager;
  private eventManager: EventManager;
  private ipcManager: IPCManager;
  private shortcutManager: ShortCutManager;
  private menuBuilder: MenuBuilder;

  constructor() {
    this.windowManager = new QubeWindowManager();
    this.eventManager = new EventManager(this.windowManager.getWindow());
    this.ipcManager = new IPCManager(
      this.windowManager.getWindow(),
      this.eventManager,
    );
    this.shortcutManager = new ShortCutManager(this.windowManager);

    this.setupAppEvents();
  }

  createMainWindow() {
    const mainWindow = this.windowManager.createWindow({
      ...this.windowManager.getSize(),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        spellcheck: false,
        sandbox: false,
      },
      frame: false,
      // backgroundColor: "#000000",
      closable: true,
      fullscreenable: true,
      // roundedCorners: true,
      transparent: true,
    });

    this.menuBuilder = new MenuBuilder(mainWindow);

    this.menuBuilder.buildMenu();
    console.log("Menu built");

    this.eventManager = new EventManager(mainWindow);
    this.ipcManager = new IPCManager(mainWindow, this.eventManager);
  }

  private setupAppEvents(): void {
    app.on("ready", () => {
      console.log("App is ready");
      this.createMainWindow();
      if (this.windowManager.getWindow()) {
        console.log("window exists");
        this.setupShortcuts();
        console.log("shortcuts set successfully.");
        this.ipcManager.allHandlers();
      } else {
        console.log("there is no window. cannot setup shortcuts");
      }
    });
    app.on("window-all-closed", this.onWindowAllClosed);
    app.on("activate", this.onActivate);
  }

  setupShortcuts() {
    this.shortcutManager.register({
      key: "CommandOrControl+N",
      description: "Create a new connection",
      action: () => {
        console.log("New connection shortcut triggered");
      },
      global: true,
    });

    this.shortcutManager.register({
      key: "CommandOrControl+Q",
      description: "Quit the application",
      global: true,
      action: () => {
        app.quit();
      },
    });

    this.shortcutManager.register({
      key: "CommandOrControl+S",
      description: "Show shortcuts",
      action: async () => {
        await this.showShortcutsDialog();
      },
    });
  }

  async showShortcutsDialog() {
    const result = await dialog.showOpenDialog(this.windowManager.getWindow(), {
      properties: ["openFile"],
      filters: [{ name: "Markdown File", extensions: ["md"] }],
    });

    if (result.canceled) return;

    const filePath = result.filePaths[0];
    console.log(filePath);
  }
  private onWindowAllClosed = (): void => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  };

  onActivate = (): void => {
    if (!this.windowManager.getWindow()) {
      this.createMainWindow();
    }
  };
  start(): void {
    this.setupAppEvents();
  }
}
