import { build } from 'esbuild'
import { mkdirSync, cpSync } from 'fs'

const entryPoints = [
  'src/popup.js',
]

build({
  entryPoints,
  outdir: 'dist',
  bundle: true,
  minify: true,
  sourcemap: false,
  format: 'esm',
}).then(() => {
  console.log('✅ JS built successfully.')
  
  // Copy manifest & HTML files to dist
  mkdirSync('dist', { recursive: true })
  cpSync('public', 'dist', { recursive: true })
  console.log('✅ Manifest, Icons and HTML copied.')
}).catch(() => process.exit(1))
