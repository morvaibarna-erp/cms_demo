import { createContext, useContext } from 'react'
import type { NewsItem } from '@acme/contracts'

type Content = { news: NewsItem[] }
const ContentContext = createContext<Content>({ news: [] })

export const ContentProvider = ContentContext.Provider
export const useContent = () => useContext(ContentContext)
