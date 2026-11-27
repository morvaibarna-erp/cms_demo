import { defineContract,colorPickerField } from '../define'

export interface CtaBannerProps {
  text: string
  buttonLabel: string
  buttonUrl: string
}

export const ctaBanner = defineContract<CtaBannerProps>({
  label: 'Call-to-action banner',
  fields: {
    text: { type: 'text', label: 'Text' },
    buttonLabel: { type: 'text', label: 'Button label' },
    buttonUrl: { type: 'text', label: 'Button link (/page-slug or https://…)' },
  },
  fieldLayout:[
    {type: 'tab', label:'Content', fields:['text']},
    {type: 'tab', label:'Second Content', fields:['buttonLabel', 'buttonUrl']},
  ],
  defaultProps: { text: 'Ready to start?', buttonLabel: 'Get started', buttonUrl: '/' },
})
