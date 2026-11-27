// Shape of the JSON Puck produces (and Sanity stores in `puckData`).
export interface PageBlock { type: string; props: { id: string } & Record<string, unknown> }
export interface PageData { root?: { props?: Record<string, unknown> }; content: PageBlock[] }

export const emptyPage: PageData = { root: { props: {} }, content: [] }

export function parsePageData(raw?: string | null): PageData {
  if (!raw) return emptyPage
  try {
    const parsed = JSON.parse(raw)
    return { ...emptyPage, ...parsed, content: parsed.content ?? [] }
  } catch {
    return emptyPage
  }
}
