const ChildProcess = require('node:child_process')
const process = require('node:process')
const Chalk = require('chalk')

function compile(directory) {
  return new Promise((resolve, reject) => {
    console.log('tsc执行1')
    const tscProcess = ChildProcess.exec('tsc', {
      cwd: directory,
    })

    tscProcess.stdout.on('data', data =>
      process.stdout.write(Chalk.yellowBright('[tsc] ') + Chalk.white(data.toString())),
    )

    tscProcess.on('exit', (exitCode) => {
      if (exitCode > 0) {
        reject(exitCode)
      } else {
        resolve()
      }
    })
  })
}

module.exports = compile