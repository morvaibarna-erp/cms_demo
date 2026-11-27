#!/usr/bin/env node
// npm run new:component PricingTable
// npm run new:component PromoSection -- --section     (a container with a content slot)
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const name = args.find((a) => !a.startsWith('--'))
const isSection = args.includes('--section')
if (!name || !/^[A-Z][A-Za-z0-9]+$/.test(name)) {
  console.error('Usage: npm run new:component <PascalCaseName> [-- --section]')
  process.exit(1)
}
const camel = name[0].toLowerCase() + name.slice(1)
const root = path.resolve(import.meta.dirname, '..')

const write = (rel, content) => {
  const file = path.join(root, rel)
  if (fs.existsSync(file)) throw new Error(`${rel} already exists`)
  fs.writeFileSync(file, content)
  console.log('created ', rel)
}
const register = (rel, importLine, entryLine) => {
  const file = path.join(root, rel)
  let s = fs.readFileSync(file, 'utf8')
  s = s.replace('// </registry:imports>', `${importLine}\n// </registry:imports>`)
  s = s.replace('// </registry:entries>', `${entryLine}\n// </registry:entries>`)
  fs.writeFileSync(file, s)
  console.log('updated ', rel)
}

if (isSection) {
  write(`packages/contracts/src/components/${name}.ts`, `import { defineContract, type SlotProp } from '../define'

export interface ${name}Props {
  content: SlotProp
}

export const ${camel} = defineContract<${name}Props>({
  label: '${name}',
  category: 'layout',
  fields: {
    content: { type: 'slot', disallow: ['${name}'] },
  },
  defaultProps: { content: [] },
})
`)
  write(`packages/ui/src/components/${name}.tsx`, `import { View } from 'react-native'
import type { PropsMap } from '@acme/contracts'

export function ${name}({ content: Content }: PropsMap['${name}']) {
  return (
    <View style={{ padding: 24 }}>
      <Content />
    </View>
  )
}
`)
} else {
  write(`packages/contracts/src/components/${name}.ts`, `import { defineContract } from '../define'

export interface ${name}Props {
  title: string
}

// The contract = what marketing can edit. Fields + defaults only, no UI.
export const ${camel} = defineContract<${name}Props>({
  label: '${name}',
  fields: {
    title: { type: 'text', label: 'Title' },
  },
  defaultProps: { title: '${name}' },
})
`)
  write(`packages/ui/src/components/${name}.tsx`, `import { View, Text } from 'react-native'
import type { PropsMap } from '@acme/contracts'

export function ${name}({ title }: PropsMap['${name}']) {
  return (
    <View style={{ padding: 24 }}>
      <Text>{title}</Text>
    </View>
  )
}
`)
}
register('packages/contracts/src/registry.ts', `import { ${camel} } from './components/${name}'`, `  ${name}: ${camel},`)
register('packages/ui/src/registry.ts', `import { ${name} } from './components/${name}'`, `  ${name},`)
console.log('\nDone. Edit the contract first, then the component (React Native primitives; runs on web too).')
