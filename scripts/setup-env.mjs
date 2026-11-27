// Copies each .env.example to the real env file, only if that file does not exist yet.
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const targets = [
  ['apps/studio/.env.example', 'apps/studio/.env'],
  ['apps/web/.env.example', 'apps/web/.env.local'],
  ['apps/mobile/.env.example', 'apps/mobile/.env'],
]
for (const [from, to] of targets) {
  const dest = path.join(root, to)
  if (fs.existsSync(dest)) console.log(`kept     ${to}`)
  else {
    fs.copyFileSync(path.join(root, from), dest)
    console.log(`created  ${to}   <- put your Sanity project ID in it`)
  }
}
