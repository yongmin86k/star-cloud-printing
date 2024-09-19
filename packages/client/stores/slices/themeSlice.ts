import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../rootStore"
import { TColor, THEME_MODE } from "../../modules/themes/ThemeModels"
import { COLORS } from "../../modules/themes/Colors"

export interface TColorWithComponents extends TColor {
  button: (disabled: boolean) => {
    background: string
    border: string
    text: string
  }
  tabBar: {
    active: string
    inactive: string
  }
  background: string
}

export interface ThemeStore {
  theme: THEME_MODE
}

const initialState: ThemeStore = {
  theme: THEME_MODE.LIGHT,
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<THEME_MODE>) => {
      state.theme = action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions

const colorScheme = (state: RootState) => {
  const { theme } = state.themeStore
  const { accessibleDark, accessibleLight, light, dark } = COLORS

  switch (theme) {
    case THEME_MODE.DARK:
      return dark
    case THEME_MODE.ACCESSIBLE_LIGHT:
      return accessibleLight
    case THEME_MODE.ACCESSIBLE_DARK:
      return accessibleDark
    case THEME_MODE.LIGHT:
    default:
      return light
  }
}

export const selectColorScheme = createSelector(
  [colorScheme],
  (color): TColorWithComponents => {
    const buttonColors = (color: TColor) => (disabled: boolean) => {
      return {
        background: disabled ? color.systemGray3 : color.blue,
        border: disabled ? color.systemGray3 : color.blue,
        text: disabled ? color.systemGray : color.systemGray6,
      }
    }

    return {
      ...color,
      button: buttonColors(color),
      tabBar: {
        active: color.blue,
        inactive: color.systemGray,
      },
      background: color.systemGray5,
    }
  },
)

export default themeSlice.reducer
