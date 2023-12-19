// app 控制应用程序的事件生命周期（相当于应用程序）
// BrowserWindow 创建并控制浏览器窗口（相当于打开桌面弹框）
import { join } from 'node:path'
import { app, BrowserWindow, ipcMain, WebContentsPrintOptions, protocol } from 'electron'
// import process from 'node:process'
import ipc from './ipc'

// 定义全局变量，获取窗口实例
let win: BrowserWindow | null;
let child: BrowserWindow | null;

/**
 * 创建一个窗口
 */
console.log('path', join(__dirname, 'preload.js'))
const createWindow = () => {
    win = new BrowserWindow({
        webPreferences: {
            preload: join(__dirname, 'preload.js'),
            devTools: true,
            // 集成网页和 Node.js，也就是在渲染进程中，可以调用 Node.js 方法
            // nodeIntegration: true,
            contextIsolation: true,
        }

    })
    protocol.registerFileProtocol('app', (request, callback) => {
        const url = request.url.replace(/^app:\/\//, '');
        const filePath = join(__dirname, url);
        callback({ path: filePath });
    });
    // 集成网页和 Node.js 后，需要加载
    // 这里接收的网址是指：Vite 启动后，会在本地运行一个服务，把这个服务网址丢进去就行
    // 使用 Vite 自带的环境变量 VITE_DEV_SERVER_HOST
    // 如果是 undefined，就换成 VITE_DEV_SERVER_HOSTNAME
    console.log('---------------')
    ipc(() => {
        win && win.webContents.send('startJob')
        console.log('ipc线程')
    })
    // console.log(process)
    // win.webContents.openDevTools({ mode: 'right' })
    ipcMain.handle(
        'toPrint',
        async (event, options: WebContentsPrintOptions) => {
            openPrintWindow(win)
        },
    )
    if (process.env.NODE_ENV === 'development') {
        console.log(1)

        // const rendererPort = process.argv[2]
        win.loadURL(process.env['VITE_DEV_SERVER_URL'] ? process.env['VITE_DEV_SERVER_URL'] : `http://localhost:5173`, {
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        })
        win.webContents.openDevTools({ mode: 'right' })
    } else {
        win.webContents.openDevTools({ mode: 'right' })
        win.loadFile(join(app.getAppPath(), 'renderer', 'index.html'))

    }
}
console.log('测试main')
// 初始化app（在 Electron 完成初始化时触发），挂载上面创建的 桌面应用程序窗口
app.whenReady().then(() => {
    const mainWindow = createWindow()
})
function openPrintWindow(win) {
    let printWindow: BrowserWindow | null
    printWindow = new BrowserWindow({
        parent: win,
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        }
    });
    printWindow.webContents.openDevTools({ mode: 'right' })
    // printWindow.loadFile(`file:///D:/study/electron/electron-vue3/dist/win-unpacked/resources/app.asar/renderer/index.html#/print`);
    printWindow.loadURL(join(app.getAppPath(), 'renderer', 'index.html#print'), { hash: false })

    // 监听窗口关闭事件
    printWindow.on('closed', function () {
        printWindow = null;
    });

}
