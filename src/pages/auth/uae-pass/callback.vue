<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  const route = useRoute()
  const router = useRouter()
  onMounted(async () => {
    const code = route.query.code
    const state = route.query.state
    const expected = sessionStorage.getItem('uaepass_state')
    if (!code || !state || state !== expected) {
      return router.replace('/authorize?error=uaepass_state_mismatch')
    }
    // Exchange via YOUR backend (recommended)
    const res = await fetch('http://localhost:3001/api/auth/uaepass/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ code }),
    })
    if (!res.ok) return router.replace('/authorize?error=uaepass_failed')

    // backend should set your session cookie / return user info
    return router.replace('/') // or wherever
  })
</script>
<template>
  Signing you in...
</template>
