import { createContext, useContext } from 'react'
import { useWindowDimensions } from 'react-native'

/** Set only inside the Studio editor: "phone" simulates a narrow screen. */
export const PreviewContext = createContext<'desktop' | 'phone' | undefined>(undefined)
export const ViewportWidthContext = createContext<number | undefined>(undefined)

/** Screen width, or the simulated phone width inside the editor. */
export function useViewportWidth(): number {
  const override = useContext(ViewportWidthContext)
  const { width } = useWindowDimensions()
  return override ?? width
}
