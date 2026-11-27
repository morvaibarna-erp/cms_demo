// Editor-only entry ("@acme/ui/puck"). The mobile app never imports this file, so Puck stays out of React Native.
import { createElement, Fragment, useContext, type ComponentType, type ReactNode } from 'react'
import { FieldGroup, FieldTab, type Config } from '@puckeditor/core'
import { contracts, isColorPickerField, isImageField, tokens, type ComponentName, type FieldLayout } from '@acme/contracts'

import { components } from './registry'
import { PreviewContext, ViewportWidthContext } from './platform'

export { PreviewContext }
export { ContentProvider } from './content'


export type ImageFieldProps = { value?: string; onChange: (url: string) => void; label?: string }

/** Simulates a phone-width column when previewing "phone". */
function RootFrame({ children }: { children?: any }) {
  const phone = useContext(PreviewContext) === 'phone'
  return createElement(
    ViewportWidthContext.Provider,
    { value: phone ? 390 : undefined },
    createElement('div', { style: { maxWidth: phone ? 390 : undefined, margin: '0 auto' } }, children),
  )
}

function resolveFields(fields: Record<string, any>, ImageField?: ComponentType<ImageFieldProps>) {
  return Object.fromEntries(
    Object.entries(fields).map(([key, field]) => {
      if (isImageField(field) && ImageField) {
        return [
          key,
          {
            type: 'custom',
            label: field.label,
            render: ({ value, onChange }: any) => createElement(ImageField, { value, onChange, label: field.label }),
          },
        ]
      }
      if (isColorPickerField(field)) {
        return [
          key,
          {
            type: 'custom',
            label: field.label,
            render: ({ value, onChange }: any) => createElement(ColorPicker, { value, onChange, label: field.label }),
          },
        ]
      }
      return [key, field]
    }),
  )
}

function buildRenderFields(layout?: FieldLayout[]) {
  if (!layout?.length) return undefined

  const used = new Set(
    layout.flatMap((item) => (item.type === 'field' ? [item.name] : item.fields)),
  )


  return ({ fields }: { fields: Record<string, ReactNode> }) => {
    const leftover = Object.keys(fields)
      .filter((k) => !used.has(k))
      .map((k) => fields[k])

    return createElement(
      Fragment,
      null,
      ...layout.map((item, i) => {
        if (item.type === 'field') return createElement(Fragment, { key: i }, fields[item.name])
        if (item.type === 'group') {
          return createElement(
            FieldGroup,
            { key: i, label: item.label, variant: item.variant, collapsible: item.collapsible },
            ...item.fields.map((k) => fields[k]),
          )
        }
        return createElement(
          FieldTab,
          { key: i, label: item.label },
          ...item.fields.map((k) => fields[k]),
        )
      }),
      ...leftover,
    )
  }
}

function ColorPicker({ value = '#000000', onChange, label }: { value?: string; onChange: (v: string) => void; label?: string }) {
  const swatches = Object.values(tokens.color).filter((v) => typeof v === 'string' && v.startsWith('#'))

  return createElement(
    'div',
    { style: { display: 'flex', flexDirection: 'column', gap: 6 } },
    label && createElement('label', { style: { fontSize: 13, fontWeight: 600 } }, label),
    createElement(
      'div',
      { style: { display: 'flex', gap: 8, alignItems: 'center' } },
      createElement('input', {
        type: 'color',
        value: /^#[0-9a-f]{6}$/i.test(value) ? value : '#000000',
        onChange: (e: any) => onChange(e.target.value),
        style: { width: 34, height: 34, padding: 0, border: 'none', cursor: 'pointer', background: 'none' },
      }),
      createElement('input', {
        type: 'text',
        value,
        onChange: (e: any) => onChange(e.target.value),
        placeholder: '#000000',
        style: { flex: 1, padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc', fontFamily: 'monospace' },
      }),
    ),
    swatches.length > 0 &&
      createElement(
        'div',
        { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
        ...swatches.map((hex) =>
          createElement('button', {
            key: hex,
            type: 'button',
            title: hex,
            onClick: () => onChange(hex),
            style: { width: 18, height: 18, borderRadius: 4, background: hex, border: '1px solid #cbd5e1', cursor: 'pointer' },
          }),
        ),
      ),
  )
}

export function createPuckConfig(opts: { ImageField?: ComponentType<ImageFieldProps> } = {}): Config {
  const names = Object.keys(contracts) as ComponentName[]
  const groups: Record<string, string[]> = {}
  for (const name of names) (groups[contracts[name].category ?? 'content'] ??= []).push(name)

  return {
    categories: Object.fromEntries(
      Object.entries(groups).map(([key, list]) => [
        key,
        { title: key[0].toUpperCase() + key.slice(1), components: list, defaultExpanded: true },
      ]),
    ),
    root: { render: (props: any) => createElement(RootFrame, props) },
    components: Object.fromEntries(
      names.map((name) => [
        name,
        {
          label: contracts[name].label,
          fields: resolveFields(contracts[name].fields as Record<string, any>, opts.ImageField),
          renderFields: buildRenderFields(contracts[name].fieldLayout),
          defaultProps: contracts[name].defaultProps,
          render: components[name] as any,
        },
      ]),
    ) as Config['components'],

  }
}
