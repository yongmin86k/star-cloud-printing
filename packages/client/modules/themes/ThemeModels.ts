interface IColor {
  red: string
  orange: string
  yellow: string
  green: string
  mint: string
  teal: string
  cyan: string
  blue: string
  indigo: string
  purple: string
  pink: string
  brown: string
  body: string
}

interface IGray {
  systemGray: string
  systemGray2: string
  systemGray3: string
  systemGray4: string
  systemGray5: string
  systemGray6: string
}

export enum THEME_MODE {
  LIGHT = "light",
  DARK = "dark",
  ACCESSIBLE_LIGHT = "accessible-light",
  ACCESSIBLE_DARK = "accessible-dark",
}

export type TColor = IColor & IGray

type TColorKeys = keyof TColor
export type TColorVariables = TColor[TColorKeys]
