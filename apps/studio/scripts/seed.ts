// Creates a demo home page, a news page and three news articles (published). Safe to run again.
// Run from the repo root:  npm run seed
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2025-02-19' })

let n = 0
const block = (type: string, props: Record<string, unknown> = {}) => ({ type, props: { id: `${type}-${++n}`, ...props } })

const page = (id: string, title: string, slug: string, content: unknown[]) => ({
  _id: id,
  _type: 'page',
  title,
  slug: { _type: 'slug', current: slug },
  puckData: JSON.stringify({ root: { props: {} }, content }),
})

const articles = [
  {
    _id: 'news-1', _type: 'newsArticle', title: 'We launched our new website', slug: { _type: 'slug', current: 'new-website' },
    publishedAt: '2026-11-20T09:00:00Z',
    summary: 'The site and the mobile app are now built from the same components.',
    body: 'Developers build the components once. Marketing arranges them into pages in the visual editor, and the result shows up on the website and in the app.\n\nNo developer is needed to publish a new page.',
  },
  {
    _id: 'news-2', _type: 'newsArticle', title: 'Autumn collection is here', slug: { _type: 'slug', current: 'autumn-collection' },
    publishedAt: '2026-11-12T09:00:00Z',
    summary: 'Warm colours, soft fabrics and a few surprises.',
    body: 'Browse the new arrivals and find something for the colder days.',
  },
  {
    _id: 'news-3', _type: 'newsArticle', title: 'Opening hours for the holidays', slug: { _type: 'slug', current: 'holiday-hours' },
    publishedAt: '2026-11-01T09:00:00Z',
    summary: 'We are open every day until Christmas Eve.',
    body: 'Shorter hours on the 24th and 31st. Closed on the 25th and 26th.',
  },
]

const pages = [
  page('page-home', 'Home', 'home', [
    block('Hero', {
      title: 'Welcome to the demo', subtitle: 'This page was assembled in the visual editor from ready-made components.',
      buttonLabel: 'Read the news', buttonUrl: '/news', align: 'center', imageUrl: '',
    }),
    block('RichText', {
      heading: 'How it works',
      body: 'Developers build the components. Marketing arranges them into pages, writes the texts, uploads the images and writes the news.\n\nThe same page appears on the website and in the mobile app.',
      align: 'left',
    }),
    block('Section', {
      variant: 'muted', paddingY: 'lg', width: 'normal',
      content: [block('NewsList', { title: 'Latest news', count: 3, showImages: 'yes' })],
    }),
    block('Columns', {
      layout: '50-50', gap: 'lg', stack: 'mobile',
      col1: [block('FeatureList', { heading: 'Why this setup', items: [{ title: 'One set of components', description: 'Web and mobile share the same code.' }, { title: 'Marketing is independent', description: 'Pages are built without a developer.' }] })],
      col2: [block('RichText', { heading: 'Try it yourself', body: 'Open Studio, edit this page in the visual editor, press Publish and reload this page.', align: 'left' })],
      col3: [],
    }),
    block('CtaBanner', { text: 'Want to see all news?', buttonLabel: 'Go to the news page', buttonUrl: '/news' }),
  ]),
  page('page-news', 'News', 'news', [
    block('Hero', { title: 'News', subtitle: 'Everything that is new.', buttonLabel: '', buttonUrl: '/', align: 'left', imageUrl: '' }),
    block('NewsList', { title: '', count: 20, showImages: 'yes' }),
  ]),
]

async function run() {
  const tx = client.transaction()
  articles.forEach((doc) => tx.createOrReplace(doc))
  pages.forEach((doc) => tx.createOrReplace(doc))
  await tx.commit()
  console.log(`Seeded ${pages.length} pages and ${articles.length} news articles.`)
}
run().catch((e) => {
  console.error(e)
  process.exit(1)
})
