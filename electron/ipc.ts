import process from 'node:process'
import type { WebContentsPrintOptions } from 'electron'
import { BrowserWindow, app, ipcMain, session } from 'electron'
import { join } from 'node:path'
let win: BrowserWindow;
export default function init(callback: () => void) {

  // 打开打印窗口
  ipcMain.handle('newPrint', () => {
    // console.log('-------options---------', options)
    return new Promise<void>((resolve) => {
      const win = new BrowserWindow({
        width: 1200,
        height: 800,
        resizable: false,
        webPreferences: {
          webSecurity: false,
        },
        show: true,//是否显示页面
      })
      console.log('第二窗口渲染进程')
      if (process.env.NODE_ENV === 'development') {
        // 测试环境
        console.log(1)
        win.webContents.loadURL(`${'http://localhost:5173'}/#/print`, {
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        })
        win.webContents.openDevTools({ mode: 'right' })
      } else {
        // 生产环境
        win.loadURL(join(app.getAppPath(), 'renderer', 'index.html#print'), { hash: false })
      }
      // win.hide()
      // win.webContents.openDevTools({ mode: 'right' })
      win.on('closed', () => {
        resolve()
      })
      win.webContents.on('did-finish-load', () => {
        // 在页面加载完成后等待一段时间，以确保异步内容加载完毕
        setTimeout(() => {
          // 调用 webContents.print()
          win?.webContents.print({
            silent: false,
            printBackground: false,
            margins: { marginType: "none" }, // 网页的边距
            pageSize: "A4",
            // header: '',
            // footer: ''
            // pageSize: {
            //   width: 352,
            //   height: 352,
            // },
            // dpi: { "Horizo​​ntal": 600, "Vertical": 600 }
            // scaleFactor: 0.1,//缩放
          },
            (success, failureReason) => {
              console.log(success, failureReason);
              if (success || failureReason) {
                // win.close()
              }
            });
        }, 1000); // 延迟时间可根据实际情况调整
      });
      // setTimeout(() => {
      //   win.close()
      // }, 10000)
    })
  })
  // 销毁窗口
  ipcMain.handle("destroyPrintWindow", () => {
    console.log('销毁中')
    if (win) win.destroy();
    console.log('销毁完成')
  });
  // 打印
  ipcMain.handle(
    'printHandlePrint',
    async (event, options: WebContentsPrintOptions) => {
      return new Promise((resolve) => {
        event.sender.print(
          options,
          (success: boolean, failureReason: string) => {
            console.log(success, failureReason)
            resolve({ success, failureReason })
          },
        )
      })
    },
  )
  // 获取打印机
  ipcMain.handle(
    'getPrints',
    async (event) => {
      return new Promise((resolve) => {
        resolve(event.sender.getPrintersAsync())
      })
    },
  )
}
