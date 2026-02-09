import type { InternalThemeDefinition } from 'vuetify/lib/composables/theme.mjs'
import type { Theme } from '../services/themeService'
// src/composables/useThemeManager.ts
import { computed, ref } from 'vue'
import { useTheme } from 'vuetify'
import { fetchThemeById, fetchThemes } from '../services/themeService'

const currentTheme = ref<Theme | null>(null)
const availableThemes = ref<Theme[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

export function useThemeManager () {
  const vuetifyTheme = useTheme()

  const loadAvailableThemes = async () => {
    try {
      availableThemes.value = await fetchThemes()
    } catch (error_) {
      console.error('Failed to load themes:', error_)
    }
  }

  const applyTheme = async (themeId: string) => {
    isLoading.value = true
    error.value = null

    try {
      const theme = await fetchThemeById(themeId)

      if (!theme) {
        error.value = `Theme "${themeId}" not found`
        return
      }

      currentTheme.value = theme

      // Get the default light theme as a base
      const baseTheme = vuetifyTheme.themes.value
        .light as InternalThemeDefinition

      // Merge with the base theme to keep all default Vuetify colors
      const newThemeDefinition: InternalThemeDefinition = {
        dark: false,
        colors: {
          // Keep all the default Vuetify colors
          ...baseTheme.colors,
          // Override only the colors from your API
          primary: theme.colors.primary,
          secondary: theme.colors.secondary,
          success: theme.colors.success,
          error: theme.colors.error,
          warning:
            theme.colors.warning || baseTheme.colors?.warning || '#FB8C00',
          info: theme.colors.info || baseTheme.colors?.info || '#2196F3',
        },
        variables: {
          // Keep all default variables
          ...baseTheme.variables,
        },
      }

      // Register the theme with Vuetify
      vuetifyTheme.themes.value[themeId] = newThemeDefinition

      // Switch to the new theme
      vuetifyTheme.global.name.value = themeId

      console.log('✅ Theme applied:', theme.name, newThemeDefinition)
    } catch (error_) {
      error.value = 'Failed to apply theme'
      console.error('❌ Theme error:', error_)
    } finally {
      isLoading.value = false
    }
  }

  const resetTheme = () => {
    currentTheme.value = null
    vuetifyTheme.global.name.value = 'light'
    error.value = null
  }

  const toggleDarkMode = () => {
    const currentThemeName = vuetifyTheme.global.name.value
    const currentThemeObj = vuetifyTheme.themes.value[currentThemeName]

    if (!currentThemeObj) {
      return
    }

    // Get base dark or light theme
    const baseTheme = (
      currentThemeObj.dark
        ? vuetifyTheme.themes.value.light
        : vuetifyTheme.themes.value.dark
    ) as InternalThemeDefinition

    // Create updated theme with toggled dark mode
    const updatedTheme: InternalThemeDefinition = {
      dark: !currentThemeObj.dark,
      colors: {
        // Merge base theme colors with current colors
        ...baseTheme.colors,
        ...currentThemeObj.colors,
      },
      variables: {
        ...baseTheme.variables,
        ...currentThemeObj.variables,
      },
    }

    // Update the theme
    vuetifyTheme.themes.value[currentThemeName] = updatedTheme
  }

  return {
    currentTheme: computed(() => currentTheme.value),
    availableThemes: computed(() => availableThemes.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    isDark: computed(() => vuetifyTheme.global.current.value.dark),
    applyTheme,
    resetTheme,
    loadAvailableThemes,
    toggleDarkMode,
  }
}
