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

// Helper to sync public files to both dist and docs
function syncPublicFiles() {
  // Copy to dist (for extension)
  mkdirSync('dist', { recursive: true })
  cpSync('public', 'dist', { recursive: true })
  console.log('✅ Files copied to dist/')

  // Copy docs files to docs folder (for GitHub Pages)
  mkdirSync('docs', { recursive: true })
  cpSync('public/privacy-policy.html', 'docs/privacy-policy.html')
  cpSync('public/terms-of-use.html', 'docs/terms-of-use.html')
  console.log('✅ Docs synced to docs/ folder')
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
  syncPublicFiles()
  console.log(
    '✅ Initial setup complete. Reload extension in chrome://extensions'
  )
} else {
  // Build once
  build(buildOptions)
    .then(() => {
      console.log('✅ JS built successfully.')

      syncPublicFiles()

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
