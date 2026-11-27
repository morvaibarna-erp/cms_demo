// Edited automatically by `npm run new:component`. Keep the marker comments.
// <registry:imports>
import { hero } from './components/Hero'
import { richText } from './components/RichText'
import { imageBlock } from './components/ImageBlock'
import { newsList } from './components/NewsList'
import { featureList } from './components/FeatureList'
import { ctaBanner } from './components/CtaBanner'
import { spacer } from './components/Spacer'
import { section } from './components/Section'
import { columns } from './components/Columns'
import { headLine } from './components/HeadLine'
// </registry:imports>

export const contracts = {
// <registry:entries>
  Hero: hero,
  RichText: richText,
  ImageBlock: imageBlock,
  NewsList: newsList,
  FeatureList: featureList,
  CtaBanner: ctaBanner,
  Spacer: spacer,
  Section: section,
  Columns: columns,
  HeadLine: headLine,
// </registry:entries>
}

export type ComponentName = keyof typeof contracts
export type PropsMap = { [K in ComponentName]: NonNullable<(typeof contracts)[K]['_props']> }
