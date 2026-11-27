import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { puckEditorTool } from './tools/puckEditorTool'

export default defineConfig({
  name: 'default',
  title: 'Marketing Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  tools: (prev) => [...prev, puckEditorTool],
  schema: { types: schemaTypes },
})
