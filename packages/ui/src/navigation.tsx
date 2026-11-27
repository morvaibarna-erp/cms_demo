import { createContext, useContext } from 'react'
import { Linking } from 'react-native'

type Navigate = (slug: string) => void
const Ctx = createContext<Navigate>(() => {})
export const NavigationProvider = Ctx.Provider

/** "/news" opens that page inside the app; anything else (https://…) opens the browser. */
export function useOpenLink() {
  const navigate = useContext(Ctx)
  return (url: string) => (url.startsWith('/') ? navigate(url.replace(/^\//, '') || 'home') : Linking.openURL(url))
}
