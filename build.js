import { build } from 'esbuild'
import { mkdirSync, cpSync, createWriteStream } from 'fs'
import archiver from 'archiver'

const entryPoints = ['src/popup.js']
const isWatch = process.argv.includes('--watch')
const isProd = process.argv.includes('--prod')

const buildOptions = {
  entryPoints,
  outdir: 'dist',
  bundle: true,
  minify: isProd,
  sourcemap: !isProd,
  format: 'esm',
}

if (isWatch) {
  // Watch mode for development
  const ctx = await build({
    ...buildOptions,
    logLevel: 'info',
  })

  await ctx.watch()
  console.log('👀 Watching for changes...')

  // Copy public files initially
  mkdirSync('dist', { recursive: true })
  cpSync('public', 'dist', { recursive: true })
  console.log(
    '✅ Initial setup complete. Reload extension in chrome://extensions'
  )
} else {
  // Build once
  build(buildOptions)
    .then(() => {
      console.log('✅ JS built successfully.')

      mkdirSync('dist', { recursive: true })
      cpSync('public', 'dist', { recursive: true })
      console.log('✅ Manifest, Icons and HTML copied.')

      if (isProd) {
        createZip()
      }
    })
    .catch(() => process.exit(1))
}

function createZip() {
  const output = createWriteStream('extension.zip')
  const archive = archiver('zip', { zlib: { level: 9 } })

  output.on('close', () => {
    console.log('✅ extension.zip created (' + archive.pointer() + ' bytes)')
  })

  archive.on('error', (err) => {
    throw err
  })

  archive.pipe(output)
  archive.directory('dist/', false)
  archive.finalize()
}
