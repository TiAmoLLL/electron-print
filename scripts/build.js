const Path = require('node:path')
const FileSystem = require('node:fs')
const Chalk = require('chalk')
const Vite = require('vite')
const compileTs = require('./private/tsc')

function buildRenderer() {
  console.log('------build----------\n', Path.join(__dirname, '..', 'vite.config.ts'))
  return Vite.build({
    configFile: Path.join(__dirname, '..', 'vite.config.ts'),
    base: './',
    mode: 'production',
  })
}

function buildMain() {
  const mainPath = Path.join(__dirname, '..', 'electron',)
  FileSystem.cpSync(
    Path.join(__dirname, '..', 'electron', 'static'),
    Path.join(__dirname, '..', 'build', 'main', 'static'),
    { recursive: true },
  )
  return compileTs(mainPath)
}

FileSystem.rmSync(Path.join(__dirname, '..', 'build'), {
  recursive: true,
  force: true,
})

console.log(Chalk.blueBright('Transpiling renderer & main...'))

Promise.allSettled([
  buildRenderer(),
  buildMain(),
]).then(() => {
  console.log(Chalk.greenBright('Renderer & main successfully transpiled! (ready to be built with electron-builder)'))
}).catch(err => {
  console.log('----------error---------------')
  console.log(err)
})
