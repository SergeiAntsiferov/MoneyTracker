import type { StringObject } from '../../types'

export function changeCssProperty (preset: StringObject): void {
  const root = document.documentElement
  const keys = Object?.keys(preset)
  keys.forEach((variable) => {
    root.style.setProperty(variable, preset[variable])
  })
}

export function setDefaultStyles (): void {
  const defaultStyles: StringObject = {
    '--font_color': 'initial',
    '--primary_color': '#624DE3',
    '--secondary_color_1': '#555555',
    '--secondary_color_2': '#f0eefe',
    '--background_color': '#ffffff'
  }
  changeCssProperty(defaultStyles)
}
