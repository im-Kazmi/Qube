import { BrowserWindow, IpcRenderer } from "electron";

export interface IMenuActionHandler {
  toggleSidebar: (
    menuItem: Electron.MenuItem,
    browserWindow: BrowserWindow | null,
  ) => void;
  quit: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  undo: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  redo: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  cut: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  copy: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  paste: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  selectAll?: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  zoomreset: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  zoomin: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  zoomout: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  fullscreen: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  about: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  devtools: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  opendocs: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  contactSupport: (
    menuItem: Electron.MenuItem,
    win: BrowserWindow | null,
  ) => void;
  newWindow: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  newQuery: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  newTab: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  closeTab: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  quickSearch: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  switchTheme: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  reload: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  disconnect: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
  addBeekeeper: (
    menuItem: Electron.MenuItem,
    win: BrowserWindow | null,
  ) => void;
  enterLicense: (
    menuItem: Electron.MenuItem,
    win: BrowserWindow | null,
  ) => void;
  backupDatabase: (
    menuItem: Electron.MenuItem,
    win: BrowserWindow | null,
  ) => void;
  restoreDatabase: (
    menuItem: Electron.MenuItem,
    win: BrowserWindow | null,
  ) => void;
  exportTables: (
    menuItem: Electron.MenuItem,
    win: BrowserWindow | null,
  ) => void;
  upgradeModal: (
    menuItem: Electron.MenuItem,
    win: BrowserWindow | null,
  ) => void;
  checkForUpdates: (
    menuItem: Electron.MenuItem,
    win: BrowserWindow | null,
  ) => void;
  importSqlFiles: (
    menuItem: Electron.MenuItem,
    win: BrowserWindow | null,
  ) => void;
  toggleMinimalMode: (
    menuItem: Electron.MenuItem,
    win: BrowserWindow | null,
  ) => void;
  toggleBeta: (menuItem: Electron.MenuItem, win: BrowserWindow | null) => void;
}

export default class ClientMenuActionHandler implements IMenuActionHandler {
  ipcRenderer: IpcRenderer;
  constructor(ipcRenderer: IpcRenderer) {}
  upgradeModal = () => this.ipcRenderer.send("upgradeModal");

  quit = () => this.ipcRenderer.send("quit");
  undo = () => this.ipcRenderer.send("undo");
  redo = () => this.ipcRenderer.send("redo");
  cut = () => this.ipcRenderer.send("cut");
  copy = () => this.ipcRenderer.send("copy");
  paste = () => this.ipcRenderer.send("paste");
  selectAll = () => this.ipcRenderer.send("selectAll");
  zoomreset = () => this.ipcRenderer.send("zoomreset");
  zoomin = () => this.ipcRenderer.send("zoomin");
  zoomout = () => this.ipcRenderer.send("zoomout");
  fullscreen = () => this.ipcRenderer.send("fullscreen");
  about = () => this.ipcRenderer.send("about");
  devtools = () => this.ipcRenderer.send("devtools");
  opendocs = () => this.ipcRenderer.send("opendocs");
  contactSupport = () => this.ipcRenderer.send("contactSupport");
  newWindow = () => this.ipcRenderer.send("newWindow");
  newQuery = () => this.ipcRenderer.send("newQuery");
  newTab = () => this.ipcRenderer.send("newTab");
  closeTab = () => this.ipcRenderer.send("closeTab");
  quickSearch = () => this.ipcRenderer.send("quickSearch");
  switchTheme = (menuItem: Electron.MenuItem) => {
    const label = _.isString(menuItem) ? menuItem : menuItem.label;
    this.ipcRenderer.send(
      "switchTheme",
      label.toLowerCase().replaceAll(" ", "-"),
    );
  };
  reload = () => this.ipcRenderer.send("reload");
  disconnect = () => this.ipcRenderer.send("disconnect");
  addBeekeeper = () => this.ipcRenderer.send("addBeekeeper");
  toggleSidebar = () => this.ipcRenderer.send("toggleSidebar");
  enterLicense = () => this.ipcRenderer.send("enterLicense");
  backupDatabase = () => this.ipcRenderer.send("backupDatabase");
  restoreDatabase = () => this.ipcRenderer.send("restoreDatabase");
  exportTables = () => this.ipcRenderer.send("exportTables");
  checkForUpdates = () => this.ipcRenderer.send("checkForUpdates");
  importSqlFiles = () => this.ipcRenderer.send("importSqlFiles");
  toggleMinimalMode = () => this.ipcRenderer.send("toggleMinimalMode");
  switchLicenseState = (_menuItem, _win, type) =>
    this.ipcRenderer.send("switchLicenseState", type);
  toggleBeta = (menuItem) => {
    this.ipcRenderer.send("toggleBeta", menuItem);
  };
}
