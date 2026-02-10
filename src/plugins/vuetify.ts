/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify, type ThemeDefinition } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'

// Default themes
const defaultLight: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#1976D2',
    secondary: '#424242',
    success: '#4CAF50',
    error: '#FF5252',
    warning: '#FB8C00',
    info: '#2196F3',
  },
}

const defaultDark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#2196F3',
    secondary: '#424242',
    success: '#4CAF50',
    error: '#FF5252',
    warning: '#FB8C00',
    info: '#2196F3',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: defaultLight,
      dark: defaultDark,
    },
  },
  defaults: {
    VBtn: {
      // Disable ripple to prevent black flash
      ripple: false,
    },
  },
})
