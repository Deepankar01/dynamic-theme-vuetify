<script setup lang="ts">
  function redirectToUaePass () {
    const authorizeUrl = 'https://stg-id.uaepass.ae/idshub/authorize'
    const clientId = 'sandbox_stage' // POC
    const redirectUri = encodeURIComponent('http://localhost:3000/auth/uae-pass/callback') // must match what you use later
    const scope = encodeURIComponent('urn:uae:digitalid:profile:general')
    const acrValues = encodeURIComponent('urn:safelayer:tws:policies:authentication:level:low')

    const state = crypto.randomUUID()
    sessionStorage.setItem('uaepass_state', state)

    const url
      = `${authorizeUrl}?response_type=code`
        + `&client_id=${clientId}`
        + `&scope=${scope}`
        + `&redirect_uri=${redirectUri}`
        + `&state=${encodeURIComponent(state)}`
        + `&acr_values=${acrValues}`

    window.location.href = url
  }
</script>
<template>
  <v-btn @click="redirectToUaePass">
    UAE PASS
  </v-btn>
</template>
