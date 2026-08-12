/**
 * Optional startup entry for shared hosts that expect a root server file
 * (Passenger, some cPanel Node.js setups). Prefer `npm start` when available.
 */
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { spawn } = require('child_process')

const port = process.env.PORT || 3000
const child = spawn(
  process.execPath,
  ['./node_modules/next/dist/bin/next', 'start', '-p', String(port)],
  { stdio: 'inherit', env: process.env },
)

child.on('exit', (code) => process.exit(code ?? 0))
