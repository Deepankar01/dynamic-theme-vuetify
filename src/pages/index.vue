<script setup lang="ts">
  import { nextTick, onMounted, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useThemeManager } from '../composables/useThemeManager'

  const route = useRoute()
  const {
    currentTheme,
    availableThemes,
    isLoading,
    error,
    isDark,
    applyTheme,
    resetTheme,
    loadAvailableThemes,
    toggleDarkMode,
  } = useThemeManager()

  const isReady = ref(false)

  async function loadThemeFromUrl () {
    const themeId = route.query.theme as string

    if (themeId) {
      await applyTheme(themeId)
      // Wait for Vue to update DOM
      await nextTick()
      // Small delay to ensure colors are applied
      await new Promise(resolve => setTimeout(resolve, 50))
    } else {
      resetTheme()
    }

    isReady.value = true
  }

  watch(() => route.query.theme, async () => {
    isReady.value = false
    await loadThemeFromUrl()
  })

  onMounted(async () => {
    await loadAvailableThemes()
    await loadThemeFromUrl()
  })
</script>

<template>
  <v-app>
    <transition mode="out-in" name="fade">
      <!-- Loading State -->
      <div
        v-if="!isReady"
        key="loading"
        class="d-flex align-center justify-center"
        style="height: 100vh;"
      >
        <div class="text-center">
          <v-progress-circular
            color="primary"
            indeterminate
            size="64"
          />
          <p class="mt-4 text-body-1">Loading theme...</p>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else key="content">
        <!-- App Bar -->
        <v-app-bar color="primary" prominent>
          <v-app-bar-title>
            <span class="text-h5 font-weight-bold">My Themed App</span>
            <v-chip
              v-if="currentTheme"
              class="ml-4"
              color="white"
              size="small"
              text-color="primary"
            >
              {{ currentTheme.name }}
            </v-chip>
          </v-app-bar-title>

          <v-spacer />

          <!-- Dark Mode Toggle -->
          <v-btn
            :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
            @click="toggleDarkMode"
          />
        </v-app-bar>

        <!-- Main Content -->
        <v-main>
          <v-container>
            <!-- Loading State -->
            <v-progress-linear
              v-if="isLoading"
              class="mb-4"
              color="primary"
              indeterminate
            />

            <!-- Error Alert -->
            <v-alert
              v-if="error"
              class="mb-6"
              closable
              type="error"
            >
              {{ error }}
            </v-alert>

            <!-- Debug Info Card -->
            <v-card class="mb-6">
              <v-card-title>🔧 Debug Info</v-card-title>
              <v-card-text>
                <div class="text-body-2">
                  <div><strong>Theme ID:</strong> {{ currentTheme?.id || 'none' }}</div>
                  <div><strong>Theme Name:</strong> {{ currentTheme?.name || 'none' }}</div>
                  <div><strong>Primary Color:</strong> {{ currentTheme?.colors.primary || 'none' }}</div>
                  <div class="d-flex align-center mt-2">
                    <strong class="mr-2">Color Preview:</strong>
                    <div
                      v-if="currentTheme"
                      :style="{
                        backgroundColor: currentTheme.colors.primary,
                        width: '48px',
                        height: '48px',
                        borderRadius: '4px',
                        border: '2px solid #ccc'
                      }"
                    />
                  </div>
                </div>
              </v-card-text>
            </v-card>

            <!-- Theme Demo -->
            <v-card class="mb-6">
              <v-card-title>Theme Demo - Buttons</v-card-title>
              <v-card-text>
                <div class="d-flex flex-wrap ga-4">
                  <v-btn color="primary" variant="elevated">Primary Button</v-btn>
                  <v-btn color="secondary" variant="elevated">Secondary Button</v-btn>
                  <v-btn color="success" variant="elevated">Success Button</v-btn>
                  <v-btn color="error" variant="elevated">Error Button</v-btn>
                  <v-btn color="warning" variant="elevated">Warning Button</v-btn>
                  <v-btn color="info" variant="elevated">Info Button</v-btn>
                </div>

                <!-- Outlined Buttons -->
                <div class="d-flex flex-wrap ga-4 mt-4">
                  <v-btn color="primary" variant="outlined">Outlined</v-btn>
                  <v-btn color="secondary" variant="text">Text</v-btn>
                  <v-btn color="success" variant="tonal">Tonal</v-btn>
                </div>
              </v-card-text>
            </v-card>

            <!-- More Components Demo -->
            <v-row>
              <v-col cols="12" md="4">
                <v-card>
                  <v-card-title>Card Component</v-card-title>
                  <v-card-text>
                    This card shows the current theme styling.
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" variant="text">Action</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-card>
                  <v-card-title>Chips</v-card-title>
                  <v-card-text class="d-flex flex-wrap ga-2">
                    <v-chip color="primary">Primary</v-chip>
                    <v-chip color="secondary">Secondary</v-chip>
                    <v-chip color="success">Success</v-chip>
                    <v-chip color="error">Error</v-chip>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-card>
                  <v-card-title>Progress</v-card-title>
                  <v-card-text>
                    <v-progress-linear color="primary" :model-value="75" />
                    <v-progress-linear class="mt-4" color="secondary" :model-value="50" />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Quick Theme Switch -->
            <v-card class="mt-6">
              <v-card-title>Quick Theme Switch</v-card-title>
              <v-card-text>
                <div class="d-flex flex-wrap ga-2">
                  <v-btn
                    color="blue"
                    href="?theme=ocean-blue"
                    variant="outlined"
                  >
                    Ocean Blue
                  </v-btn>
                  <v-btn
                    color="orange"
                    href="?theme=sunset-orange"
                    variant="outlined"
                  >
                    Sunset Orange
                  </v-btn>
                  <v-btn
                    color="grey"
                    href="/"
                    variant="outlined"
                  >
                    Reset
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>

            <!-- Available Themes Gallery -->
            <v-card v-if="availableThemes.length > 0" class="mt-6">
              <v-card-title>Available Themes ({{ availableThemes.length }})</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col
                    v-for="theme in availableThemes"
                    :key="theme.id"
                    cols="12"
                    lg="3"
                    md="4"
                    sm="6"
                  >
                    <v-card
                      class="theme-gallery-card"
                      :color="currentTheme?.id === theme.id ? 'primary' : undefined"
                      hover
                      :href="`?theme=${theme.id}`"
                      :variant="currentTheme?.id === theme.id ? 'outlined' : 'elevated'"
                    >
                      <v-card-title class="text-subtitle-1">
                        {{ theme.name }}
                      </v-card-title>
                      <v-card-text>
                        <div class="d-flex ga-1 flex-wrap">
                          <div
                            v-for="(color, key) in theme.colors"
                            :key="key"
                            :style="{
                              backgroundColor: color,
                              width: '24px',
                              height: '24px',
                              borderRadius: '4px'
                            }"
                            :title="key"
                          />
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-container>
        </v-main>
      </div>
    </transition>
  </v-app>
</template>

<style scoped>
/* Fade transition for smooth theme switching */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Theme gallery card styling */
.theme-gallery-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-gallery-card:hover {
  transform: translateY(-4px);
}
</style>
