// src/services/themeService.ts
export interface Theme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    success: string
    error: string
    warning?: string
    info?: string
  }
}

export async function fetchThemes (): Promise<Theme[]> {
  const response = await fetch('http://localhost:3001/themes')
  if (!response.ok) {
    throw new Error('Failed to fetch themes')
  }
  return response.json()
}

export async function fetchThemeById (id: string): Promise<Theme | null> {
  try {
    const response = await fetch(`http://localhost:3001/themes?id=${id}`)
    if (!response.ok) {
      return null
    }
    const themes = await response.json()
    return themes[0] || null
  } catch (error) {
    console.error('Error fetching theme:', error)
    return null
  }
}
