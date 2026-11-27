# Puck + Sanity demo (web + mobile, no backend)

Developers build **components**. Marketing builds **pages** from them in a visual editor and writes the
**texts, images and news**. The result appears on a website and in a mobile app. There is no API and no database
of our own: Sanity stores the content.

```
packages/contracts   what marketing can edit per component (fields, defaults) + shared types
packages/ui          the components, written ONCE (React Native primitives; run on web and mobile)
apps/studio          Sanity Studio: pages, news articles, and the visual editor (opens in a new tab)
apps/web             Next.js website
apps/mobile          Expo app
```

## Setup (once)
1. Create a project at https://sanity.io/manage and copy the **project ID**. In that project, API → CORS origins,
   add `http://localhost:3333` (tick "Allow credentials").
2. From the repo root:
   ```bash
   npm run setup:env     # creates apps/*/.env files
   ```
   Put your project ID in `apps/studio/.env`, `apps/web/.env.local` and `apps/mobile/.env`.
3. ```bash
   npm install
   npx sanity login      # once, inside apps/studio:  cd apps/studio && npx sanity login
   npm run seed          # creates a demo home page, a news page and 3 news articles
   cd apps/mobile && npx expo install --fix && cd ../..
   ```

## Run
```bash
npm run dev           # Studio http://localhost:3333 and website http://localhost:3000
npm run dev:mobile    # Expo (open with Expo Go; pull down to refresh)
```

## What marketing does
- **Pages:** Studio > Page > "Open visual editor". Drag components in, change texts, upload images, press
  Publish in the editor, then Publish the page in Studio.
- **Images:** in the editor, any image field has an upload button.
- **News:** Studio > News article. Write title, date, teaser, image and full text, and publish it.
  Every **News list** block on every page shows the newest articles automatically.

## What developers do
```bash
npm run new:component PricingTable              # contract + component, registered automatically
npm run new:component PromoSection -- --section # a container with a drop area
```
Edit `packages/contracts/src/components/Name.ts` (what marketing edits) and
`packages/ui/src/components/Name.tsx` (how it looks; use View / Text / Pressable / Image, no div or CSS files).
The Studio editor, the website and the app all pick it up.

## Good to know
- The website shows changes within a minute. In the app, pull down to refresh.
- A link like `/news` opens that page; `https://...` opens the browser.
- Unknown components are skipped, so older app versions keep working when new components ship.
