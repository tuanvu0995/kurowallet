const electron = require("electron");
const path = require("path");
const url = require("url");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let win;

// Hàm tạo cửa sổ app
function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true,
    });
  win.loadURL(startUrl);

  win.webContents.openDevTools();

  win.on("close", function () {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  app.quit();
});

app.on("activate", function () {
  if (win == null) {
    createWindow();
  }
});
