import type { ComponentType } from 'react'
import type { Field } from '@puckeditor/core' // type-only: never bundled into React Native

/** A drop area inside a component. In render code use it as `<Content />`. */
export type SlotProp = ComponentType<{ minEmptyHeight?: number }>

// Slots are stored as arrays of blocks, so their default is an empty array.
type DefaultProps<P> = { [K in keyof P]: P[K] extends SlotProp ? unknown[] : P[K] }

export type FieldLayout<K extends string = string> =
  | { type: 'field'; name: K }
  | { type: 'group'; label: string; variant?: 'card' | 'flush'; collapsible?: boolean; fields: K[] }
  | { type: 'tab'; label: string; fields: K[] }

export interface Contract<P extends object> {
  label: string
  /** Sidebar group in the editor. Defaults to "content". */
  category?: 'layout' | 'content' | (string & {})
  fields: { [K in keyof P]-?: Field<P[K]> }
  defaultProps: DefaultProps<P>
  /** type-only: carries the props type into PropsMap. Never set at runtime. */
  _props?: P,
  fieldLayout?: FieldLayout<Extract<keyof P, string>>[]
}

export const defineContract = <P extends object>(c: Contract<P>) => c

/** An image marketing can upload. Stored as a plain URL string; the Studio swaps in an uploader. */
export const imageField = (label = 'Image'): Field<string> =>
  ({ type: 'text', label, imageUpload: true }) as unknown as Field<string>
export const isImageField = (f: unknown) => Boolean((f as { imageUpload?: boolean } | null)?.imageUpload)

export const colorPickerField = (label = 'Color'): Field<string>=>
  ({ type: 'text', label, colorPicker: true }) as unknown as Field<string>
export const isColorPickerField = (f: unknown) => Boolean((f as { colorPicker?: boolean } | null)?.colorPicker)