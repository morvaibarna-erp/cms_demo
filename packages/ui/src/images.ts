/** Sanity serves resized, optimized images when asked: only download as many pixels as needed. */
export const sized = (url: string, width: number) =>
  url.includes('cdn.sanity.io') ? `${url}?w=${width}&auto=format` : url
