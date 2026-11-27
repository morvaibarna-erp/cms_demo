import type { ComponentType } from 'react'
import type { ComponentName, PropsMap } from '@acme/contracts'
// <registry:imports>
import { Hero } from './components/Hero'
import { RichText } from './components/RichText'
import { ImageBlock } from './components/ImageBlock'
import { NewsList } from './components/NewsList'
import { FeatureList } from './components/FeatureList'
import { CtaBanner } from './components/CtaBanner'
import { Spacer } from './components/Spacer'
import { Section } from './components/Section'
import { Columns } from './components/Columns'
import { HeadLine } from './components/HeadLine'
// </registry:imports>

// TypeScript fails here if a contract has no component.
export const components: { [K in ComponentName]: ComponentType<PropsMap[K]> } = {
// <registry:entries>
  Hero,
  RichText,
  ImageBlock,
  NewsList,
  FeatureList,
  CtaBanner,
  Spacer,
  Section,
  Columns,
  HeadLine,
// </registry:entries>
}
